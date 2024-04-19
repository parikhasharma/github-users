const express = require('express');
const router = express.Router();
const { saveUserDetails, findMutualFriends, searchUsers, softDeleteUser, updateUserFields, getUsersSortedBy } = require('../controllers/userController');


router.post('/users', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await saveUserDetails(username);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:userId',searchUsers);

router.get('/users/:userId',findMutualFriends);

router.delete('/users/:userId',softDeleteUser);

router.post('/users/:userId',updateUserFields);

router.get('/users/:userId',getUsersSortedBy);


module.exports = router;
