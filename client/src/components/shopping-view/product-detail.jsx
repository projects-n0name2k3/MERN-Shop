import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import StarRatingComponent from "../common/star-rating";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/cart/cart-slice";
import { toast } from "@/hooks/use-toast";
import { setProductDetail } from "@/store/shop/product-slice";

function ProductDetail({ open, setOpen, productDetails }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(addToCart({ userId: user?.id, productId: id, quantity: 1 })).then(
      (data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product added to cart",
          });
        }
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setProductDetail());
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={5} />
            </div>
            <span className="text-muted-foreground">5</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleAddToCart(productDetails?._id)}
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetail;
