import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"; // Link'i import et
import {
  HomeOutlined,
  WechatOutlined,
  SettingFilled,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: <Link to="/user/dashboard">Anasayfa</Link>, // Link'i burada ekledik
  },
  {
    key: "appointments",
    icon: <CalendarOutlined />,
    label: <Link to="/user/appointments">Randevularım</Link>, // Link'i burada ekledik
  },
  {
    key: "doctors",
    icon: <TeamOutlined />,
    label: <Link to="/user/doctors">Doktorlar</Link>, // Link'i burada ekledik
  },
  {
    key: "chatbot",
    icon: <WechatOutlined />,
    label: <Link to="/user/chatbot">ChatBot</Link>, // Link'i burada ekledik
  },
  {
    key: "settings",
    icon: <SettingFilled />,
    label: <Link to="/user/settings">Ayarlar</Link>, // Link'i burada ekledik
  },
];

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      items={menuItems} // Artık items prop'u ile menü öğelerini ekliyoruz
    />
  );
};

export default MenuList;
