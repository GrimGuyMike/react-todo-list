const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

// Model export
const User = require('../../models/User');

// ROUTE:   POST api/auth
// ACCESS:  Public
// DESC:    Authenticate the user
router.post('/', (req, res) => {

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Please, fill out all fields!" });
    }

    User.findOne({ email })
    .then(user => {

        if(!user) return res.status(400).json({ message: "User doesn't exist!" });

        bcrypt.compare(password, user.password)
        .then(matches => {

            if(!matches) return res.status(400).json({ message: "Invalid credentials!" });

            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {

                    if(err) throw err;

                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });

                }
            );

        });

    });
    
});

// ROUTE:   POST api/auth/user
// ACCESS:  Private
// DESC:    Get user data
router.get('/user', auth, (req, res) => {

    User.findById(req.user.id)
    .select('-password')
    .then(data => {
        const user = {
            id: data._id,
            name: data.name,
            email: data.email
        };
        res.json(user)
    });

});

module.exports = router;