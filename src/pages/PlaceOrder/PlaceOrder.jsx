import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, userId } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const totalAmount = getTotalCartAmount();

    try {
      const response = await fetch(
        "https://tomato-backend-zb2y.onrender.com/api/order/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token") || "", // Add this line
          },
          body: JSON.stringify({
            amount: totalAmount,
            customer_id: userId || "guest_" + Date.now(),
            customer_name: formData.firstName + " " + formData.lastName,
            customer_email: formData.email,
            customer_phone: formData.phone,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.payment_session_id) {
        const cashfree = window.Cashfree({ mode: "production" }); // or "sandbox"
        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self",
        });
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={handleBooking}>
      <div className="place-order-left">
        <p className="title">Booking Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          onChange={handleChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={handleChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zipcode"
            name="zipcode"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={handleChange}
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>₹{getTotalCartAmount()}</b>
            </div>
          </div>
          <button type="submit">BOOK HERE</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
