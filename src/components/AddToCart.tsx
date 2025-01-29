'use client'
import { use, useState } from "react";
import { useCart } from "../app/context/CartContext";

export default function AddToCart(props: any) {
    const { product } = props
    const { cart, addToCart, removeFromCart, updateQuantity, setCartOpen } = useCart() as any;



    return (
        <div className="flex items-center space-x-2">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {
                    updateQuantity(product.id, cart.find((item: any) => item.id === product.id)?.quantity - 1);
                    setCartOpen(true)
                }}
                disabled={cart.find((item: any) => item.id === product.id)?.quantity <= 0}
            >
                -
            </button>

            {cart.length > 0 && cart.find((item: any) => item.id === product.id) ? (
                <span className="px-2">
                    {cart.find((item: any) => item.id === product.id)?.quantity}
                </span>
            ) : (
                <span className="px-2">0</span>
            )}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => {

                    addToCart(product, 1);
                    setCartOpen(true)
                }}
                disabled={cart.find((item: any) => item.id === product.id)?.quantity >= 10}
            >
                +
            </button>

        </div>
    );
}

