import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LaptopOutlined,
  ContainerOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import addDeleteGetLocalStorage from "../../Axios/addDeleteGetLocalStorage";
import { storageKeys } from "../../Axios/Enum";
const { Sider } = Layout;
const LeftSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const token = addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, {}, "get", "single")
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menu = [
    {
      key: "manage_client",
      icon: <UsergroupAddOutlined />,
      label: "Manage Clients",
      link : "/client-management",
      hasPermission : true
    },
    {
      key: "manage_request",
      icon: <LaptopOutlined />,
      label: "Manage Requests",
      link : "/request-management",
      hasPermission : true
    },
    {
      key: "message",
      icon: <ContainerOutlined />,
      label: "Messages",
      link : "/messages",
      hasPermission : true
    },
    {
      key : 'manage_admin',
      icon : <UserSwitchOutlined />,
      label : "Manage Admins",
      link : "/manage-sub-admin",
      hasPermission : true
    },
    {
      key : 'role_permission',
      icon : <UsergroupAddOutlined />,
      label : "Role & Permissions",
      link : "/roles-and-permissions" ,
      hasPermission : true
    },
    {
      key : 'cms',
      icon : <UsergroupAddOutlined />,
      label : "CMS",
      link : "/cms",
      hasPermission : true
    }
  ];


  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div
        className={`logo flex justify-center h-[56px] my-4 transition-opacity duration-500`}
      >
        {collapsed ? (
          // <img src="/logo-single.svg" alt="logo" className="" />
          <span style={{ color: "#fff", fontSize: "30px", fontWeight: "bold" }}>
            C
          </span>
        ) : (
          <img src="/logo.svg" alt="logo" style={{filter:"brightness(0) invert(1)"}} className="w-[160px]"/>
        )}
      </div>
      <Menu theme="dark" defaultSelectedKeys={"auto"} mode="inline">
        
        {/* {
          menu && menu.map((item) => {
            if(item.hasPermission){
              return <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
            }
          })
        } */}
        <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
          <Link to="/client-management">Manage Client  </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LaptopOutlined />}>
          <Link to="/request-management">Manage Requests</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
          <Link to="/live-chat">Live Chat</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserSwitchOutlined />}>
          <Link to="/manage-sub-admin">Manage Admins</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UsergroupAddOutlined />}>
          <Link to="/roles-and-permissions">Roles & Permissions</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<UsergroupAddOutlined />}>
          <Link to="/cms">CMS</Link>
        </Menu.Item>

        <Menu.Item key="7" icon={<SettingOutlined />}>
          <Link to="/account-settings">Account Settings</Link>
        </Menu.Item>
      </Menu>
      <div className="absolute top-[14px] right-[-42px] text-black text-xl">
        {collapsed ? (
          <MenuUnfoldOutlined
            className="toggle-icon"
            onClick={toggleCollapsed}
          />
        ) : (
          <MenuFoldOutlined className="toggle-icon" onClick={toggleCollapsed} />
        )}
      </div>
    </Sider>
  );
};

export default LeftSidebar;
