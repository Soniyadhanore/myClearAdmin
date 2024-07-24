import React, { useState } from "react";
import { Avatar, Badge, Layout, Menu } from "antd";
import {
  DownOutlined,
  UserOutlined,
  UnlockOutlined,
  LoginOutlined,
  BellOutlined,
} from "@ant-design/icons";
import ChangePassword from "../../Modal/ChangePassword";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import Notification from "../../Modal/Notification";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Axios/services/AuthService";
import addDeleteGetLocalStorage from "../../Axios/addDeleteGetLocalStorage";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const { Header } = Layout;
const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const showChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };
  const handleChangePasswordOk = () => {
    setIsChangePasswordModalOpen(false);
  };
  const handleChangePasswordCancel = () => {
    setIsChangePasswordModalOpen(false);
  };

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const handleLogoutOk = async() => {
    setIsLogoutModalOpen(false);
    dispatch(changeLoader(true));
   try {
     const response = await logout();
     if (response.ack) {
       localStorage.clear();
       navigate("/");
     }
     toast[response.ack ? "success" : "error"](response.message, {
      limit: 1,
      toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
    });
     dispatch(changeLoader(false));
   } catch (error) {
     dispatch(changeLoader(false));
     console.log(error);
   }
  };
  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };
  const showNotificationDrawer = () => {
    setNotificationDrawerOpen(true);
  };
  const handleNotificationDrawerClose = () => {
    setNotificationDrawerOpen(false);
  };
  return (
    <>
      <Header style={{ background: "#fff", padding: "0px 16px" }}>
        <div className="text-right">
          <Menu mode="horizontal" className="ml-auto flex justify-end">
            <Badge count={100} className="noti-icon cursor-pointer"  onClick={showNotificationDrawer}>
              <BellOutlined />
            </Badge>
            <Menu.SubMenu
              key="SubMenu"
              title={
                <>
                  <span
                    className="cursor-pointer inline-block"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Avatar size={40} icon={<UserOutlined />} />
                    <span className="mx-2">Admin Name</span>
                    <DownOutlined />
                  </span>
                </>
              }
            >
              <Menu.Item onClick={() => navigate("/account-settings")}>
                <UserOutlined className="mr-1" /> Profile
              </Menu.Item>
              <Menu.Item onClick={showChangePasswordModal}>
                <UnlockOutlined className="mr-1" /> Change Password
              </Menu.Item>
              <Menu.Item onClick={showLogoutModal}>
                <LoginOutlined className="mr-1" /> Logout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
      {isChangePasswordModalOpen && <ChangePassword
        isOpen={true}
        onOk={handleChangePasswordOk}
        onCancel={handleChangePasswordCancel}
      />}
      { isLogoutModalOpen && <ConfirmationModal
        ConfirmationHeading="Logout"
        ConfirmationParagraph="Are you sure you want to logout?"
        isOpen={true}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
      />}
      <Notification
        isOpen={notificationDrawerOpen}
        onClose={handleNotificationDrawerClose}
      />
    </>
  );
};

export default HeaderComponent;
