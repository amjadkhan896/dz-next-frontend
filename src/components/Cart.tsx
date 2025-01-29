'use client'
import React from 'react'
import { useCart } from '../app/context/CartContext';
import Link from 'next/link';


function Cart() {
    const { cart, addToCart, removeFromCart, setCartOpen, isCartOpen } = useCart() as any;

    return (
        <>
            <button onClick={() => setCartOpen(!isCartOpen)} className="flex items-center hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -translate-y-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l1.4-8H6.4L7 13zm1.5 4.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
                <span className="pl-1 -translate-y-1">Cart</span>
            </button>
            {isCartOpen && (
                <div style={{ top: 0, right: 0, bottom: 0 }} className="fixed w-80 bg-white shadow-lg rounded-lg p-4">
                    {/* Replace with actual cart items */}
                    <p className="font-bold">Your cart</p>
                    {cart?.length > 0 && (
                        <>
                            <ul className="mt-2">
                                {cart.map((item: any) => {
                                    return <li key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-none">
                                        <img src={item.images[0]} alt="Product 1" className="w-8 h-8 mr-2 rounded-full" />
                                        <span>{item.name}</span>
                                        <span>{item.quantity} x ${item.price.amount}</span>
                                    </li>
                                })}

                            </ul>
                            <hr className="my-2 border-gray-200" />
                            <div className="mt-2 font-bold flex justify-between">
                                <span>Total:</span>
                                <span>${cart.reduce((total: number, item: any) => total + item.quantity * item.price.amount, 0).toFixed(2)}</span>
                            </div>
                            <Link href="/checkout" onClick={() => setCartOpen(false)} className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center block">
                                Go to checkout
                            </Link>
                            <Link href="void:0" onClick={() => setCartOpen(false)} className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center block">
                                Continue Shopping
                            </Link>
                        </>
                    )}

                </div>
            )
            }
        </>
    );

}

export default Cart

