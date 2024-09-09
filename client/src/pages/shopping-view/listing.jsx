import Filter from "@/components/shopping-view/filter";
import Product from "@/components/shopping-view/product";
import ProductDetail from "@/components/shopping-view/product-detail";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/cart/cart-slice";
import {
  addToFavourite,
  fetchFavouriteItems,
} from "@/store/favourite/favourite-slice";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/product-slice";

import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function Listing() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { products, productDetail } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSort = (e) => {
    setSort(e);
  };

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails(id));
  };

  function handleFilter(getSectionId, getCurrentOption) {
    let copyFilters = { ...filter };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilter(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  useEffect(() => {
    if (productDetail !== null) {
      setOpen(true);
    }
  }, [productDetail]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")));
  }, []);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);

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

  useEffect(() => {
    if (filter !== null && sort !== null) {
      dispatch(getFilteredProducts({ filterParams: filter, sortParams: sort }));
    }
  }, [dispatch, sort, filter]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Filter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {products.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <Product
                product={product}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
                handleAddToFav={handleAddToFav}
              />
            ))}
        </div>
      </div>
      <ProductDetail
        open={open}
        setOpen={setOpen}
        productDetails={productDetail}
      />
    </div>
  );
}

export default Listing;
