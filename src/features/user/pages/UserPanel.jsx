import React, { useState } from "react";
import { Layout, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const UserPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        darkTheme={darkTheme}
        toggleTheme={toggleTheme}
      />

      <Layout style={{ marginLeft: collapsed ? 80 : 200, minHeight: "100vh" }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ marginLeft: 16 }}
          />
        </Header>

        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserPanel;
