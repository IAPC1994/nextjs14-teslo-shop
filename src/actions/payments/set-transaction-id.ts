'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async( orderId: string, transactionId: string ) => {
    try {
        const updatedOrder = await prisma.order.update({ 
            where: { id: orderId }, 
            data: {
                transactionId: transactionId
            }
        });

        if( !updatedOrder ){
            return {
                ok: false,
                message: `Order with ${ orderId } not found`
            }
        }

        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Failed in update the order'
        }
    }
}