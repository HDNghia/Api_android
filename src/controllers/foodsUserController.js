const { FoodUsers } = require("../models/foods/foodsUsers.js");
const { Foods } = require("../models/foods/foods.js");

const foodsUserController = {
    //ADD A foodUsers
    addAFoodUsers: (req, res) => {
        try {
            FoodUsers.findOne({})
                .sort({ _id: 'desc' })
                .then(lastFoodUsers => {
                    if (lastFoodUsers) {
                        req.body._id = lastFoodUsers._id + 1;
                        const newFoodUsers = new FoodUsers(req.body);
                        newFoodUsers
                            .save()
                            .then(() => res.status(200).json(newFoodUsers))
                    } else {
                        req.body._id = 1
                        const newFoodUsers = new FoodUsers(req.body);
                        newFoodUsers
                            .save()
                            .then(() => res.status(200).json(newFoodUsers))
                    }

                })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get foodsUser by userid, date return foodUser and foods info
    getFoodByUserID: async (req, res) => {
        try {
            let responeList = [];
            let Session = req.query.session;
            console.log('check session:', Session)
            if (Session == "breakfast") {
                let foodUsersBreakfast = await FoodUsers.find({ $and: [{ userId: req.params.id }, { session: "breakfast" }] });
                if (foodUsersBreakfast) {
                    await Promise.all(foodUsersBreakfast.map(async (el) => {
                        let foodinfo = await findFood(el.foodId);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            foodinfo
                        };
                        responeList.push(item);
                    }));
                }
            }
            else if (Session == "lunch") {
                let foodUsersLunch = await FoodUsers.find({ $and: [{ userId: req.params.id }, { session: "lunch" }] });
                if (foodUsersLunch) {
                    await Promise.all(foodUsersLunch.map(async (el) => {
                        let foodinfo = await findFood(el.foodId);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            foodinfo
                        };
                        responeList.push(item);
                    }));
                }
            }
            else if (Session == "afternoon") {
                let foodUsersAfternoon = await FoodUsers.find({ $and: [{ userId: req.params.id }, { session: "afternoon" }] });
                if (foodUsersAfternoon) {
                    await Promise.all(foodUsersAfternoon.map(async (el) => {
                        let foodinfo = await findFood(el.foodId);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            foodinfo
                        };
                        responeList.push(item);
                    }));
                }
            }
            else if (Session == "dinner") {
                let foodUsersDinner = await FoodUsers.find({ $and: [{ userId: req.params.id }, { session: "dinner" }] });
                if (foodUsersDinner) {
                    await Promise.all(foodUsersDinner.map(async (el) => {
                        let foodinfo = await findFood(el.foodId);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            foodinfo
                        };
                        responeList.push(item);
                    }));
                }
            }
            else {
                const foodUsers = await FoodUsers.find({ userId: req.params.id });
                if (foodUsers) {
                    await Promise.all(foodUsers.map(async (el) => {
                        let foodinfo = await findFood(el.foodId);
                        // Message.findOne({}).sort({ _id: 'desc' })
                        let item = {
                            ...el._doc,
                            foodinfo
                        };
                        responeList.push(item);
                    }));

                }
            }
            res.status(200).json(responeList);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE foodUsers
    updateFoodUsers: async (req, res) => {
        try {
            const foodUsers = await FoodUsers.findById(req.params.id);
            await foodUsers.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete foodUser by userid and foodid
    DeleteAFoodUser: async (req, res) => {
        try {
            let Foodid = req.query.foodId;
            let UserId = req.query.userId;
            let FindById = await FoodUsers.find({ $and: [{ foodId: Foodid }, { userId: UserId }] });

            if (FindById.toString() != "") {
                await FoodUsers.find().deleteMany({ $and: [{ foodId: Foodid }, { userId: UserId }] });
                res.status(200).json("Delete successfully!");
            }
            else {
                res.status(200).json("Nhập FoodID hoặc UserId không hợp lệ");
            }

        } catch (error) {
            res.status(500).error(err);

        }
    }
};
async function findFood(foodId) {
    const foodinfo = await Foods.findById(foodId);
    return foodinfo;
}
module.exports = foodsUserController;
