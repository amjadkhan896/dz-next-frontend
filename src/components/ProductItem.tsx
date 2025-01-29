import React from 'react'
import { useCart } from '../app/context/CartContext';
import AddToCart from './AddToCart';


export default function ProductItem(props: any) {
    const product = props.product


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-5 hover:shadow-2xl mx-5">
            <img className="w-full" src={product.images[0]} alt={product.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 flex items-center justify-between">
                    <span>{product.name}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {product.price.currency} {product.price.amount}
                    </span>
                </div>
                <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2 mb-4">

                <div className="flex items-center justify-between">
                    <a href={`/products/${product.id}`} className="text-blue-500 hover:underline">
                        View Product
                    </a>
                    <AddToCart product={product} />
                </div>
            </div>
        </div>
    );
}
