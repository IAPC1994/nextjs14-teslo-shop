'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    try {
        const session = await auth();
        const userId = session?.user.id;
        if (!userId) return { ok: false, message: 'There is no user session' }

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds.map(p => p.productId)
                }
            }
        });

        const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
        const { subTotal, tax, total } = productIds.reduce((totals, item) => {

            const productQuantity = item.quantity;
            const product = products.find(product => product.id === item.productId);

            if (!product) throw new Error(`${item.productId} do not exist - 500`);

            const subTotal = product.price * productQuantity;
            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.15;
            totals.total += subTotal * 1.15;

            return totals;
        }, { subTotal: 0, tax: 0, total: 0 });

        const prismaTx = await prisma.$transaction(async (tx) => {

            const updatedProductsPromises = products.map(( product) => {
                const productQuantity = productIds.filter( p => p.productId === product.id ).reduce( (acc, item ) => item.quantity + acc, 0);

                if( productQuantity === 0 ){
                    throw new Error(`${ product.id } doesn't have a defined quantity`);
                }

                return tx.product.update({
                    where: { id: product.id },
                    data:{
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            const updatedProducts= await Promise.all( updatedProductsPromises );
            updatedProducts.forEach( product => {
                if( product.inStock < 0 ){
                    throw new Error(`${ product.title } doesn't have enough stock`);
                }
            });

            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    },
                }
            });

            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    city: address.city,
                    postalCode: address.postalCode,
                    phone: address.phone,
                    countryId: address.country,
                    orderId: order.id,
                },
            });

            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            message: error?.message,
        }
    }
}