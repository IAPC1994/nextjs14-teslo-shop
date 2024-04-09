import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";


interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductAdminPage({ params }: Props) {

    const { slug } = params;

    const [ product, categories ] = await Promise.all([
        await getProductBySlug(slug),
        await getCategories()
    ])

    if( !product && slug !== 'new' ){
        redirect('/admin/products');
    }

    const title = slug === 'new' ? 'New Product' : 'Edit Product';

    return (
        <>
            <Title title={ title } />
            <ProductForm product={ product ?? {} } categories={ categories } />
        </>
    );
}