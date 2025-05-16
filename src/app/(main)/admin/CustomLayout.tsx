import React from "react";
import { Layout, LayoutProps } from "react-admin";
import CustomMenu from "./CustomMenu"; // Import your custom menu

const CustomLayout = (props: LayoutProps) => <Layout {...props} menu={CustomMenu} />;

export default CustomLayout;
