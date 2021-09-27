const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Model export
const User = require('../../models/User');

// ROUTE:   POST /api/users
// ACCESS:  Public
// DESC:    Register new user
router.post('/', (req, res) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password) return res.status(400).json({ message: "Please, fill out all fields!" });

    User.findOne({ email })
    .then(user => {

        // Check for existing user
        if(user) return res.status(400).json({ message: "User already exists!" });

        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;
                newUser.save()
                .then(user => {

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

    });

});

// ROUTE:   DELETE /api/users/:id
// ACCESS:  Private
// DESC:    Delete user
router.delete('/:id', auth, (req, res) => {

    const userId = req.params.id;

    User.findByIdAndDelete(userId, (err, doc) => {

        if(err) throw err;

        res.json(doc);
        
    });

});

module.exports = router;