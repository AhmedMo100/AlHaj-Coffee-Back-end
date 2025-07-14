const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            message: 'Users fetched successfully',
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get All Users Error:', error.message);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};
