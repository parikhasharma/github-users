import React from 'react';

const RepositoryDetails = ({ repository }) => {
  return (
    <div>
      <h2>Repository Details</h2>
      <p>Name: {repository.name}</p>
      <p>Description: {repository.description}</p>
      <p>Language: {repository.language}</p>
      <p>Stars: {repository.stargazers_count}</p>
      <p>Forks: {repository.forks_count}</p>
    </div>
  );
};

export default RepositoryDetails;
