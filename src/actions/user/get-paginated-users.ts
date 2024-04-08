'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async() => {
    try {
        const session = await auth();

        if( session?.user.role !== 'admin' ){
            return {
                ok: false,
                message: 'You should to be authenticated as Admin'
            }
        }

        const users = await prisma.user.findMany({ 
            orderBy:{
                name: 'desc'
            }
        });

        return {
            ok: true,
            users: users
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Users not founded"
        }
    }
}