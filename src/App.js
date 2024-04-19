import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import UserInfo from './components/UserInfo';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import FollowersList from './components/FollowersList';

const App = () => {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState(null);
  const [followers, setFollowers] = useState([]);

  const handleSearch = async (username) => {
    try {
      const { data: userData } = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userData);
      setRepositories(userData.repositories);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRepositoryClick = (repo) => {
    setRepository(repo);
  };

  const handleFollowerClick = async (follower) => {
    try {
      const { data: followerData } = await axios.get(`/api/users/${follower.login}`);
      setUser(followerData);
      setRepositories(followerData.repositories);
      setFollowers([]);
    } catch (error) {
      console.error('Error fetching follower data:', error);
    }
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      {user && <UserInfo user={user} />}
      {repositories.length > 0 && <RepositoryList repositories={repositories} />}
      {repository && <RepositoryDetails repository={repository} />}
      {user && <FollowersList followers={user.followers} handleFollowerClick={handleFollowerClick} />}
    </div>
  );
};

export default App;

