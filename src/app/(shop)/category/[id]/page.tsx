import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

interface Props {
  params: {
    id: Category;
  }
}

const products = initialData.products;

export default function( { params }: Props ) {

  const { id } = params;
  const categoryProducts = products.filter( product => product.gender === id);

  const labels: Record<Category, string> = {
    'men': 'for Men',
    'women': 'for Women',
    'kid': 'for Kids',
    'unisex': 'for everyone'
  }

  // if( id === 'kids'){
  //   notFound();
  // }

  return (
    <>
      <Title 
        title={`Articles ${ (labels)[id] }`}
        subTitle={`Filter: ${ (labels)[id] }`}
        className="mb-2"
      />
      <ProductGrid 
        products={ categoryProducts } 
      />
    </>
  );
}