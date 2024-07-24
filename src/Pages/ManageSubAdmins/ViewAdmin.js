import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Divider, Typography, Col, Row, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  LockOutlined,
} from "@ant-design/icons";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { LeftOutlined } from "@ant-design/icons";
import { DeleteAdmin, getAdminDetail, UpdateAdminStatus } from "../../Axios/services/ManageAdmins";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import DateHelper from "../../Helpers/lib/DateHelper";
import { Resend_Password } from "../../Axios/services/ClientManagement";
import { UpdateRequestStatus } from "../../Axios/services/ManageRequest";

const ViewAdmin = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [responceData, setResponceData] = useState({});
  const {slug} = useParams()
  const dispatch = useDispatch();
 
  const handleDeleteOk = async () => {
    dispatch(changeLoader(true));
    try {
      const responce = await DeleteAdmin(slug);
      if(responce?.ack){
        
        navigate("/manage-sub-admin");
      }
      toast[responce.ack ? "success" : "error"](responce.message, {
        limit: 1,
        toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
      });
      setIsDeleteModalOpen(false);
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleResetPassword = async () => {
    dispatch(changeLoader(true));
    try {
      let responce = await Resend_Password(slug);
      if (responce.ack) {
      }
      toast[responce.ack ? "success" : "error"](responce.message, {
        limit: 1,
        toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  const handleResolveOk = async () => {
    dispatch(changeLoader(true));
    try {
      const responce = await UpdateAdminStatus(slug,{status : responceData?.status === "active" ? "inactive" : "active"});
      if (responce?.ack) {
        handlegetAdminDetail()
      }
      toast[responce.ack ? "success" : "error"](responce.message, {
        limit: 1,
        toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
      });
      setResolveModalOpen(false);
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  const handleResolveCancel = () => {
    setResolveModalOpen(false);
  };

  const handlePoupOpen = (type) => {
    if (type === "delete") {
      setIsDeleteModalOpen(true);
      setResolveModalOpen(false);
    } else if (type === "resolve") {
      setResolveModalOpen(true);
      setIsDeleteModalOpen(false);
    }
  };

  const handlegetAdminDetail = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getAdminDetail(slug)
      if(response.ack){
        setResponceData(response?.data)
      }
      dispatch(changeLoader(false));
    } catch (err) {
      console.log(err);
      dispatch(changeLoader(false));
    }
  };

  useEffect(()=>{
    handlegetAdminDetail()
  } ,[])

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4 gap-3">
          <div>
            <Typography className="text-xl font-semibold" align={"left"}>
              <LeftOutlined onClick={() => navigate('/manage-sub-admin')} className="mr-2" />
              Sub Admin Account
            </Typography>
          </div>

          <div>
          {contextHolder}
            <Button
              type="primary"
              icon={<LockOutlined />}
              size={14}
              onClick={handleResetPassword}
              className="mx-1.5 cursor-pointer"
              disabled = {responceData?.status === 'pending' ? false : true}
            >
              Resend Password link
            </Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={14}
              onClick={() => navigate(`/edit-admin/${slug}?'eDITdeTails'`)}
              className="mx-1.5 cursor-pointer"
            >
              Edit
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={14}
              onClick={() => handlePoupOpen('delete')}
              className="mx-1.5 cursor-pointer"
            >
              Delete
            </Button>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              size={14}
              className="mx-1.5 cursor-pointer"
              onClick={() => handlePoupOpen('resolve')}
            >
              Update Status
            </Button>
          </div>
        </div>
        <Divider />
        <div className="max-w-5xl	">
          <Row gutter={[40, 16]}>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Name :{" "}
              </div>
              <div className="text-base">{responceData?.first_name + " " + responceData?.last_name}</div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Email Address :{" "}
              </div>
              <div className="text-base">{responceData?.email}</div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Mobile Number :{" "}
              </div>
              <div className="text-base">{responceData?.contact_number}</div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Role :{" "}
              </div>
              <div className="text-base capitalize">{responceData?.role?.role_name}</div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Account created on :{" "}
              </div>
              <div className="text-base">{DateHelper.format(responceData?.created_at, "m/d/Y h:i A")}</div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
              Status :{" "}
              </div>
              <div className="text-base capitalize">{responceData?.status}</div>
            </Col>
          </Row>
        </div>
      </Card>
      {/* delete modal */}
      {(isDeleteModalOpen || resolveModalOpen) && (
        <ConfirmationModal
          ConfirmationHeading={`${
            resolveModalOpen ? "Update Status" : "Delete"
          }`}
          ConfirmationParagraph={
            resolveModalOpen
              ? "Are you sure you want to update status?"
              : "Are you sure you want to delete this request?"
          }
          isOpen={true}
          onOk={resolveModalOpen ? handleResolveOk : handleDeleteOk}
          onCancel={resolveModalOpen ? handleResolveCancel : handleDeleteCancel}
        />
      )}
    </>
  );
};

export default ViewAdmin;
