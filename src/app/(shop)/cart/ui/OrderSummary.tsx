'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSummaryInformation() );

    useEffect(() => {
      setLoaded( true );
      if( itemsInCart === 0 && loaded ){
        router.replace('/empty');
      }
    }, [itemsInCart, loaded, router])
    
    if( !loaded ) return <p>Loading...</p>;

    return (
        <div className='grid grid-cols-2'>
            <span>N° Product</span>
            <span className='text-right'>{ itemsInCart === 1 ? '1 Article' : `${ itemsInCart } Articles`  }</span>

            <span>Subtotal</span>
            <span className='text-right'>{ currencyFormat(subTotal) }</span>

            <span>Taxes (15%)</span>
            <span className='text-right'>{ currencyFormat(tax) }</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className='mt-5 text-2xl text-right'>{ currencyFormat(total) }</span>
        </div>
    )
}
