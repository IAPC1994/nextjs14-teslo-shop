import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { OrderStatus, PayPalButton, Title } from '@/components';
import { currencyFormat } from '@/utils';
import { getOrderById } from '@/actions';

interface Props {
  params: {
    id: string;
  }
}

export default async function OrderByIdPage( { params }: Props ) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);
  
  if( !ok ){
    redirect('/');
  }

  const address = order!.OrderAddress;

  return ( 
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">

        <Title title={`Order #${id.split('-').at(-1)}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}
          <div className='flex flex-col mt-5'>

            <OrderStatus isPaid={ order!.isPaid }/>

            {/* Items */}
            {
              order!.OrderItem.map( item => (
                <div key={ item.product.slug + "-" + item.size } className='flex mb-5'>
                  <Image src={`/products/${ item.product.productImage[0].url }`} width={ 100 } height={ 100 } alt={ item.product.title } className='mr-5 rounded' style={{ width: '100px', height: '100px' }}/>

                  <div>
                    <Link href={`/product/${ item.product.slug }`} className='underline cursor-pointer'><span className='font-bold'>({ item.size })</span> { item.product.title }</Link> 
                    <p>${ item.price }</p>
                    <p className='font-bold'>Subtotal: { currencyFormat( item.price * item.quantity )}</p>
                  </div>
                </div>
              ))
            }
          </div>
          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
              <h2 className='text-2xl mb-2'>Delivery Address</h2>
              <div className='mb-10'>
                <p className='text-xl'>{ address!.firstName } { address!.lastName }</p>
                <p>{ address!.address }</p>
                <p>{ address!.address2 }</p>
                <p>{ address!.city }, { address!.countryId }</p>
                <p>{ address!.phone }</p>
                <p>{ address!.postalCode }</p>
              </div>

              {/* Divider */}
              <div className='w-full h-0.5 rounded bg-gray-200 mb-10'></div>
              
              <h2 className='text-2xl mb-2'>Order checkout</h2>
              <div className='grid grid-cols-2'>
                <span>N° Product</span>
                <span className='text-right'>{ order!.itemsInOrder }</span>
                
                <span>Subtotal</span>
                <span className='text-right'>{ currencyFormat(order!.subTotal) }</span>
                
                <span>Taxes (15%)</span>
                <span className='text-right'>{ currencyFormat(order!.tax) }</span>
                
                <span className="mt-5 text-2xl">Total</span>
                <span className='mt-5 text-2xl text-right'>{ currencyFormat(order!.total) }</span>
              </div>
              <div className='mt-5 mb-2 w-full'>
                  {
                    order!.isPaid
                      ? (
                        <OrderStatus isPaid={ order!.isPaid }/>
                      )
                      : (
                        <PayPalButton amount={ order!.total } orderId={ order!.id } />
                      )
                  }
                  
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}