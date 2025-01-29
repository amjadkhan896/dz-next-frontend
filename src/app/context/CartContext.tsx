"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define types
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem, quantity: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    setCartOpen: (isOpen: boolean) => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(typeof window === "undefined" ? [] : JSON.parse(localStorage.getItem("cart") || "[]"));
    const [isCartOpen, setCartOpen] = useState(false);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (item: CartItem, quantity: number) => {
        setCart((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);

            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }

            // Ensure quantity is merged at the end of the object
            return [...prev, { ...item, quantity: (quantity || 0 + 1) }];
        });
    };

    // Remove item from cart
    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // Update item quantity
    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setCartOpen }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Custom hook for using cart context
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

