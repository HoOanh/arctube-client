import React, { useState } from 'react';
import { useEffect } from 'react';
import './Upload.scss';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firabase';
import videoApi from '../../api/videoApi';
import { useNavigate } from 'react-router-dom';

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleTags = (e) => {
    setTags(e.target.value.split(','));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'imgUrl'
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('Upload is paused');
        //     break;
        //   case 'running':
        //     console.log('Upload is running');
        //     break;

        //   default:
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, 'videoUrl');
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, 'imgUrl');
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const res = await videoApi.addVideo({ ...inputs, tags });

    setOpen(false);
    res._id && navigate(`/watch?w=${res._id}`);
  };

  return (
    <div className="upload">
      <div className="upload__wrapper">
        <div className="upload__close" onClick={(e) => setOpen(false)}>
          X
        </div>
        <h1>Upload new Video</h1>
        <label>Video:</label>
        {videoPerc > 0 ? (
          `Uploading ${videoPerc}%`
        ) : (
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <textarea
          rows="8"
          placeholder="Description"
          name="desc"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <label>Image:</label>
        {imgPerc > 0 ? (
          `Uploading ${imgPerc}%`
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;
