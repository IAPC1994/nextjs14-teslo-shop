'use client';
import { useEffect } from 'react';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
      if( errorMessage === 'Success' ){
        window.location.replace('/');
      }
    }, [ errorMessage ])
    

    return (
        <form action={dispatch} className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
                name='email'
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" />


            <label htmlFor="password">Password</label>
            <input
                name='password'
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                { errorMessage && (
                    <div className='flex flex-row mb-2'>
                        <IoInformationOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{ errorMessage }</p>
                    </div>
                )}
            </div>

            <LoginButton />

            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Create account
            </Link>

        </form>
    )
};

function LoginButton() {
    const { pending } = useFormStatus();
   
    return (
        <button
            type='submit'
            className={
                clsx({ 
                    "btn-primary": !pending,
                    "btn-disabled": pending
                })}
                disabled={ pending }
        >
            Continue
        </button>
    );
  }
