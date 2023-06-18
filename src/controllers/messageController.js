const { Messages } = require("../models/chats/messages.js");
const { Users } = require("../models/users/users.js");

const messageController = {
    //ADD A message
    addAmessage: (req, res) => {
        try {
            Messages.findOne({})
                .sort({ _id: 'desc' })
                .then(lastmessage => {
                    if (lastmessage) {
                        req.body._id = lastmessage._id + 1;
                        const newMessage = new Messages(req.body);
                        newMessage
                            .save()
                            .then(() => res.status(200).json(newMessage))
                    } else {
                        req.body._id = 1
                        const newMessage = new Messages(req.body);
                        newMessage
                            .save()
                            .then(() => res.status(200).json(newMessage))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Get all message by conversationId
    getMessageByConversationId: async (req, res) => {
        try {
            let ConversationId = req.params.id;
            console.log(ConversationId);
            const allMessages = await Messages.find({ conversationId: ConversationId }).sort({ _id: "asc" });
            let responList = [];
            if (allMessages) {
                await Promise.all(allMessages.map(async (el) => {
                    let userInfo = await Users.findById(el.senderId);
                    let item = {
                        ...el._doc,
                        userInfo
                    }
                    responList.push(item);
                }))
            }
            responList.sort((a, b) => { if (a._id > b._id) return 1; return -1 });
            res.status(200).json(responList);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET A message
    // getAmessage: async (req, res) => {
    //     try {
    //         const message = await Messages.findById(req.params.id).populate("Attach");
    //         res.status(200).json(message);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },

    //UPDATE message
    updatemessage: async (req, res) => {
        try {
            const message = await Messages.findById(req.params.id);
            await message.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

};

module.exports = messageController;
