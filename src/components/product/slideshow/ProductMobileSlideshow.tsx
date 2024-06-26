'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination} from 'swiper/modules';
import { ProductImage } from '@/components';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSliceshow = ({ images, title, className }:Props) => {

  return (
    <div className={ className }>
        <Swiper
          style={{
            width: '100vw',
            height: '500px'
          }}
          pagination
          autoplay={{
            delay: 2500
          }}
          modules={[FreeMode, Autoplay, Pagination]}
          className="mySwiper2"
        >
          {
            images.map( img => (
              <SwiperSlide key={ img }>
                <ProductImage src={ img } alt={ title } width={ 600 } height={ 500 } className='object-fill' />
              </SwiperSlide>

            ))
          }
      </Swiper>
    </div>
  )
}
