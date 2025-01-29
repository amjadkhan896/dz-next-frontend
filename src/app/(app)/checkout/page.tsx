"use client"
import Router from "next/router";
import { useState } from "react";
import Header from "~/src/components/Header";
import { useCart } from "../../context/CartContext";


export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart() as any;
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      handleCheckout(shipping);
      setLoading(false);
    }, 2000);
  };

  const handleCheckout = (shipping: any) => {
    setLoading(true);
    setTimeout(() => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: shipping, products: cart }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert("Payment successful!");
            window.location.href = `/orders?orderId=${data.data.id}`;
          } else {
            alert("Payment failed: " + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert("Payment failed: " + error.message);
        });
      clearCart();
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Header hideCart={true} />
      <div className="container mx-auto p-6 flex">
        <div className="w-fit p-4">
          <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={shipping.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              name="email"
              value={shipping.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleInputChange}
              placeholder="Street Address"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                value={shipping.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="postalCode"
                value={shipping.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="">
              <button
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleOrder}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 border-l">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 border-b pb-4">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.price.currency} {item.price.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between mt-2">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    ${cart.reduce((total: number, item: any) => total + item.price.amount * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Tax (5%):</span>
                  <span className="font-medium">
                    ${((cart.reduce((total: number, item: any) => total + item.price.amount * item.quantity, 0)) * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-blue-600 border-t pt-3 mt-3">
                  <span>Total:</span>
                  <span>
                    ${(
                      cart.reduce((total: number, item: any) => total + item.price.amount * item.quantity, 0) * 1.05
                    ).toFixed(2)}
                  </span>
                </div>
              </div>


            </>
          )}
        </div>
      </div>
    </div>
  );
}





