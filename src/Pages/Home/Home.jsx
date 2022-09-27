import React, { useEffect, useState } from 'react';
import VideoCard from '../../Components/VideoCard/VideoCard';
import './Home.scss';

import videoApi from '../../api/videoApi';

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      const res = await videoApi.getVideo(type);
      if (res) setVideos(res);
    };

    getVideo();
  }, [type]);

  return (
    <div className="home">
      <div className="home__videos">
        {videos.map((v) => (
          <VideoCard key={v._id} props={v} />
        ))}
      </div>
    </div>
  );
};

export default Home;
