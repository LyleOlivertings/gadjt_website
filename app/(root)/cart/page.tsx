"use client"

import useCart from "@/lib/hooks/useCart";

const Cart = () => {
  const cart = useCart();
  return (
    <div className="flex gap-20 py-16 px-10">
      <div className="w-2/3">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr />
        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div className="flex hover:bg-grey1 px-6 py-5 justify-center"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
