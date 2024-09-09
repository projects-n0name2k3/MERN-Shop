import React, { useEffect, useState } from "react";
import {
  Airplay,
  BabyIcon,
  ChevronDown,
  ChevronsDown,
  CloudLightning,
  Footprints,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Product from "@/components/shopping-view/product";
import { addToCart, fetchCartItems } from "@/store/cart/cart-slice";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/product-slice";
import ProductDetail from "@/components/shopping-view/product-detail";
import { images } from "@/constants";
import { GrUserFemale } from "react-icons/gr";
import { CiBasketball } from "react-icons/ci";
import { SiNike, SiAdidas, SiReebok } from "react-icons/si";
import { GiAlliedStar } from "react-icons/gi";
import {
  addToFavourite,
  fetchFavouriteItems,
} from "@/store/favourite/favourite-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: GrUserFemale },
  { id: "running", label: "Running", icon: Footprints },
  { id: "basketball", label: "Basketball", icon: CiBasketball },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: SiAdidas },
  { id: "reebok", label: "Reebok", icon: SiReebok },
  { id: "converse", label: "Converse", icon: GiAlliedStar },
];

function Home() {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const { products, productDetail } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(getProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (productDetail !== null) setOpen(true);
  }, [productDetail]);

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  const handleAddToFav = (getCurrentProductId) => {
    dispatch(
      addToFavourite({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchFavouriteItems(user?.id));
        toast({
          title: "Product is added to favourite",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(
      getFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen font-primary">
      <section className="w-full h-screen grid place-items-center relative overflow-hidden">
        <img src={images.hero} className="w-[75%] h-[75%]" />
        <div className="absolute bottom-16 animate-bounce flex flex-col items-center gap-2 select-none cursor-pointer">
          <span className=" font-medium text-xl tracking-wide">Shop now</span>
          <ChevronsDown size={20} />
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-medium text-center mb-8 tracking-widest uppercase">
            Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(
                    categoryItem,
                    categoryItem.label === "Women" ||
                      categoryItem.label === "Men"
                      ? "gender"
                      : "category"
                  )
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Card className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </Card>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-medium text-center mb-8 tracking-widest uppercase">
            Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-medium text-center mb-8 uppercase tracking-widest">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products && products.length > 0
              ? products.map((productItem) => (
                  <Product
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                    handleAddToFav={handleAddToFav}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetail
        open={open}
        setOpen={setOpen}
        productDetails={productDetail}
      />
    </div>
  );
}

export default Home;
