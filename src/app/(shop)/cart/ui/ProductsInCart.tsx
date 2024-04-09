'use client';

import Image from "next/image";
import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
    const removeProduct = useCartStore( state => state.removeProduct );
    const [loaded, setLoaded] = useState(false);
    const productInCart = useCartStore( state => state.cart );

    useEffect(() => {
        setLoaded( true );
    }, [])
    

    if( !loaded ){
        return <p>Loading...</p>;
    }

    return (
        <>
            {
                productInCart.map(product => (
                    <div key={`${ product.slug }-${ product.size }`} className='flex mb-5'>
                        <ProductImage src={product.image} width={100} height={100} alt={product.title} className='mr-5 rounded' style={{ width: '100px', height: '100px' }} />

                        <div>
                            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}><span className="font-bold">{product.size}</span> - {product.title}</Link>
                            <p>${product.price}</p>
                            <QuantitySelector quantity={product.quantity} onQuantityChanged={ quantity => updateProductQuantity( product, quantity )} />
                            <button onClick={ () => removeProduct( product ) } className='underline mt-3'>Remove</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
