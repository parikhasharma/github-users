import React from 'react';

const FollowersList = ({ followers, handleFollowerClick }) => {
  return (
    <div>
      <h2>Followers</h2>
      <ul>
        {followers.map(follower => (
          <li key={follower.id} onClick={() => handleFollowerClick(follower)}>
            {follower.login}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
