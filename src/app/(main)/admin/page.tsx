"use client";

import { useRouter } from 'next/navigation';
import { Admin, Resource, CustomRoutes, houseLightTheme, houseDarkTheme, LoginWithEmail } from 'react-admin';
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
import { UserSubscriptionListByUser } from './UserSubscriptionListByUser';
import { deepmerge } from '@mui/utils';
import { WorkExperienceList } from './WorkExperienceList';
import WorkExperienceEdit from './edits/WorkExperienceEdit';
import WorkExperienceCreate from './edits/WorkExperienceCreate';
import { EducationList } from './EducationList';
import EducationEdit from './edits/EducationEdit';
import EducationCreate from './edits/EducationCreate';
import customAuthProvider from "./AuthProvider";
import LoginPage from "./LoginPage"; // Import the LoginPage component

function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const router = useRouter();
  const lightTheme = houseLightTheme;
  const darkTheme = deepmerge(houseDarkTheme, { palette: { mode: "dark" } });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      setIsClient(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/landingpage");
  };

  if (!isAuthenticated) {
    return <LoginPage />; // Show the login page if not authenticated
  }

  return (
    <>
      {isClient ? (
        <div className="relative">
          {/* <button
            onClick={handleLogout}
            className="absolute top-1 right-24 z-10 px-4 py-2 bg-red-500 text-white rounded cursor-pointer flex items-center"
          >
            Logout
          </button> */}
          <Admin
            loginPage={LoginWithEmail}
            dataProvider={dataProvider}
            authProvider={customAuthProvider}
            theme={lightTheme}
            darkTheme={darkTheme}
          >
            <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
            <Resource name="user_subscriptions" list={UserSubscriptionList} edit={UserSubscriptionEdit} />
            <Resource name="resumes" list={ResumeList} edit={ResumeEdit} create={ResumeCreate} />
            <Resource name="plans" list={PlanList} edit={PlanEdit} create={PlanCreate} />
            <Resource name="work_experience" list={WorkExperienceList} edit={WorkExperienceEdit} create={WorkExperienceCreate} />
            <Resource name="educations" list={EducationList} edit={EducationEdit} create={EducationCreate} />
            <CustomRoutes>
              <Route path="users/resumes/:userId" element={<UserResumesList />} />
              <Route path="user/user-subscription-follow-userId/:userId" element={<UserSubscriptionListByUser />} />
            </CustomRoutes>
          </Admin>
        </div>
      ) : null}
    </>
  );
}

export default AdminPage;
