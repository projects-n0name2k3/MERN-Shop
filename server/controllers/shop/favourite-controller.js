import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";
import Favourite from "../../models/Favourite.js";

export const addToFavourite = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let favourite = await Favourite.findOne({ userId });

    if (!favourite) {
      favourite = new Favourite({ userId, items: [] });
    }

    const findCurrentProductIndex = favourite.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      favourite.items.push({ productId, quantity });
    } else {
      favourite.items[findCurrentProductIndex].quantity += quantity;
    }

    await favourite.save();
    res.status(200).json({
      success: true,
      data: favourite,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const addFavouriteToCart = async (req, res) => {
  try {
    const { userId, favItems } = req.body;

    if (!userId || !favItems) {
      return res
        .status(400)
        .json({ message: "Invalid data provided", success: false });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    favItems.forEach(async (item) => {
      const findCurrentProductIndex = cart.items.findIndex(
        (cartItem) =>
          cartItem.productId.toString() === item.productId.toString()
      );
      if (findCurrentProductIndex === -1) {
        cart.items.push({ productId: item.productId, quantity: item.quantity });
      } else {
        cart.items[findCurrentProductIndex].quantity += item.quantity;
      }
    });
    await cart.save();
    res
      .status(200)
      .json({ message: "Add to bag successfully", success: true, data: cart });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const getFavouriteItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Invalid data provided", success: false });
    }
    const favourite = await Favourite.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price image salePrice",
    });
    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }
    const validItems = favourite.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < favourite.items.length) {
      favourite.items = validItems;
      await favourite.save();
    }
    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...favourite._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const updateFavouriteItems = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const favourite = await Favourite.findOne({ userId });
    if (!favourite) {
      return res
        .status(404)
        .json({ message: "Favourite item not found", success: false });
    }
    const findCurrentProductIndex = favourite.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found in your favourite!",
      });
    }

    favourite.items[findCurrentProductIndex].quantity = quantity;

    await favourite.save();
    await favourite.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateFavouriteItems = favourite.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...favourite._doc,
        items: populateFavouriteItems,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const deleteFavouriteItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const favourite = await Favourite.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Favourite not found!",
      });
    }

    favourite.items = favourite.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await favourite.save();

    await favourite.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateFavouriteItems = favourite.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...favourite._doc,
        items: populateFavouriteItems,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
