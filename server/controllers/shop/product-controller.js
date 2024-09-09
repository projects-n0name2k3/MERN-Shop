import Product from "../../models/Product.js";

export const getFilteredProducts = async (req, res) => {
  try {
    const {
      category = [],
      brand = [],
      gender = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    let filters = {};
    if (category.length > 0) filters.category = { $in: category.split(",") };
    if (brand.length > 0) filters.brand = { $in: brand.split(",") };
    if (gender.length > 0) filters.gender = { $in: gender.split(",") };
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);
    res.status(200).json({ data: products, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(200).json({ data: product, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
