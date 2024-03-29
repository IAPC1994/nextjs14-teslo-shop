export const revalidate = 604800;

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSliceshow, ProductSliceshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions";


interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProductBySlug( slug );

  return {
    title: product?.title ?? 'Product not founded',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not founded',
      description: product?.description ?? '',
      images: [`/products/${ product?.images[1] }`],
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug( slug );

  if( !product ){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
      <div className="col-span-1 md:col-span-2">
      {/* Mobile Sliceshow */}
      <ProductMobileSliceshow 
        title={ product.title } 
        images={ product.images }
        className="block md:hidden"
      />
      {/* Desktop Sliceshow */}
        <ProductSliceshow 
          title={ product.title } 
          images={ product.images }
          className="hidden md:block"
        />
      </div>
    
      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={ product.slug }/>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl` }> { product.title }</h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Size selector */}
        <SizeSelector selectedSize={ product.sizes[0] } availableSizes={ product.sizes }/>

        {/* Quantity selector */}
        <QuantitySelector quantity={ 2 } />

        {/* Button */}
        <button className="btn-primary my-5">Add to cart</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{ product.description }</p>
      </div>
    </div>
  );
}