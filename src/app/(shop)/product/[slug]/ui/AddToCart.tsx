'use client';
import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store';

interface Props {
    product: Product;

    inStock: number;
}

export const AddToCart = ({ product, inStock }: Props) => {

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addProductToCart = useCartStore( state => state.addProductToCart );

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart( cartProduct );
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className='mt-2 text-red-500 fade-in'>
                        You must select a size*
                    </span>
                )
            }

            {/* Size selector */}
            <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={size => setSize(size)} />

            {/* Quantity selector */}
            <QuantitySelector quantity={quantity} onQuantityChanged={quantity => setQuantity(quantity)} inStock={inStock} />

            {/* Button */}
            <button className="btn-primary my-5" onClick={addToCart}>Add to cart</button>
        </>
    )
}
