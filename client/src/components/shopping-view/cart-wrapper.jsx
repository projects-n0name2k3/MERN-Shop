import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import CartItem from "./cart-item";
import { useNavigate } from "react-router-dom";

function CartWrapper({ cartItems }) {
  const navigate = useNavigate();
  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (acc, item) =>
            acc +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((item) => <CartItem key={item.title} item={item} />)}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button
        className="w-full mt-6"
        onClick={() => navigate("/shop/checkout")}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default CartWrapper;
