"use client"

import { useState } from "react";

const CouponInput = ({ applyCoupon }: any) => {
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const isValid = applyCoupon(coupon); // Returns true/false
    if (!isValid) {
      setError("Invalid coupon code");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="px-4 py-2 border border-grey-2 rounded-lg"
      />
      <button
        onClick={handleApply}
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
      >
        Apply Coupon
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CouponInput;
