import React, { useEffect, useState } from 'react';
import './VideoCard.scss';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar } from '@mui/material';

import userApi from '../../api/userApi';

import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const VideoCard = ({ props }) => {
  const [chanel, setChanel] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const res = await userApi.getUser(props.userId);
      setChanel(res);
    };
    getUser();
  }, [props.userId]);

  return (
    <Link
      to={`/watch?w=${props._id}`}
      style={{ textDecoration: 'none', color: 'var(--text)' }}
      className="videoCard"
    >
      <img className="videoCard__thumbnail" src={props.imgUrl} alt="" />
      <div className="videoCard__info">
        <Avatar className="videoCard__info-avatar" src={chanel.img} />
        <div className="videoCard__info-text">
          <h4>{props.title}</h4>
          <p>{chanel.name}</p>
          <p>
            {props.views} views <FiberManualRecordIcon sx={{ fontSize: 9 }} />{' '}
            {format(props.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
