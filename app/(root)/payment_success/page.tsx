"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);
  
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <p className="text-heading4-bold text-green">Successful Payment</p>
      <p className="text-body-semibold">Thank you for your purchase</p>
      <Link
        href={"/"}
        className="p-4 border text-base-bold rounded-lg hover:bg-black hover:text-white"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
