import React, { useEffect, useState } from 'react';
import './Result.scss';

import TuneIcon from '@mui/icons-material/Tune';
import VideoCard from '../../Components/VideoCard/VideoCard';
import ChanelRow from '../../Components/ChanelRow/ChanelRow';
import { useLocation } from 'react-router-dom';
import videoApi from '../../api/videoApi';
import userApi from '../../api/userApi';

const Result = () => {
  const search = useLocation().search;
  const q = new URLSearchParams(search).get('q');

  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const videoResult = await videoApi.search(q);
        const usersResult = await userApi.search(q);
        setVideos(videoResult);
        setUsers(usersResult);
      } catch (err) {}
    };
    getData();
  }, [q]);

  return (
    <div className="result">
      <div className="result__filter">
        <TuneIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      {users && (
        <div className="result__chanel">
          {users.map((u) => (
            <ChanelRow props={u} key={u._id} />
          ))}
        </div>
      )}

      {videos && (
        <div className="result__videos">
          {videos.map((v) => (
            <VideoCard props={v} key={v._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Result;
