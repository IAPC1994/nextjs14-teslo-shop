import Image from 'next/image';
import Link from 'next/link';
import { Title } from '../../../components/ui/title/Title';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components';

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title={'Cart'} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Add more items</span>
            <Link href={'/'} className='underline mb-5'>
              Continue shopping
            </Link>
          

            {/* Items */}
            {
              productInCart.map( product => (
                <div key={ product.slug } className='flex mb-5'>
                  <Image src={`/products/${ product.images [0] }`} width={ 100 } height={ 100 } alt={ product.title } className='mr-5 rounded' style={{ width: '100px', height: '100px' }}/>

                  <div>
                    <p>{ product.title }</p>
                    <p>${ product.price }</p>
                    <QuantitySelector quantity={ 3 }/>
                    <button className='underline mt-3'>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
              <h2 className='text-2xl mb-2'>Order checkout</h2>
              <div className='grid grid-cols-2'>
                <span>N° Product</span>
                <span className='text-right'>3 Articles</span>
                
                <span>Subtotal</span>
                <span className='text-right'>$ 100</span>
                
                <span>Taxes (15%)</span>
                <span className='text-right'>$ 15</span>
                
                <span className="mt-5 text-2xl">Total</span>
                <span className='mt-5 text-2xl text-right'>$ 115</span>
              </div>
              <div className='mt-5 mb-2 w-full'>
                <Link href={'/checkout/address'} className='flex btn-primary justify-center'>
                  Checkout
                </Link>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}