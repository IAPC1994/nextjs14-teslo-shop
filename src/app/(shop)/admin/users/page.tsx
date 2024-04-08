// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { redirect } from 'next/navigation';

import { Title } from '@/components';
import { getPaginatedUsers } from '@/actions';
import { UsersTable } from './ui/UsersTable';

export default async function AdminUsersPage() {

  const { ok, users = [] } = await getPaginatedUsers();

  if( !ok ){
    redirect('/auth/login');
  }
  
  return (
    <>
      <Title title="All the users" />

      <div className="mb-10">
        <UsersTable users={ users }/>
      </div>
    </>
  );
}