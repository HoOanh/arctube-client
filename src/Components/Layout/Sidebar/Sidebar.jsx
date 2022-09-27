import React from 'react';
import SidebarRow from '../../SidebarRow/SidebarRow';
import './Sidebar.scss';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSystemTheme,
  setDarkTheme,
  setLightTheme,
} from '../../../redux/themeSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <SidebarRow Icon={HomeOutlinedIcon} title={'Home'} path="/" />
      <SidebarRow
        Icon={WhatshotOutlinedIcon}
        title={'Trending'}
        path="/feed/trend"
      />
      <SidebarRow
        Icon={SubscriptionsOutlinedIcon}
        title={'Subscription'}
        path="/feed/subscription"
      />
      <hr />
      <SidebarRow
        Icon={VideoLibraryOutlinedIcon}
        title={'Library'}
        path="/feed/library"
      />
      <SidebarRow
        Icon={HistoryOutlinedIcon}
        title={'History'}
        path="/feed/history"
      />
      {!currentUser && (
        <>
          <hr />
          <Link
            to="/sign-in"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="login-btn">
              <p>Sign in to like video, comment and subscribe.</p>
              <button>
                {' '}
                <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
                Sign in
              </button>
            </div>
          </Link>
        </>
      )}

      <hr />
      <SidebarRow
        Icon={OndemandVideoOutlinedIcon}
        title={'Your video'}
        path="/feed/your-video"
      />
      <SidebarRow
        Icon={WatchLaterOutlinedIcon}
        title={'Watch later'}
        path="/feed/watch-later"
      />
      <div className="sidebarRow theme">
        <div>
          <DarkModeIcon className="sidebarRow__icon" />
          <h2 className="sidebarRow__title">Theme: {theme}</h2>
        </div>
        <ul className="themeList">
          <li onClick={() => dispatch(getSystemTheme())}>
            Use the device Theme
          </li>
          <li onClick={() => dispatch(setDarkTheme())}>Dark Theme</li>
          <li onClick={() => dispatch(setLightTheme())}>Light Theme</li>
        </ul>
      </div>
      <SidebarRow Icon={ExpandMoreOutlinedIcon} title={'Show more'} path="" />
    </div>
  );
};

export default Sidebar;
