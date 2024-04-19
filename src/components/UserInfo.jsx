import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt="Avatar" />
      <p>Name: {user.name}</p>
      <p>Location: {user.location}</p>
      <p>Bio: {user.bio}</p>
      <p>Public Repos: {user.public_repos}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
    </div>
  );
};

export default UserInfo;
