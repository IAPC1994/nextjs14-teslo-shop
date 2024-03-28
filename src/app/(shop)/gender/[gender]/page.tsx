export const revalidate = 60;

import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}

export default async function PageByGender( { params, searchParams }: Props ) {

  const { gender } = params;
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });
  
  if( products.length === 0 ){
    redirect(`/gender/${ gender }`);
  }

  const labels: Record<string, string> = { 
    'men': 'for Men',
    'women': 'for Women',
    'kid': 'for Kids',
    'unisex': 'for everyone'
  }

  return (
    <>
      <Title 
        title={`Articles ${ (labels)[gender] }`}
        subTitle={`Filter: ${ (labels)[gender] }`}
        className="mb-2"
      />
      <ProductGrid 
        products={ products } 
      />
      <Pagination totalPages={ totalPages } />
    </>
  );
}