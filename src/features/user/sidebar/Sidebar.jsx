// Sidebar.jsx
import React from "react";
import { Layout } from "antd";
import Logo from "./Logo";
import MenuList from "./MenuList";
import ToggleThemeButton from "./ToggleThemeButton";

const { Sider } = Layout;

const Sidebar = ({ collapsed, darkTheme, toggleTheme }) => {
  return (
    <Sider
      collapsed={collapsed}
      collapsible
      trigger={null}
      theme={darkTheme ? "dark" : "light"}
      style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
    >
      <Logo />
      <MenuList darkTheme={darkTheme} />
      <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
    </Sider>
  );
};

export default Sidebar;
