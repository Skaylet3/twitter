import User from "../models/user.js"
import Tweet from "../models/tweet.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).lean();
        if(!user) throw new Error("This user does not exist");

        const { nickname, username, avatar, header, bio, email, followersCount, followingCount } = user;

        const { year, month } = req.dateInfo;

        const BASE_MEDIA_URL = process.env.MEDIA_BASE_URL;


        res.json({ nickname, username, year, month, id, avatar: `${BASE_MEDIA_URL}/${avatar}`, bio, header: `${BASE_MEDIA_URL}/${header}`, email, followersCount, followingCount });
    } catch(err) {
        res.json({ error: err.message });
    }
};

export const changeProfileInfo = async (req, res) => {
  try {

    const id = req.user.id;

    const { preview, previewHeader, nickname, bio } = req.body;

    const user = await User.findById(id);
    if(!user) throw new Error("This user does not exist");

    const updateFields = {};

    if(typeof nickname === "string" && nickname !== user.nickname){
        updateFields.nickname = nickname;
    }

    if(typeof bio === "string" && bio !== user.bio){
      updateFields.bio = bio;
    }

    if(typeof preview === "string" && preview !== user.avatar){
      updateFields.avatar = preview;
    }

    if(typeof previewHeader === "string" && previewHeader !== user.header){
      updateFields.header = previewHeader;
    }

    if(Object.keys(updateFields).length === 0){
      return res.status(200).json({ message: "Nothing to update" });
    }    

    const updated = await User.findByIdAndUpdate(id, updateFields, { new: true });

    res.status(200).json(updated);
    
  } catch(err) {
    res.status(400).json({ errorDetails: err.message });
  }
};

export const deleteAccount = async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).lean();
      if(!user) throw new Error("User does not exist");

      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        path: "/",
      });

      await Tweet.deleteMany({ authorId: userId });

      await User.findByIdAndDelete(userId);

      res.status(201).json({ message: `${user.nickname}'s account has been deleted` });
    } catch(err) {
        res.status(401).json({ message: `Error while deleting profile: ${err.message}` });
    }
};