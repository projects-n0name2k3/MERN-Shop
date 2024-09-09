import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItem from "./cart-item";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { fetchCartItems } from "@/store/cart/cart-slice";

function FavWrapper({ favouriteItems }) {
  const navigate = useNavigate();
  const { favItems } = useSelector((state) => state.favourite);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const totalAmount =
    favouriteItems && favouriteItems.length > 0
      ? favouriteItems.reduce(
          (acc, item) =>
            acc +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;

  const handleAddToCart = async () => {
    const items = favouriteItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    try {
      await axios
        .post("http://localhost:3000/api/shop/favourite/add-to-bag", {
          userId: user?.id,
          favItems: items,
        })
        .then((data) => {
          if (data?.data?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({
              title: data?.data?.message,
            });
          } else {
            toast({
              title: data?.data?.message,
              variant: "destructive",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Favourite</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {favouriteItems &&
          favouriteItems.length > 0 &&
          favouriteItems.map((item) => (
            <CartItem key={item.title} item={item} isFav={true} />
          ))}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={handleAddToCart}>
        Add to bag
      </Button>
    </SheetContent>
  );
}

export default FavWrapper;
