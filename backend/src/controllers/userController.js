const axios = require('axios');
const User = require('../models/userModel');

async function saveUserDetails(username) {
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return existingUser;
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const userData = response.data;
    const newUser = await User.create({ username, data: userData });
    return newUser;
  } catch (error) {
    throw new Error('Failed to save user details');
  }
}

async function findMutualFriends(username) {
  try {
    const currentUser = await User.findOne({ where: { username } });
    if (!currentUser) throw new Error('User not found');
    const userFollows = currentUser.data.following;
    const mutualFriends = await User.findAll({
      where: {
        username: {
          [Op.ne]: username 
        },
        data: {
          following: {
            [Op.contains]: username 
          }
        }
      }
    });
    return mutualFriends.map(user => user.username);
  } catch (error) {
    throw new Error('Failed to find mutual friends');
  }
}

async function searchUsers(query) {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query}%` } },
          { 'data.name': { [Op.like]: `%${query}%` } },
          { 'data.location': { [Op.like]: `%${query}%` } }
        ]
      }
    });
    return users;
  } catch (error) {
    throw new Error('Failed to search users');
  }
}

async function softDeleteUser(username) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    await user.update({ isDeleted: true });
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete user');
  }
}

async function updateUserFields(username, fieldsToUpdate) {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('User not found');

    await user.update({ data: { ...user.data, ...fieldsToUpdate } });
    return { message: 'User fields updated successfully' };
  } catch (error) {
    throw new Error('Failed to update user fields');
  }
}

async function getUsersSortedBy(field) {
  try {
    const users = await User.findAll({
      order: [[field, 'DESC']]
    });
    return users;
  } catch (error) {
    throw new Error('Failed to get users sorted by specified field');
  }
}

module.exports = { saveUserDetails, findMutualFriends, searchUsers, softDeleteUser, updateUserFields, getUsersSortedBy };







