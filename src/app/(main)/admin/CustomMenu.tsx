import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import clsx from "clsx";
import CustomSubMenu from "./CustomSubMenu";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description"; // Icon for resumes

type MenuName = "menuUsers" | "menuWorkExperience" | "menuEducation" | "menuResumes";

const CustomMenu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    menuUsers: true,
    menuWorkExperience: false,
    menuEducation: false,
    menuResumes: false, // Add state for resumes
  });
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 250 : 70, // Increased width to fit "Work Experience"
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
      className={clsx({
        "RaMenu-open": open,
        "RaMenu-closed": !open,
      })}
    >
      <DashboardMenuItem />
      <CustomSubMenu
        handleToggle={() => handleToggle("menuUsers")}
        isOpen={state.menuUsers}
        name="Users"
        icon={<PeopleIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/users"
          state={{ _scrollToTop: true }}
          primaryText="Users"
          leftIcon={<PeopleIcon />}
          dense={dense}
        />
        <MenuItemLink
          to="/user_subscriptions"
          state={{ _scrollToTop: true }}
          primaryText="User Subscriptions"
          leftIcon={<PeopleIcon />}
          dense={dense}
        />
      </CustomSubMenu>
      <CustomSubMenu
        handleToggle={() => handleToggle("menuWorkExperience")}
        isOpen={state.menuWorkExperience}
        name="Work Experience"
        icon={<WorkIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/work_experience"
          state={{ _scrollToTop: true }}
          primaryText="Work Experience"
          leftIcon={<WorkIcon />}
          dense={dense}
        />
      </CustomSubMenu>
      <CustomSubMenu
        handleToggle={() => handleToggle("menuEducation")}
        isOpen={state.menuEducation}
        name="Education"
        icon={<SchoolIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/educations"
          state={{ _scrollToTop: true }}
          primaryText="Education"
          leftIcon={<SchoolIcon />}
          dense={dense}
        />
      </CustomSubMenu>
      <CustomSubMenu
        handleToggle={() => handleToggle("menuResumes")}
        isOpen={state.menuResumes}
        name="Resumes"
        icon={<DescriptionIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/resumes"
          state={{ _scrollToTop: true }}
          primaryText="Resumes"
          leftIcon={<DescriptionIcon />}
          dense={dense}
        />
      </CustomSubMenu>
    </Box>
  );
};

export default CustomMenu;
