const router = require("express").Router();
const Restaurant = require("../models").restaurant;

router.use((req, res, next) => {
  console.log("restaurant route正在接受一個request...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結restaurant route...");
});

// 用餐廳名稱尋找餐廳
router.get("/findByName/:theName", async (req, res) => {
  let { theName } = req.params;
  try {
    let restaurantFound = await Restaurant.findOne({ name: theName })
      .populate({
        path: "comment", // Path to the comments array in the Restaurant schema
        select: "text date createdBy", // Include only specific fields from the Comment schema
        populate: {
          path: "createdBy", // Populate the `createdBy` field in Comment
          select: "username", // Include only the username from the User schema
        },
      })
      .exec();

    return res.send(restaurantFound);
    console.log(restaurantFound);

    return res.send(restaurantFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用餐廳id尋找餐廳
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    const restaurantFound = await Restaurant.findById(_id).populate({
      path: "comment", // Path to the comments array in the Restaurant schema
      select: "text date createdBy", // Include only specific fields from the Comment schema
      populate: {
        path: "createdBy", // Populate the `createdBy` field in Comment
        select: "username", // Include only the username from the User schema
      },
    });

    console.log(restaurantFound);
    return res.send(restaurantFound);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

// get 餐廳的所有comment
router.get("/:restaurantId/comments", async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "comments",
      populate: { path: "createdBy", select: "name" }, // Populate user details if needed
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant.comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

//編輯餐廳描述
router.put("/:id/description", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  console.log({ id }, " ", { description });
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    restaurant.description = description;
    await restaurant.save();

    res.json({ message: "Description updated successfully!" });
  } catch (error) {
    console.error("Error updating description:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
