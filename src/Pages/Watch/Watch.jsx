import React from 'react';
import './Watch.scss';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { Avatar } from '@mui/material';
import CommentList from '../../Components/CommentList/CommentList';

import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import videoApi from '../../api/videoApi';
import userApi from '../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  disLike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from '../../redux/videoSlice';
import { format } from 'timeago.js';
import { subscription } from '../../redux/userSlice';
import Recommendation from '../../Components/Recommendation/Recommendation';
import Loading from '../../Components/Layout/Loading/Loading';

const Watch = () => {
  const search = useLocation().search;
  const videoId = new URLSearchParams(search).get('w');

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const [chanel, setChanel] = useState({});
  const [views, setViews] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      dispatch(fetchStart());
      try {
        const video = await videoApi.getVideoById(videoId);
        const chanel = await userApi.getUser(video.userId);

        dispatch(fetchSuccess(video));
        setChanel(chanel);
        setLoading(false);
      } catch (error) {
        dispatch(fetchFailure());
      }
    };
    getData();
  }, [videoId]);

  const handleLike = async () => {
    if (!currentUser) return;
    await userApi.like(currentVideo._id);
    dispatch(like(currentUser._id));
  };

  const handleDisLike = async () => {
    if (!currentUser) return;
    await userApi.disLike(currentVideo._id);
    dispatch(disLike(currentUser._id));
  };

  const handleSubscription = async () => {
    if (!currentUser) return;
    currentUser.subscribedUser.includes(chanel._id)
      ? await userApi.unSub(chanel._id)
      : await userApi.sub(chanel._id);
    dispatch(subscription(chanel._id));

    const updateChanel = await userApi.getUser(currentVideo.userId);
    setChanel(updateChanel);
  };

  const handleViews = async (e) => {
    // console.log(e.target.duration / e.target.currentTime);

    if (e.target.currentTime / e.target.duration > 0.25 && !views) {
      setViews(true);
      await videoApi.view(currentVideo._id);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="watch">
          <div className="watch__content">
            <div className="watch__videoWrapper">
              <video
                src={currentVideo.videoUrl}
                controls
                onTimeUpdate={handleViews}
              />
            </div>
            <div className="watch__details">
              <h2 className="watch__details-title">{currentVideo.title}</h2>
              <div className="watch__details-info">
                <b>
                  {currentVideo.views} view{' '}
                  <FiberManualRecordIcon sx={{ fontSize: 9 }} />{' '}
                  {format(currentVideo.createdAt)}
                </b>
                <span> {currentVideo.desc} </span>
              </div>
            </div>
            <div className="watch__controls">
              <div className="watch__controls-btn" onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
                <span>{currentVideo.likes?.length}</span>
              </div>

              <div className="watch__controls-btn" onClick={handleDisLike}>
                {currentVideo.disLikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlinedIcon />
                )}
                <span>{currentVideo.disLikes?.length}</span>
              </div>
              <div className="watch__controls-btn">
                <ReplyOutlinedIcon /> <span>share</span>
              </div>
              <div className="watch__controls-btn">
                <PlaylistAddOutlinedIcon /> <span>save</span>
              </div>
            </div>
            <hr />
            <div className="watch__chanel">
              <Avatar className="watch__chanel-avatar" src={chanel.img} />
              <div className="watch__chanel-text">
                <h4>
                  {chanel.name} <TaskAltIcon />
                </h4>
                <p>{chanel.subscribers} subscribe</p>
                <p>{chanel.desc}</p>
              </div>

              <button
                className="watch__chanel-btn"
                onClick={handleSubscription}
              >
                {currentUser?.subscribedUser?.includes(chanel._id)
                  ? 'Unsubcribe'
                  : 'subscribe'}
              </button>
            </div>

            <CommentList videoId={videoId} />
          </div>

          <div className="watch__recommendation">
            {<Recommendation tags={currentVideo.tags} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
