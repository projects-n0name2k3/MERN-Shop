import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { BsHandbag } from "react-icons/bs";
import { Heart } from "lucide-react";

function Product({
  product,
  handleGetProductDetails,
  handleAddToCart,
  handleAddToFav,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto relative cursor-pointer hover:shadow-lg">
      <div className="flex items-center justify-between p-4">
        <Button
          className="bg-black p-2 rounded-md"
          size="icon"
          onClick={() => handleAddToCart(product?._id)}
        >
          <BsHandbag className="w-6 h-6 fill-current text-white" />
        </Button>
        <Heart
          size={24}
          className="cursor-pointer hover:opacity-60"
          onClick={() => handleAddToFav(product?._id)}
        />
      </div>
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="grid place-items-center h-[300px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-[80%] h-[300px] object-cover rounded-lg"
          />
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground capitalize font-medium">
            {product?.gender}, {product?.category}
          </span>
          <span className="text-sm text-muted-foreground capitalize font-medium">
            {product?.brand}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-lg font-semibold text-primary ${
              product?.salePrice > 0 && "line-through"
            }`}
          >
            ${product?.price}
          </span>
          <span
            className={`text-lg font-semibold text-primary ${
              product.salePrice <= 0 ? "hidden" : "block"
            }`}
          >
            {product?.salePrice}
          </span>
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button
          onClick={() => handleAddToCart(product?._id)}
          className="w-full"
        >
          Add to cart
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default Product;
