import { Avatar } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { format } from 'timeago.js';
import userApi from '../../api/userApi';
import './CommentRow.scss';

const CommentRow = ({ props }) => {
  const [chanel, setChanel] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getUser(props.userId);
        setChanel(res);
      } catch (err) {}
    };

    getUser();
  }, [props.userId]);

  return (
    <div className="commentRow">
      <Avatar src={chanel.img} />
      <div className="commentRow__text">
        <h3>
          {chanel.name} <span>{format(props.createdAt)}</span>
        </h3>
        <p>{props.desc}</p>
      </div>
    </div>
  );
};

export default CommentRow;
