import {
  Button,
  Card,
  Col,
  Avatar,
  Divider,
  List,
  Row,
  Typography,
  Input,
} from "antd";
import { SendOutlined, LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseChat from "../../../../Modal/CloseChat";
const data = [
  {
    title: "Sara Parker",
    hasNotification: true,
  },
  {
    title: "Sara Parker",
    hasNotification: false,
  },
  {
    title: "Sara Parker",
    hasNotification: true,
  },
  {
    title: "Sara Parker",
    hasNotification: true,
  },
  {
    title: "Sara Parker",
  },
  {
    title: "Sara Parker",
  },
  {
    title: "Sara Parker",
  },

  {
    title: "Sara Parker",
  },
];
const Pink = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [isViewChatLogModalOpen, setIsViewChatLogModalOpen] = useState(false);
  const handleViewChatLogOk = () => {
    setIsViewChatLogModalOpen(false);
  };
  const handleViewChatLogCancel = () => {
    setIsViewChatLogModalOpen(false);
  };

  return (
    <>
      <Card>
        <div className="min-h-[calc(100vh_-_290px)] editor-height">
          <div className="flex items-center justify-between mb-4">
            <Typography className="text-lg font-semibold" align={"left"}>
              <LeftOutlined
                onClick={() => navigate(-1)}
                className="text=lg text-black mr-2 cursor-pointer"
              />
              Messages
            </Typography>
            <div className="flex items-center justify-between gap-3">
              <Button
                type="primary"
                onClick={() => {
                  setIsViewChatLogModalOpen(true);
                }}
              >
                Mark chat as Closed
              </Button>
            </div>
          </div>
          <Row>
            <Col span={6}>
              <div className="Chat-list pt-5">
                <Search
                  placeholder="Search by customer name"
                  onSearch={onSearch}
                  style={{
                    width: 300,
                  }}
                  className="mx-1.5 cursor-pointer"
                />
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item className="has-message">
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                          />
                        }
                        title={
                          <div className="text-sm font-semibold">
                            {item.title}
                          </div>
                        }
                        description="saraparker@gmail.com"
                      />
                      {item.hasNotification && (
                        <div className="notification-dot">
                          <span>2</span>
                        </div>
                      )}
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={18}>
              <div className="mb-0">
                <div className="w-full pt-1">
                  <div id="messages" className="px-4">
                    <div className="Chat-content">
                      <List
                        itemLayout="horizontal"
                        dataSource={[{ title: "Sara Parker" }]}
                        renderItem={(item, index) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                                />
                              }
                              title={
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
                              }
                              description="saraparker@gmail.com"
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                    <div className="h-[calc(100vh_-_365px)] overflow-y-auto">
                      <Divider className="!m-0">
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
                              message text from client
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
                              message text from client
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
                              Hello! How can I help you today? Hello! How can I
                              help you today?Hello! How can I help you
                              today?Hello! How can I help you today?Hello! How
                              can I help you today?Hello! How can I help you
                              today?
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
                            <p className="text-sm mb-2">
                              message text from agent or admin
                            </p>
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
                              I need some assistance.I need some assistance.I
                              need some assistance.I need some assistance.I need
                              some assistance.
                            </p>
                            <span className="absolute right-2 bottom-1 text-[10px]">
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
                              message text from client
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
                              message text from client
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
                              Hello! How can I help you today? Hello! How can I
                              help you today?Hello! How can I help you
                              today?Hello! How can I help you today?Hello! How
                              can I help you today?Hello! How can I help you
                              today?
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
                            <p className="text-sm mb-2">
                              message text from agent or admin
                            </p>
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
                              I need some assistance.I need some assistance.I
                              need some assistance.
                            </p>
                            <span className="absolute right-2 bottom-1 text-[10px]">
                              10:01 AM
                            </span>
                          </div>
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
            </Col>
          </Row>
        </div>
      </Card>
      <CloseChat
        ConfirmationHeading="Alert"
        ConfirmationParagraph="Are you sure you want to close the chat? This is end the current chat & you cannot reopen it."
        isOpen={isViewChatLogModalOpen}
        onOk={handleViewChatLogOk}
        onCancel={handleViewChatLogCancel}
      />
    </>
  );
};
export default Pink;
