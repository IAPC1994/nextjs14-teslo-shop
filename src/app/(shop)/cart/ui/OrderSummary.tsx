'use client';

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from '../../../../utils/currencyFormat';
import { redirect } from "next/navigation";

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, tax, total } = useCartStore( state => state.getSummaryInformation() );

    useEffect(() => {
      setLoaded( true );
      if( itemsInCart === 0 && loaded ){
        redirect('/empty');
      }
    }, [itemsInCart])
    
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
