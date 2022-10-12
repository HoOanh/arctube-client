import React, { useEffect, useState } from 'react';
import videoApi from '../../api/videoApi';
import VideoCard from '../VideoCard/VideoCard';

const Recommendation = ({ props }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await videoApi.getVideoByTags(props.tags.toString());
        setVideos(res);
      } catch (err) {}
    };
    getVideo();
  }, [props.tags]);

  return (
    <div className="recommendation">
      {videos.map(
        (v) => v._id != props.videoId && <VideoCard key={v._id} props={v} />
      )}
    </div>
  );
};

export default Recommendation;
