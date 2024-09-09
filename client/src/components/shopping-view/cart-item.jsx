import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/cart/cart-slice";
import { toast } from "@/hooks/use-toast";
import { updateFavouriteQuantity } from "@/store/favourite/favourite-slice";

function CartItem({ item, isFav }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.shopProducts);

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItems = item.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = products.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = products[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    if (!isFav) {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? getCartItem?.quantity + 1
              : getCartItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item is updated successfully",
          });
        }
      });
    } else {
      dispatch(
        updateFavouriteQuantity({
          userId: user?.id,
          productId: getCartItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? getCartItem?.quantity + 1
              : getCartItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Favourite item is updated successfully",
          });
        }
      });
    }
  };

  const handleDeleteCartItem = (item) => {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: item?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Item removed from cart",
        });
      }
    });
  };
  return (
    <div className="flex items-center space-x-4">
      <img
        src={item?.image}
        alt={item?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{item?.title}</h3>
        <div className="flex items-center gap-2  mt-1">
          <Button
            disabled={item?.quantity === 1}
            onClick={() => handleUpdateQuantity(item, "minus")}
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{item?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={() => handleUpdateQuantity(item, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (item.salePrice > 0 ? item?.salePrice : item?.price) *
            item?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleDeleteCartItem(item)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default CartItem;
