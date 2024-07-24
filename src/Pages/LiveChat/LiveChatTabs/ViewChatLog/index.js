import { Card, Divider, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ViewChatLog = () => {
  const navigate = useNavigate();

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
              Chat
            </Typography>
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-semibold underline text-[#0dbff1]">
                Closed Date & Time
              </span>
            </div>
          </div>
          <Divider />
          <div className="mb-0">
            <div className="flex flex-col gap-1">
              <div className="w-full ">
                <div id="messages" className="p-4">
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
                        <p className="text-sm mb-2">message text from client</p>
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
                        <p className="text-sm mb-2">message text from client</p>
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
                          you today?Hello! How can I help you today?Hello! How
                          can I help you today?Hello! How can I help you
                          today?Hello! How can I help you today?
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
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default ViewChatLog;
