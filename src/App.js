import React,{useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import HeaderComponent from "./Layout/HeaderComponent";
import LeftSidebar from "./Layout/LeftSidebar";
import Login from "./Pages/Auth/Login";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
// import ClientManagement from "./Pages/";
import RequestManagement from "./Pages/RequestManagement";
import ManageSubAdmins from "./Pages/ManageSubAdmins";
import AddAdmin from "./Pages/ManageSubAdmins/AddAdmin";
import ViewAdmin from "./Pages/ManageSubAdmins/ViewAdmin";
import EditAdmin from "./Pages/ManageSubAdmins/EditAdmin";
import RolesAndPermissions from "./Pages/RolesAndPermissions";
import ViewRoles from "./Pages/RolesAndPermissions/ViewRoles";
import CMSPage from "./Pages/CMS";
import CmsEditor from "./Pages/CMS/CmsEditor";
import ViewRequestManagement from "./Pages/RequestManagement/ViewRequestManagement";
import RaiseRequest from "./Pages/RequestManagement/RaiseRequest";
import AccountSettings from "./Pages/AccountSettings";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import ViewClientManagement from "./Pages/ClientManagement/ViewClientManagement";
import ClientManagement from "./Pages/ClientManagement";
import AuthGuard from "./ProctedRoutes/AuthGuard";
import LoginGuard from "./ProctedRoutes/LoginGuard";
import BarLoader from "react-spinners/BarLoader";
import { currentLoader } from "./Redux/reducers/loader";
import { useSelector } from "react-redux";
import LiveChat from "./Pages/LiveChat";
import Pick from "./Pages/LiveChat/LiveChatTabs/Pick";
import ViewChatLog from "./Pages/LiveChat/LiveChatTabs/ViewChatLog";
import { getSocket, initializeSocket } from "./Socket/socket";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { i18n } = useTranslation();
  const loader = useSelector(currentLoader);

  const toggleSidebar = (collapsedState) => {
    setCollapsed(collapsedState);
  };

  const changeLanguage = (lang) => {
    localStorage.setItem("i18nextLng", lang);
    i18n.changeLanguage(lang);
  };

  useEffect(async()=>{
    let socket = getSocket()
    if (!socket) {
      await initializeSocket()
      socket = getSocket()
      if (!socket) return
    }
      if(socket){
        socket.on('connect' , () =>{
             console.log('connected')
        })
      }
  },[])

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")) {
      if (![ "en"].includes(localStorage.getItem("i18nextLng"))) {
        localStorage.setItem("i18nextLng", "en");
        changeLanguage("en");
      }
      changeLanguage(localStorage.getItem("i18nextLng"));
    } else {
      localStorage.setItem("i18nextLng", "en");
      changeLanguage("en");
    }
  }, []);
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0DBFF1",
          },
          
        }}
      >
    <Router>
      <Routes>
        {/* auth Route */}
        <Route element={<LoginGuard />} >
        <Route path="/" element={<Login />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<AuthGuard />} >
          <Route path="/reset-password" element={<ResetPassword/>} />
          {/* Layout with Sidebar and Header */}
          <Route path="/*" element={
            <Layout style={{ minHeight: "100vh" }}>
              <LeftSidebar collapsed={collapsed} toggleCollapsed={toggleSidebar} />
              <Layout>
                <HeaderComponent toggleCollapsed={toggleSidebar} />
                <Content style={{ margin: "16px 16px" }}>
                  <Routes>
                    {/* Dashboard Route */}
                    <Route path="/client-management" element={<ClientManagement />} />
                    <Route path="/view-client-management/:slug" element={<ViewClientManagement />} />
                    <Route path="/request-management" element={<RequestManagement />} />
                    <Route path="/view-request/:slug" element={<ViewRequestManagement />} />
                    <Route path="/raise-request" element={<RaiseRequest />} />
                    <Route path="/raise-request/:slug" element={<RaiseRequest />} />
                    <Route path="/live-chat" element={<LiveChat />} />
                    <Route path="/manage-sub-admin" element={<ManageSubAdmins />} />
                    <Route path="/add-admin" element={<AddAdmin />} />
                    <Route path="/view-admin/:slug" element={<ViewAdmin />} />
                    <Route path="/edit-admin/:slug" element={<EditAdmin />} />
                    <Route path="/roles-and-permissions" element={<RolesAndPermissions />} />
                    <Route path="/view-roles/:slug" element={<ViewRoles />} />
                    <Route path="/cms" element={<CMSPage />} />
                    <Route path="/cms-editor/:slug" element={<CmsEditor />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="/pink" element={<Pick />} />
                    <Route path="/view-chat-log" element={<ViewChatLog />} />
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          } />

        </Route>

        
      </Routes>
    </Router>
    {loader && <div className="loader">
      <BarLoader
          color={'#0DBFF1'}
          height={10}
          width={300}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>}
    <ToastContainer />
    </ConfigProvider>
  );
};

export default App;