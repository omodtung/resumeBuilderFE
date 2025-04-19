"use client";

import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import simpleRestProvider from 'ra-data-simple-rest';
import { useEffect, useState } from 'react';

const dataProvider = simpleRestProvider('http://localhost:8080/admin');

function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Admin dataProvider={dataProvider}>
          <Resource name="users" list={UserList} />
        </Admin>
      ) : null}
    </>
  );
}

export default AdminPage;
