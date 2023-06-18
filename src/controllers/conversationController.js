const { Conversations } = require("../models/chats/conversations.js");
const { Users } = require("../models/users/users.js");
const { Messages } = require("../models/chats/messages.js");
const { Groups } = require("../models/chats/groups.js")
const conversationController = {
    //ADD A conversation
    addAconversation: (req, res) => {
        try {
            Conversations.findOne({})
                .sort({ _id: 'desc' })
                .then(lastconversation => {
                    if (lastconversation) {
                        req.body._id = lastconversation._id + 1;
                        const newconversation = new Conversations(req.body);
                        newconversation
                            .save()
                            .then(() => res.status(200).json(newconversation))
                    } else {
                        req.body._id = 1
                        const newconversation = new Conversations(req.body);
                        newconversation
                            .save()
                            .then(() => res.status(200).json(newconversation))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL Conversations
    getAllConversations: async (req, res) => {
        let name = req.query.name;
        if (name != null) {
            try {
                const conversations = await Conversations.find({ $and: [{ userId: req.params.id }, { nickname: { $regex: name, $options: 'i' } }, { isBlock: false }] });
                let responList = [];
                if (conversations) {
                    await Promise.all(conversations.map(async (el) => {
                        let partnerinfo = await findUser(el.partnerId);
                        let Message = await findMessage(el._id);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            partnerinfo,
                            Message
                        };
                        responList.push(item);
                    }));
                    res.status(200).json(responList);
                }
            } catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            try {
                const conversations = await Conversations.find({ $and: [{ userId: req.params.id }, { isBlock: false }] });
                let responList = [];
                if (conversations) {
                    await Promise.all(conversations.map(async (el) => {
                        let partnerinfo = await findUser(el.partnerId);
                        let Message = await findMessage(el._id);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            partnerinfo,
                            Message
                        };
                        responList.push(item);
                    }));
                    res.status(200).json(responList);
                }
            } catch (err) {
                res.status(500).json(err);
            }

        }
    },


    //GET A conversation
    // getAconversation: async (req, res) => {
    //     try {
    //         const conversation = await Conversations.findById(req.params.id).populate("Attach");
    //         res.status(200).json(conversation);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    // get Partner of user
    getPartnerById: async (req, res) => {
        try {
            const conversation = await Conversations.find({ $and: [{ userId: req.params.id }, { isBlock: false }] });
            res.status(200).json(conversation);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE conversation
    updateconversation: async (req, res) => {
        try {
            const conversation = await Conversations.findById(req.params.id);
            await conversation.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteAConversation: async (req, res) => {
        try {
            // const conversation = await Conversations.findById(req.params.id);
            await Conversations.findById(req.params.id).deleteMany();
            res.status(200).json("delete successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    }

};

async function findMessage(id) {
    let MessageInfo = await Messages.find({ conversationId: id }).sort({ _id: 'desc' });
    console.log("check ", MessageInfo);
    if (MessageInfo == "") {
        return ""
    }
    else {
        return MessageInfo[0].messageContent;
    }
}

async function findUser(id) {
    const userinfo = await Users.findById(id);
    if (userinfo == "") {
        return "Not Found"
    }
    else {
        return userinfo
    }
}

async function findGroup(id) {
    const Groupinfo = await Groups.findById(id);
    return Groupinfo;
}
module.exports = conversationController;
