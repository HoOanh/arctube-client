import React, { useEffect, useState } from 'react';
import VideoCard from '../../Components/VideoCard/VideoCard';
import './Home.scss';

import videoApi from '../../api/videoApi';
import Loading from '../../Components/Layout/Loading/Loading';

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await videoApi.getVideo(type);
        if (res) {
          setVideos(res);
          setLoading(false);
        }
      } catch (err) {}
    };

    getVideo();
  }, [type]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="home">
          <div className="home__videos">
            {videos.map((v) => (
              <VideoCard key={v._id} props={v} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
