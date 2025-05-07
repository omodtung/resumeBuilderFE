"use client";

import { useRouter } from 'next/navigation';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from "react-router-dom";
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
import { UserResumesList } from './UserResumesList';

function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/landingpage');
  };

  return (
    <>
      {isClient ? (
        <div className="relative">
          <button
            onClick={handleLogout}
            className="absolute top-2 right-2 z-10 px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Logout
          </button>
          <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}  />
            <Resource name="user_subscriptions" list={UserSubscriptionList} edit={UserSubscriptionEdit} />
            <Resource name="resumes" list={ResumeList} edit={ResumeEdit} create={ResumeCreate} />
            <Resource name="plans" list={PlanList} edit={PlanEdit} create={PlanCreate} />
            {/* <Resource name="users/resumes/:userId" list={UserResumesList} options={{ label: '' }} /> */}
            <CustomRoutes>
              <Route
              path="users/resumes/:userId"
              element={<UserResumesList/>}
              />
            </CustomRoutes>
          </Admin>
        </div>
      ) : null}
    </>
  );
}

export default AdminPage;
