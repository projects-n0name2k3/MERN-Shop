import {
  Heart,
  HousePlug,
  LogOut,
  Menu,
  ShoppingBag,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/authSlice";
import CartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/cart/cart-slice";
import { setFilter } from "@/store/shop/filter-slice";
import FavWrapper from "./fav-wrapper";
import { BsHandbag } from "react-icons/bs";
import { fetchFavouriteItems } from "@/store/favourite/favourite-slice";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    dispatch(setFilter(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { favItems } = useSelector((state) => state.favourite);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openFavSheet, setOpenFavSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
    dispatch(fetchFavouriteItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button
        onClick={() => {
          setOpenFavSheet(true);
        }}
        variant="outline"
        size="icon"
        className="relative"
      >
        <Heart className="w-6 h-6" />
        {/* <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span> */}
        <span className="sr-only">User cart</span>
      </Button>{" "}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <CartWrapper
          cartItems={
            cartItems && cartItems?.items?.length > 0 && cartItems.items
          }
        />
        <Button
          onClick={() => {
            setOpenCartSheet(true);
          }}
          variant="outline"
          size="icon"
          className="relative"
        >
          <BsHandbag className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        <CartWrapper
          cartItems={
            cartItems && cartItems?.items?.length > 0 && cartItems.items
          }
        />
      </Sheet>
      <Sheet open={openFavSheet} onOpenChange={() => setOpenFavSheet(false)}>
        <FavWrapper
          favouriteItems={
            favItems && favItems?.items?.length > 0 && favItems.items
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.username}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-56">
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <span className="font-bold">N'Store</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default Header;
