const { Users } = require("../models/users/users");
const { Accounts } = require("../models/users/accounts")
const crypto = require('crypto');

function hashPassword(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return hashedPassword;
}

const userController = {
    //ADD A USER
    addAUser: (req, res) => {
        try {
            Users.findOne({})
                .sort({ _id: 'desc' })
                .then(lastUser => {
                    if (lastUser) {
                        req.body._id = lastUser._id + 1;
                        const newUser = new Users(req.body);
                        newUser
                            .save()
                            .then(() => {
                                res.status(200).json(newUser);
                                const newAccount = new Accounts({
                                    _id: req.body._id,
                                    email: req.body.email,
                                    phonenumber: req.body.phonenumber,
                                    password: hashPassword(req.body.password),
                                    role: req.body.role
                                });
                                newAccount.save().then(()=>{})
                            })
                    }
                    else {
                        req.body._id = 1
                        const newUser = new Users(req.body);
                        newUser
                            .save()
                            .then(() => res.status(200).json(newUser))
                    }
                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
   //GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            let name = req.query.name;
            if (name != null) {
                try {
                    const users = await Users.find({ firstname: { $regex: name, $options: 'i' } });
                    res.status(200).json(users);
                } catch (err) {
                    res.status(500).json(err);
                }
            }
            else {
                const allUsers = await Users.find();
                res.status(200).json(allUsers);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET A USER
    getAUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            const accounts = await Accounts.findById(req.params.id);
            res.status(200).json({...user._doc, password: accounts.password});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    Login: async (req, res) => {
        try {
            const user = await Users.find({ email: req.body.email});
            const accounts = await Accounts.find({ email: req.body.email});
            
            if (hashPassword(req.body.password) == accounts[0].password) {
                let res1 = {...user[0]._doc, password: accounts[0].password};
                res.status(200).json(res1);
            }
            else res.status(400).json({});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    ChangePass: async (req, res) => {
        try {
            const accounts = await Accounts.find({ email: req.body.email});
            const accounts1 = await Accounts.findById(accounts[0]._id);
            let newPass =  hashPassword(req.body.password);
            accounts1.password = newPass;
            await accounts1.updateOne({ $set: accounts1 })
            res.status(200).json(accounts1);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //UPDATE USER
    updateUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = userController;
