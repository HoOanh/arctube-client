import React from 'react';
import CommentRow from '../CommentRow/CommentRow';
import './CommentList.scss';

import { Avatar } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import commentApi from '../../api/commentApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [cmtInput, setCmtInput] = useState('');

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await commentApi.getComment(videoId);
        setComments(res.reverse());
      } catch (err) {}
    };

    getComment();
  }, [videoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      if (currentUser) {
        await commentApi.addComment({
          desc: cmtInput,
          videoId: videoId,
        });

        const updateCmt = await commentApi.getComment(videoId);
        setComments(updateCmt.reverse());

        e.target.reset();
      } else {
        navigate('/sign-in');
      }
    } catch (err) {}
  };

  return (
    <div className="comments">
      <p>{comments?.length} comment</p>
      <div className="comments__add">
        <Avatar src={currentUser?.img} />
        <form onSubmit={(e) => handleAddComment(e)}>
          <input
            onChange={(e) => setCmtInput(e.target.value)}
            type="text"
            placeholder="Add a comment..."
          />
        </form>
      </div>
      <div className="comments__list">
        {comments.map((cmt) => (
          <CommentRow props={cmt} key={cmt._id} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
