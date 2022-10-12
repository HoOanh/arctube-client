import { Avatar } from '@mui/material';
import React from 'react';
import './ChanelRow.scss';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import { subscription } from '../../redux/userSlice';

const ChanelRow = ({ props }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSubscription = async () => {
    currentUser.subscribedUser.includes(props._id)
      ? await userApi.unSub(props._id)
      : await userApi.sub(props._id);
    dispatch(subscription(props._id));
  };

  return (
    <div className="chanelRow">
      <div className="chanelRow__avatar">
        <Avatar src={props.img} />
      </div>
      <div className="chanelRow__info">
        <h4 className="chanelRow__info-title">
          {props.name} <TaskAltIcon />
        </h4>
        <p>
          {props.subscribers} subscribe{' '}
          <FiberManualRecordIcon sx={{ fontSize: 9 }} /> {props.video}
        </p>
        <p>{props.description}</p>
      </div>

      <button className="watch__chanel-btn" onClick={handleSubscription}>
        {currentUser.subscribedUser?.includes(props._id)
          ? 'unsubscribe'
          : 'subscribe'}
      </button>
    </div>
  );
};

export default ChanelRow;
