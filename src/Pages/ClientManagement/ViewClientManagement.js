import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Divider, Typography, Col, Row, Switch, Upload } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { LeftOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Authorization from "./ViewClientManagementTabs/Authorization";
import Policy from "./ViewClientManagementTabs/Policy";
import { UpdateCustomerStatus, getClient_Detail } from "../../Axios/services/ClientManagement";
import { useDispatch } from "react-redux";
import {changeLoader} from "../../Redux/reducers/loader";
import DateHelper from "../../Helpers/lib/DateHelper"
import { calculateAge } from "../../Helpers/Functions";
import { toast } from "react-toastify";
const { TabPane } = Tabs;
const ViewClientManagement = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {slug} = useParams();
  let [responcess, setResponce] = useState({});
  let [policies, setPolicies] = useState([]);
  const dispatch = useDispatch();
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleGetClientDetail = async() => {
     dispatch(changeLoader(true));
    try {
      const response = await getClient_Detail(slug);
      if(response.ack){
        setResponce(response?.data);
        setPolicies(response?.policies);
      }
      dispatch(changeLoader(false));
    } catch (error){
      dispatch(changeLoader(false));
      console.error(error);
    }
  };

  const handleUpdateStatus = async(id) => {
    dispatch(changeLoader(true));
    try{
      let params = {
       status : responcess?.status === "active" ? "inactive" : "active"
      }
     let responce = await UpdateCustomerStatus(id , params);
     if(responce.ack){
      handleGetClientDetail();
      }
      toast[responce.ack ? "success" : "error"](responce.message, {
        limit: 1,
        toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    }catch(error){
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetClientDetail();
  }, []);

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4 gap-3">
          <div>
            <Typography className="text-xl font-semibold" align={"left"}>
              <LeftOutlined onClick={() => navigate(-1)} className="mr-2" />
              Client Detail
            </Typography> 
          </div>
          <div>
            <Switch checked={responcess?.status == "active" ? true : false} onChange={() => {
              handleUpdateStatus(slug);
            }} />
          </div>
        </div>
        <Divider />
        <div className="w-full">
          <div className="rounded-md p-4 border flex flex-col gap-1">
            <div className="flex mb-8">
              <div className="">
              </div>
              <div > 
                <Row gutter={[40, 16]}>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Client ID :{" "}
                    </div>
                    <div className="text-base">{responcess?.id}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Client name :{" "}
                    </div>
                    <div className="text-base">{responcess?.full_name}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Email address :{" "}
                    </div>
                    <div className="text-base">{responcess?.email}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Mobile number :{" "}
                    </div>
                    <div className="text-base">{responcess?.contact_number}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Age :{" "}
                    </div>
                    {responcess?.date_of_birth && <div className="text-base">{calculateAge(responcess?.date_of_birth)} Years</div>}
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Income :{" "}
                    </div>
                    <div className="text-base">${responcess?.income}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Joined on :{" "}
                    </div>
                    <div className="text-base">{DateHelper.format(responcess?.createdAt, "m/d/Y")}</div>
                  </Col>
                  <Col
                    className="gutter-row flex items-start justify-start"
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <div className="text-base font-medium text-black w-[150px]">
                      Last updated on :{" "}
                    </div>
                    <div className="text-base">{DateHelper.format(responcess?.updatedAt, "m/d/Y")}</div>
                  </Col>
                </Row>
              </div>
            </div>
            <Tabs defaultActiveKey="1">
              {" "}
              <TabPane tab="Policy" key="1">
                <Policy responcess={responcess} policies = {policies} />
              </TabPane>{" "}
              <TabPane tab="Authorization Logs" key="2">
                {" "}
                <Authorization />
              </TabPane>{" "}
            </Tabs>
          </div>
        </div>
      </Card>
      {/* delete modal */}
      <ConfirmationModal
        ConfirmationHeading="Delete"
        ConfirmationParagraph="Are you sure you want to delete this Admin?"
        isOpen={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default ViewClientManagement;
