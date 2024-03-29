'use client';

import { useEffect, useState } from 'react';
import { titleFont } from '@/config/fonts'
import { getStockBySlug } from '@/actions';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getStock();
    }, [])
    
    const getStock = async() => {
        const inStock = await getStockBySlug( slug );
        setStock( inStock );
        setIsLoading( false );
    }

    return (
        <>
            {
                (isLoading)
                    ? <h3 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse rounded-lg`}>&nbsp;</h3>
                    : <h3 className={`${titleFont.className} antialiased font-bold text-lg`}> Stock: { stock }</h3>
            }
        </>
    )
}
