const router = require("express").Router();
const Restaurant = require("../models").restaurant;
//const restaurantValidation = require("../validation").restaurantValidation;

router.use((req, res, next) => {
  console.log("restaurant route正在接受一個request...");
  next();
});

// 獲得系統中的所有餐廳
router.get("/", async (req, res) => {
  try {
    let restaurantFound = await Restaurant.find({})
      .populate("restaurateur", ["username", "email"])
      .exec();
    return res.send(restaurantFound);
  } catch (e) {
    return res.status(5000).send(e);
  }
});

// 用餐廳老闆id來尋找餐廳
router.get("/restaurateur/:_restaurateur_id", async (req, res) => {
  let { _restaurateur_id } = req.params;
  let restaurantFound = await Restaurant.find({
    restaurateur: _restaurateur_id,
  })
    .populate("restaurateur", ["username", "email"])
    .exec();
  return res.send(restaurantFound);
});

// 用顧客id來尋找加到蒐藏清單的餐廳
router.get("/customer/:_customer_id", async (req, res) => {
  let { _customer_id } = req.params;
  let restaurantFound = await Course.find({ students: _student_id })
    .populate("restaurateur", ["username", "email"])
    .exec();
  return res.send(restaurantFound);
});

// 用餐廳名稱尋找餐廳
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let restaurantFound = await Restaurant.find({ title: name })
      .populate("restaurateur", ["email", "username"])
      .exec();
    return res.send(restaurantFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用餐廳id尋找餐廳
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let restaurantFound = await Restaurant.findOne({ _id })
      .populate("restaurateur", ["email"])
      .exec();
    return res.send(restaurantFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 讓顧客透過餐廳名稱來收藏新餐廳
router.post("/like/:_name", async (req, res) => {
  let { _name } = req.params;
  let { _userID } = req.user._id;
  try {
    let restaurant = await Restaurant.findOne({ _name }).exec();
    let customer = await Customer.findOne({ _userID }).exec();
    customer.likedRestaurants.push(restaurant);
    await customer.save();
    return res.send("收藏完成");
  } catch (e) {
    return res.send(e);
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認餐廳存在
  try {
    let restaurantFound = await Restaurant.findOne({ _id }).exec();
    if (!restaurantFound) {
      return res.status(400).send("找不到餐廳。無法刪除餐廳。");
    }

    // 使用者必須是此餐廳的管理者，才能刪除該餐廳
    if (restaurantFound.owner.equals(req.user._id)) {
      await Restaurant.deleteOne({ _id }).exec();
      return res.send("餐廳已被刪除。");
    } else {
      return res.status(403).send("只有此餐廳的管理者才能刪除餐廳。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
