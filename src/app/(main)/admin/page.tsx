"use client";


import { Admin, Resource } from 'react-admin';
import { UserList } from './users';
import UserEdit from './edits/userEdit';
import UserCreate from './edits/UserCreate';
import ResumeCreate from './edits/ResumeCreate';
import { ResumeList } from './resumes';
import UserSubscriptionList from './UserSubscriptionList';
import ResumeEdit from './edits/ResumeEdit';
import UserSubscriptionEdit from './edits/UserSubscriptionEdit';
import PlanList from './PlanList';
import PlanEdit from './edits/PlanEdit';
import PlanCreate from './edits/PlanCreate';
import { useEffect, useState } from 'react';
import { dataProvider } from './DataProvider';

function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Admin dataProvider={dataProvider}>
          <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}  />
          <Resource name="user_subscriptions" list={UserSubscriptionList} edit={UserSubscriptionEdit} />
          <Resource name="resumes" list={ResumeList} edit={ResumeEdit} create={ResumeCreate} />
          <Resource name="plans" list={PlanList} edit={PlanEdit} create={PlanCreate} />
        </Admin>
      ) : null}
    </>
  );
}

export default AdminPage;
