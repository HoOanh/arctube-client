import React, { useEffect, useState } from 'react';
import videoApi from '../../api/videoApi';
import VideoCard from '../VideoCard/VideoCard';
import './Recommendation.scss';

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await videoApi.getVideoByTags(tags.toString());
        setVideos(res);
      } catch (err) {}
    };
    getVideo();
  }, [tags]);

  return (
    <div className="recommendation">
      {videos.map((v) => (
        <VideoCard key={v._id} props={v} />
      ))}
    </div>
  );
};

export default Recommendation;
