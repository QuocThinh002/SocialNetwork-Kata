
const crypto = require('crypto')

const userModel = require('../models/user.model')
const { convertVNSlug2, randomInt } = require('../utils')
const { fakerVI } = require('@faker-js/faker');
const { random } = require('lodash');

class CreateController {

    usersRandom = async (req, res, next) => {
        try {
            for (let i = 0; i < 200; ++i) {
                const name = fakerVI.person.fullName();
                const email = convertVNSlug2(name).split(' ').join('') + i + '@gmail.com';
                const password = `qwer1234`;
                const profilePicture = fakerVI.image.avatar();
                const coverPhoto = fakerVI.image.avatarGitHub();
                const birthdate = fakerVI.date.birthdate();
                const verificationToken = crypto.randomBytes(32).toString('hex')

                const newUser = await userModel.create({ name, email, password, profilePicture, coverPhoto, birthdate, verificationToken, status: 'active' })
                // Internal Server Error (500)
                if (!newUser) {
                    console.log({
                        status: false,
                        userIndex: i,
                        name,
                        email,
                        password
                    })
                }
            }

            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
            })
        } catch (error) {
            next(error)
        }
    }

    one = async (req, res, next) => {
        try {
            const verificationToken = crypto.randomBytes(32).toString('hex')

            const newUser = await userModel.create({ ...req.body, verificationToken, status: 'active' })
            // Internal Server Error (500)
            if (!newUser) {
                console.log({
                    status: false,
                })
            }

            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
            })
        } catch (error) {
            next(error)
        }
    }

    friendsRandom = async (req, res, next) => {
        try {
            const nFriends = randomInt(10000, 12000)
            const users = await userModel.find({ $where: "this.friends.length < 5000" });
            for (let i = 0; i < nFriends; ++i) {
                let idx1, idx2;
                do {
                    idx1 = randomInt(0, users.length - 1)
                    idx2 = randomInt(0, users.length - 1);
                } while (idx1 == idx2)

                let user1 = users[idx1];
                let user2 = users[idx2];
                let isFriend = user1.friends.includes(user2._id);
                if (!isFriend) {
                    user1.friends.push({userId: user2._id, alias: user2.name});
                    user2.friends.push({userId: user1._id, alias: user1.name});

                    await Promise.all([userModel.updateOne({ _id: user1._id }, { friends: user1.friends }),
                    userModel.updateOne({ _id: user2._id }, { friends: user2.friends })]);
                }
            }

            // 201: CREATED
            return res.status(201).json({
                code: 201,
                status: true,
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new CreateController()