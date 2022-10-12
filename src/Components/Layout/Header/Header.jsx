import React, { useState } from 'react';
import './Header.scss';

// icon
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import NotificationsNoneSharpIcon from '@mui/icons-material/NotificationsNoneSharp';
import Avatar from '@mui/material/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../../Upload/Upload';
import { logout } from '../../../redux/userSlice';

const Header = ({ login }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [smallNav, setSmallNav] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/result?q=${query}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div className="header">
        <div className="header__left">
          <MenuSharpIcon sx={{ fontSize: 25 }} />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="header__logo">
              <img
                src="https://brademar.com/wp-content/uploads/2022/05/YouTube-Logo-PNG-2017-%E2%80%93-Now-3.png"
                alt=""
              />
              <span>ArcTube</span>
            </div>
          </Link>
        </div>

        <div className="header__search">
          <form onSubmit={(e) => handleSearchSubmit(e)}>
            {' '}
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search"
            />
          </form>
          <SearchSharpIcon className="header__search-btn" />
        </div>

        <div className="header__controls">
          {currentUser ? (
            <>
              <div onClick={(e) => setOpen(true)}>
                <VideoCallOutlinedIcon className="header__icon" />
              </div>
              <NotificationsNoneSharpIcon className="header__icon" />
              <div
                className="user__avatar"
                onClick={() => setSmallNav(!smallNav)}
              >
                <Avatar alt="Remy Sharp" src={currentUser.img} />
                {smallNav && (
                  <div className="user__info">
                    <h4>{currentUser.name}</h4>
                    <span>{currentUser.email}</span>
                    <hr />
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            // <Link
            //   to="/sign-in"
            //   style={{ textDecoration: 'none', color: 'inherit' }}
            // >
            <div className="login-btn" style={{ padding: '0' }}>
              <button onClick={login}>
                {' '}
                <AccountCircleOutlinedIcon sx={{ fontSize: 20 }} />
                Sign in
              </button>
            </div>
            // </Link>
          )}
        </div>
      </div>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Header;
