import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import React from "react";

function ProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="reletive">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold my-2">{product?.title}</h2>

          <div className="flex items-center justify-between">
            <span
              className={`text-lg font-semibold text-primary ${
                product?.salePrice > 0 && "line-through"
              }`}
            >
              ${product?.price}
            </span>

            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
          <div className="flex items-center justify-between mt-2 text-sm font-semibold">
            <h3 className="capitalize">
              {product?.gender}, {product?.category}
            </h3>
            <h3 className="capitalize">{product?.brand}</h3>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="min-w-24"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setFormData(product);
              setCurrentEditedId(product?._id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="min-w-24"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductTile;
