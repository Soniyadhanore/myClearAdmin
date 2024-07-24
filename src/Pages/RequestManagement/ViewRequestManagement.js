import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Divider, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  DownloadOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axios from "axios";
import FileSaver from "file-saver";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { LeftOutlined } from "@ant-design/icons";
import {
  DeleteRequest,
  GetRequestDetail,
  UpdateRequestStatus,
} from "../../Axios/services/ManageRequest";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import DateHelper from "../../Helpers/lib/DateHelper";
import { getStatusColor } from "../../Helpers/Functions";
import { toast } from "react-toastify";
const ViewRequestManagement = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [responceData, setResponceData] = useState({});
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const dispatch = useDispatch();
  const downloadFile = async (documents) => {
    for (const doc of documents) {
      try {
        const response = await axios.get(doc.document, {
          responseType: "blob",
        });
        const filename = doc.document.split("/").pop();
        FileSaver.saveAs(response.data, filename);
        console.log(`Downloaded: ${filename}`);
      } catch (error) {
        console.error(`Failed to download ${doc.document}:`, error);
      }
    }
  };
  const handleDeleteOk = async () => {
    dispatch(changeLoader(true));
    try {
      const responce = await DeleteRequest({
        request_id: Number(slug),
      });
      if (responce?.ack) {
        navigate("/request-management");
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

  const handleResolveOk = async () => {
    dispatch(changeLoader(true));
    try {
      const responce = await UpdateRequestStatus({
        request_id: Number(slug),
        request_status: "resolved",
      });
      if (responce?.ack) {
        navigate("/request-management");
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

  const handlePoupOpen = (type) => {
    if (type === "delete") {
      setIsDeleteModalOpen(true);
      setResolveModalOpen(false);
    } else if (type === "resolve") {
      setResolveModalOpen(true);
      setIsDeleteModalOpen(false);
    }
  };
  const handleGetRequestDetail = async () => {
    dispatch(changeLoader(true));
    try {
      let responce = await GetRequestDetail(slug);
      if (responce?.ack) {
        setResponceData(responce?.data);
      }
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleResolveCancel = () => {
    setResolveModalOpen(false);
  };

  useEffect(() => {
    handleGetRequestDetail();
  }, []);
  return (
    <>
      <Card>
        <div className="flex justify-between items-center flex-wrap mb-4 gap-3">
          <Typography
            className="text-xl font-semibold whitespace-white"
            align={"left"}
          >
            <LeftOutlined onClick={() => navigate(-1)} className="mr-2" />
            Request Detail
          </Typography>

          <div className="flex justify-end gap-3">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={14}
              onClick={() => navigate(`/raise-request/${responceData?.id}`)}
              className="cursor-pointer"
              disabled={responceData?.request_status === "resolved"}
            >
              Edit
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={14}
              onClick={() => handlePoupOpen("delete")}
              className="cursor-pointer"
              disabled={responceData?.request_status === "resolved"}
            >
              Delete
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              size={14}
              className="cursor-pointer"
              onClick={() => handlePoupOpen("resolve")}
              disabled={responceData?.request_status === "resolved"}
            >
              Mark as Resolved
            </Button>
          </div>
        </div>
        <Divider />
        <div className="w-full">
          <div className="rounded-md p-4 border flex flex-col gap-1">
            <div className="flex items-center justify-start gap-4 mb-0">
              <div className="text-xs w-[300px]">
                {responceData?.request_id}
              </div>
              <div className="text-xs w-[300px] text-center">
                {DateHelper.format(responceData?.created_at, "m/d/Y h:i A")}
              </div>
              <div className="flex flex-col items-end justify-end gap-2 ml-auto">
                <span
                  className={`w-[100px] py-2 px-3 text-xs rounded-lg text-center capitalize ${getStatusColor(
                    responceData?.request_status
                  )}`}
                >
                  {responceData?.request_status}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="font-semibold	text-lg capitalize">
                  {responceData?.request_description}
                </div>
                <div className="font-normal	text-sm mb-3">
                  {responceData?.client?.full_name}{" "}
                  {responceData?.client?.email
                    ? `(${responceData?.client?.email})`
                    : ""}
                </div>
                <div className="font-normal	text-base">
                  {responceData?.policy?.policy_number
                    ? responceData?.policy?.policy_number
                    : "N/A"}{" "}
                  - {responceData?.policy?.policy_name}
                </div>
                <div className="font-normal	text-base">
                  {responceData?.policy?.policy_issuer
                    ? responceData?.policy?.policy_issuer
                    : ""}
                </div>
                <div className="font-normal	text-sm">
                  {responceData?.policy?.insurance?.agent_name}{" "}
                  {responceData?.policy?.insurance?.agent_email
                    ? `(${responceData?.policy?.insurance?.agent_email})`
                    : ""}{" "}
                  {responceData?.policy?.insurance?.agent_npn
                    ? ` 'NPN : (${responceData?.policy?.insurance?.agent_npn})`
                    : ""}
                </div>
              </div>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size={14}
                className="cursor-pointer"
                onClick={() =>
                  downloadFile(
                    responceData &&
                      responceData?.request_documents.filter(
                        (item) => item?.uploadedBy?.access === "admin"
                      )
                  )
                }
                disabled={responceData?.request_documents?.length === 0}
              >
                {responceData?.request_documents?.length === 0
                  ? " There is no attach_file.pdf"
                  : "attach_file.pdf"}
              </Button>
            </div>
          </div>
          {responceData?.request_documents &&
            responceData?.request_documents.filter(
              (item) => item?.uploadedBy?.access === "user"
            ).length > 0 && (
              <div className="rounded-md p-4 border flex flex-col gap-1 my-5">
                <div className="font-semibold	text-lg underline">
                  Shared Document
                </div>
                <div className="flex items-start justify-between  gap-4 mb-0 mt-4">
                  <div className="flex items-start justify-between flex-col  gap-4">
                    {responceData?.request_documents &&
                      responceData?.request_documents
                        .filter((item) => item?.uploadedBy?.access === "user")
                        .map((item) => (
                          <div className="document-item text-xs" key={item?.id}>
                            <a
                              href={item?.document}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={item?.document.split("/").pop()} // This will provide the download option
                            >
                              {item?.document &&
                                item?.document.split("/").pop()}
                            </a>
                          </div>
                        ))}
                  </div>
                  {/* <div className="text-xs">attach_file.pdf</div> */}
                  <div className="flex items-start justify-start flex-col gap-4">
                    <div className="text-xs text-center">
                      Shared date & time :{" "}
                      {DateHelper.format(
                        responceData?.created_at,
                        "m/d/Y h:i A"
                      )}
                    </div>
                    <div className="text-xs text-center">
                      Resolved Date & time :{" "}
                      {responceData?.resolved_at
                        ? DateHelper.format(
                            responceData?.resolved_at,
                            "m/d/Y h:i A"
                          )
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="grid gap-5 grid-cols-2">
          <div className="rounded-md p-4 border flex flex-col gap-1">
            <div className="font-semibold	text-lg text-center underline mb-5">
              Client & Policy Details{" "}
            </div>
            <div className="flex items-end justify-start gap-4">
              <div className="flex flex-col gap-2">
                <div className="font-normal	text-sm">
                  Client Name : {responceData?.client?.full_name}
                </div>
                <div className="font-normal	text-sm">
                  Email Address :{" "}
                  {responceData?.client?.email
                    ? `(${responceData?.client?.email})`
                    : ""}
                </div>
                <div className="font-normal	text-sm">
                  {responceData?.policy?.policy_number} -{" "}
                  {responceData?.policy?.policy_name}
                </div>
                <div className="font-normal	text-sm">
                  Provider Carrier Name :{" "}
                  {responceData?.policy?.policy_issuer
                    ? `${responceData?.policy?.policy_issuer}`
                    : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md p-4 border flex flex-col gap-1">
            <div className="font-semibold	text-lg text-center underline mb-5">
              Messages
            </div>
            <div className="w-full ">
              {/* Messages */}
              <div id="messages" className="p-4 h-64 overflow-y-auto">
                <Divider>
                  <span className="text-[12px]">May 29, 2024</span>
                </Divider>
                <div className="mb-4">
                  <div className="flex justify-start items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <div className="bg-slate-100 w-auto max-w-[80%] p-2 pb-4 rounded-lg relative">
                      <p className="text-sm mb-2">
                        Hello! How can I help you today?
                      </p>
                      <span className="absolute right-2 bottom-1 text-[10px] text-[#a8a8a8]">
                        10:01 AM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-start items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <div className="bg-slate-100 w-auto max-w-[80%] p-2 pb-4 rounded-lg relative">
                      <p className="text-sm mb-2">
                        Hello! How can I help you today? Hello! How can I help
                        you today?Hello! How can I help you today?Hello! How can
                        I help you today?Hello! How can I help you today?Hello!
                        How can I help you today?
                      </p>
                      <span className="absolute right-2 bottom-1 text-[10px] text-[#a8a8a8]">
                        10:01 AM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-end items-center">
                    <div className="bg-[#0dbff1] w-auto max-w-[80%] text-white p-2 pb-4 rounded-lg relative">
                      <p className="text-sm mb-2">I need some assistance.</p>
                      <span className="absolute right-2 bottom-1 text-[10px]">
                        10:01 AM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-end items-center">
                    <div className="bg-[#0dbff1] w-auto max-w-[80%] text-white p-2 pb-4 rounded-lg relative">
                      <p className="text-sm mb-2">
                        I need some assistance.I need some assistance.I need
                        some assistance.I need some assistance.I need some
                        assistance.
                      </p>
                      <span className="absolute right-2 bottom-1 text-[10px]">
                        10:01 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Input */}
              <form className="flex p-4 border-t border-gray-300">
                <input
                  id="messageInput"
                  type="text"
                  placeholder="Type your message here..."
                  className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="ml-2 bg-[#0dbff1] text-white px-[14px] rounded-lg"
                >
                  <SendOutlined />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Card>
      {/* delete modal */}
      {(isDeleteModalOpen || resolveModalOpen) && (
        <ConfirmationModal
          ConfirmationHeading={`${
            resolveModalOpen ? "Resolve Request" : "Delete"
          }`}
          ConfirmationParagraph={
            resolveModalOpen
              ? "Are you sure you want to resolve this request?"
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

export default ViewRequestManagement;
