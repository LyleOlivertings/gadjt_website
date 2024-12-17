"use client";

import { useState } from "react";
import CouponInput from "@/components/CouponInput";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

type Coupon = {
  type: "fixed" | "percentage";
  value: number;
};

const coupons: Record<string, Coupon> = {
  SAVE50: { type: "fixed", value: 50 },
  DISCOUNT10: { type: "percentage", value: 10 },
};

const Cart = () => {
  const cart = useCart();

  // Subtotal, VAT, and total calculations
  const subtotal: number = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const vat: number = subtotal * 0.15;

  const [discount, setDiscount] = useState<number>(0);
  const totalWithVAT: number = subtotal + vat - discount;

  // Function to apply the coupon
  const applyCoupon = (code: string): boolean => {
    const coupon = coupons[code];

    if (coupon) {
      const { type, value } = coupon;

      if (type === "fixed") {
        setDiscount(value);
      } else if (type === "percentage") {
        setDiscount((subtotal * value) / 100);
      }
      return true; // Coupon applied successfully
    }

    setDiscount(0); // Reset discount for invalid coupon
    return false;
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />
        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    alt="product"
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">{cartItem.size}</p>
                    )}
                    <p className="text-small-medium">R {cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${
            cart.cartItems.length > 1 ? "items" : "item"
          })`}</span>
        </p>

        <div className="flex justify-between text-body-semibold">
          <p>Subtotal</p>
          <p>R {subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-body-bold">
          <p>VAT (15%):</p>
          <p>R {vat.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-body-bold">
          <p>Discount:</p>
          <p>-R {discount.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-heading4-bold">
          <p>Total:</p>
          <p>R {totalWithVAT.toFixed(2)}</p>
        </div>

        <CouponInput applyCoupon={applyCoupon} />
      </div>
    </div>
  );
};

export default Cart;
