import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [avatarUser, setAvatarUser] = useState(null);
    const [headerUser, setHeaderUser] = useState(null);
    const [usernameUser, setUsernameUser] = useState(null);
    const [nicknameUser, setNicknameUser] = useState(null);
    const [bioUser, setBioUser] = useState(null);
    const [followersCountUser, setFollowersCountUser] = useState(0);
    const [followingCountUser, setFollowingCountUser] = useState(0);
    const [monthUser, setMonthUser] = useState(null);
    const [yearUser, setYearUser] = useState(null);


      //avatar's getting
	const getUser = async () => {
		try {
			const res = await fetch('http://localhost:3000/api/users', {
				method: 'POST',
				credentials: 'include'
			});
			const data = await res.json();
			console.log("dataaa: ", data);

            setAvatarUser(data.avatar);
            setHeaderUser(data.header);
            setUsernameUser(data.username);
            setNicknameUser(data.nickname);
            setBioUser(data.bio);
            setFollowersCountUser(data.followersCount);
            setFollowingCountUser(data.followingCount);
            setMonthUser(data.month);
            setYearUser(data.year);
		} catch(err) {
			console.error("Error:  ", err.message);
		}
	};


    return(
        <UserContext.Provider value={{ avatarUser, setAvatarUser, headerUser, setHeaderUser, usernameUser, setUsernameUser, nicknameUser, setNicknameUser, bioUser, setBioUser, followersCountUser, setFollowersCountUser, followingCountUser, setFollowingCountUser, monthUser, setMonthUser, yearUser, setYearUser, getUser }} >
            { children }
        </UserContext.Provider>
    );
}