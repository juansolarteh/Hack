const restaurant = require("../models/Restaurant");
const { httpErrorServer } = require("../helpers/httpError.helper");

const getAnyRestaurantPath = async (req, res) => {
  let path;
  try {
    let rest = await restaurant.findOne({ staff: req.userId });
    path = rest ? { _id: rest.id, name: rest.name} : { _id: ""};
  } catch (error) {
    return httpErrorServer(res, error.message);
  }
  res.status(200).json(path);
};

const getRestaurantPathById = async (req, res) => {
  let rest
  try {
    rest = await restaurant.findById(req.params.id).select({name: true});
  } catch (error) {
    return httpErrorServer(res, error.message);
  }
  res.status(200).json(rest);
};

const getRestaurants = async (req, res) => {
  try {
    let restaurants = await restaurant.find(
      { staff: req.userId },
      { createdAt: 0, updatedAt: 0, staff: 0, owner: 0 }
    );
    res.status(200).json(restaurants);
  } catch (error) {
    return httpErrorServer(res, error.message);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    let foundRestaurant = await restaurant
      .findById(req.params.id, { createdAt: 0, updatedAt: 0, _id: 0 })
      .populate( { 
        path: "owner",
        select: { name: true, _id: 0 },
        transform: (owner) => owner.name 
      })
      .populate(
        {
          path: "staff",
          populate: [{ 
            path: "permissions",
            transform: (perm) => perm.name
         }],
          select: {_id:0, password: 0, createdAt: 0, updatedAt: 0}
        },
      );
    return res.status(200).json(foundRestaurant);
  } catch (error) {
    httpErrorServer(res, error.message);
  }
};

const addRestaurant = async (req, res) => {
  const { name, owner, image } = req.body;
  const restaurantGiven = { name, owner, image };

  let newRestaurant = new restaurant({ staff: [owner], ...restaurantGiven });
  try {
    let _id = (await newRestaurant.save()).id;
    res.status(201).json({
      _id,
      name,
      image,
    });
  } catch (error) {
    return httpErrorServer(res, error.message);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    let _id = (await restaurant.findByIdAndDelete(req.params.id))._id;
    return res.status(200).json({
      _id,
    });
  } catch (error) {
    httpErrorServer(res, error.message);
  }
};

const updateRestaurant = async (req, res) => {
  const { name, image } = req.body;
  const restaurantGiven = { name, image };

  try {
    let _id = (
      await restaurant.findByIdAndUpdate(req.params.id, restaurantGiven)
    )._id;
    return res.status(201).json({
      _id,
      ...restaurantGiven,
    });
  } catch (error) {
    httpErrorServer(res, error.message);
  }
};

module.exports = {
  getAnyRestaurantPath,
  getRestaurantPathById,
  getRestaurants,
  getRestaurantById,
  deleteRestaurant,
  addRestaurant,
  updateRestaurant,
};
