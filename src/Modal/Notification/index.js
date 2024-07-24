import React from "react";
import { Divider, Drawer } from "antd";
const Notification = ({ isOpen, onClose }) => {
  return (
    <Drawer title="Notifications" className="notification-drawer" onClose={onClose} open={isOpen}>
      <div
        role="presentation"
        className="w-full overflow-auto"
      >
        <div className="">
          <div className="h-[calc(100%-54px)] overflow-auto py-3">
            <div className="flex flex-col g items-between">
              <div className="flex gap-3.5 items-start bg-white-A700  py-4 px-[24px] hover:bg-gray-100 cursor-pointer">
                <div className="w-full max-w-[40px] h-[40px]  rounded-full bg-gray-100 relative">
                  <img
                    src="images/user.png"
                    alt="notification"
                    className="justify-center h-6 w-full md:w-[40px] md:h-auto left-0 bottom-0 right-0 top-0 m-auto absolute"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-normal leading-[16.66px]">
                    Lorem ipsum dolor sit amet consectetur. Aliquam nisl sem
                    pretium leo lorem id.
                  </div>
                  <div className="text-xs font-normal leading-[14.28px] text-[#b2b2b2]">
                    05/02/2024
                  </div>
                </div>
              </div>
              <Divider className="m-0"/>
              <div className="flex gap-3.5 items-start bg-white-A700  py-4 px-[24px] hover:bg-gray-100 cursor-pointer">
                <div className="w-full max-w-[40px] h-[40px] rounded-full bg-gray-100 relative">
                   <img
                    src="images/user.png"
                    alt="notification"
                    className="justify-center h-6 w-full md:w-[40px] md:h-auto left-0 bottom-0 right-0 top-0 m-auto absolute"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-normal leading-[16.66px]">
                    Lorem ipsum dolor sit amet consectetur. Aliquam nisl sem
                    pretium leo lorem id.
                  </div>
                  <div className="text-xs font-normal leading-[14.28px] text-[#b2b2b2]">
                    05/02/2024
                  </div>
                </div>
              </div>
              <Divider className="m-0"/>
              <div className="flex gap-3.5 items-start bg-white-A700 py-4 px-[24px] hover:bg-gray-100 cursor-pointer">
                <div className="w-full max-w-[40px] h-[40px] rounded-full bg-gray-100 relative">
                   <img
                    src="images/user.png"
                    alt="notification"
                    className="justify-center h-6 w-full md:w-[40px] md:h-auto left-0 bottom-0 right-0 top-0 m-auto absolute"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-normal leading-[16.66px]">
                    Lorem ipsum dolor sit amet consectetur. Aliquam nisl sem
                    pretium leo lorem id.
                  </div>
                  <div className="text-xs font-normal leading-[14.28px] text-[#b2b2b2]">
                    05/02/2024
                  </div>
                </div>
              </div>
              <Divider className="m-0"/>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Notification;
