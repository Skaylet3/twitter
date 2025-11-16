import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import type { Location } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import { FeedProvider } from './context/FeedSweetcherContext'
import { ProfileFeedProvider } from './context/PostsSweetcherContext'
import ModalReply from './components/ModalReply/ModalReply'
import EditProfileModal from './components/EditProfileModal/EditProfileModal'
import { ProfileAvatarProvider } from './components/ChangeAvatarConstruction/ProfileAvatarContext'
import { ProfileHeaderProvider } from './components/ChangeHeaderConstruction/ProfileHeaderContext'
import { CropperProvider } from './components/ChangeAvatarConstruction/CropperContext'
import { CropperHeaderProvider } from './components/ChangeHeaderConstruction/CropperHeaderContext'
import { RealProfileAvatarProvider } from './context/RealProfileAvatarContext'
import { RealProfileHeaderProvider } from './context/RealProfileHeaderContext'
import Settings from './Pages/Settings'
import YourAccountOptions from './components/SettingOptions/YourAccountOptions/YourAccountOptions'
import DeactivateAccount from './components/SettingOptions/DeactivateAccount/DeactivateAccount'
import { UserProvider } from './context/UserContext'
import { ApiProvider } from './context/Api'
import { SocketProvider } from './context/SocketContext'
import { MediaBaseUrlProvider } from './context/MediaBaseUrlContext'
import CropperModal from './components/ChangeAvatarConstruction/CropperModal/CropperModal'
import CropperHeaderModal from './components/ChangeHeaderConstruction/CropperHeaderModal/CropperHeaderModal'
import TweetCard from './components/TweetCard/TweetCard'
import { ReplyTextProvider } from './context/ReplyTextContext'

type BackgroundLocationState = {
  backgroundLocation?: Location
}

const App = () => {
  const location = useLocation()
  const state = location.state as BackgroundLocationState | null

  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route
          path="/"
          element={
            <ApiProvider>
              <ProfileAvatarProvider>
                <FeedProvider>
                  <Home />
                </FeedProvider>
              </ProfileAvatarProvider>
            </ApiProvider>
          }
        />
        <Route
          path="/home"
          element={
            <ApiProvider>
              <FeedProvider>
                <Home />
              </FeedProvider>
            </ApiProvider>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/:username/status/:tweetId"
          element={
            <ApiProvider>
              <TweetCard />
            </ApiProvider>
          }
        />
        <Route
          path="/compose/post/:replyTo"
          element={
            <ApiProvider>
              <ModalReply />
            </ApiProvider>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <ApiProvider>
              <EditProfileModal />
            </ApiProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <ApiProvider>
              <ProfileFeedProvider>
                <Profile />
              </ProfileFeedProvider>
            </ApiProvider>
          }
        />
        <Route
          path="/settings"
          element={
            <ApiProvider>
              <Settings />
            </ApiProvider>
          }
        >
          <Route
            path="account"
            element={
              <ApiProvider>
                <YourAccountOptions />
              </ApiProvider>
            }
          />
          <Route
            path="deactivate"
            element={
              <ApiProvider>
                <DeactivateAccount />
              </ApiProvider>
            }
          />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path="/:username/status/:tweetId"
            element={
              <ApiProvider>
                <TweetCard />
              </ApiProvider>
            }
          >
            <Route path="compose/post/:replyTo" element={<ModalReply />} />
          </Route>
          <Route
            path="/compose/post/:replyTo"
            element={
              <ApiProvider>
                <ModalReply />
              </ApiProvider>
            }
          />
          <Route
            path="/settings/profile"
            element={
              <ApiProvider>
                <EditProfileModal />
              </ApiProvider>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default function Wrapper() {
  return (
    <ReplyTextProvider>
      <MediaBaseUrlProvider>
        <SocketProvider>
          <UserProvider>
            <RealProfileHeaderProvider>
              <RealProfileAvatarProvider>
                <CropperHeaderProvider>
                  <CropperProvider>
                    <BrowserRouter>
                      <ProfileHeaderProvider>
                        <ProfileAvatarProvider>
                          <App />
                          <CropperModal />
                          <CropperHeaderModal />
                        </ProfileAvatarProvider>
                      </ProfileHeaderProvider>
                    </BrowserRouter>
                  </CropperProvider>
                </CropperHeaderProvider>
              </RealProfileAvatarProvider>
            </RealProfileHeaderProvider>
          </UserProvider>
        </SocketProvider>
      </MediaBaseUrlProvider>
    </ReplyTextProvider>
  )
}
