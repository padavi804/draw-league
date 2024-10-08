import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.full_name}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Your Role: {user.user_role} </p>
      {user.ref_img && (
        <div>
          <p>Your Referee Image:</p>
          <img src={user.ref_img} alt="Referee" style={{ width: '150px', height: 'auto' }} />
        </div>
      )}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
