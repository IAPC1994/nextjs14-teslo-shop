'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const cart = useCartStore( state => state.cart );
    const clearCart = useCartStore( state =>  state.clearCart );

    const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation());

    useEffect(() => {
        setLoaded(true);
    }, [])

    const onPlaceOrder = async() => {
        setIsPlacingOrder( true );
        const productToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))
        
        const resp = await placeOrder( productToOrder, address );
        if( !resp.ok ){
            setIsPlacingOrder( false );
            setErrorMessage( resp.message );
            return;
        }

        clearCart();
        router.replace(`/orders/${ resp.order?.id }`);

        setIsPlacingOrder( false );
    }

    if (!loaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className='bg-white rounded-xl shadow-xl p-7' >
            <h2 className='text-2xl mb-2'>Delivery Address</h2>
            <div className='mb-10'>
                <p className='text-xl'>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>

            <h2 className='text-2xl mb-2'>Order checkout</h2>
            <div className='grid grid-cols-2'>
                <span>N° Product</span>
                <span className='text-right'>{itemsInCart === 1 ? '1 Article' : `${itemsInCart} Articles`}</span>

                <span>Subtotal</span>
                <span className='text-right'>{currencyFormat(subTotal)}</span>

                <span>Taxes (15%)</span>
                <span className='text-right'>{currencyFormat(tax)}</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
            </div>
            <div className='mt-5 mb-2 w-full'>
                <p className='mb-5'>
                    <span className='text-xs'>
                        When you click &quot;Place order&quot;, you are accepting our <a href="#" className='underline'>terms and conditions</a> and <a href="#" className='underline'>privacity politics</a>.
                    </span>
                </p>

                <p className='text-red-500'>{ errorMessage }</p>
                <button
                    onClick={ onPlaceOrder }
                    className={
                        clsx(
                            {
                                'btn-primary flex justify-center': !isPlacingOrder,
                                'btn-disabled flex justify-center': isPlacingOrder,
                            }
                        )
                    }
                >
                    Place order
                </button>
            </div>
        </div >
    )
}
