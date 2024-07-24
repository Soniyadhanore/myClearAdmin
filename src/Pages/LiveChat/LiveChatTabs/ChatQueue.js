import { Pagination, Tooltip } from "antd";
import SortingArrow from "../../../Common/SortingArrow";
import { useState } from "react";
import Assign from "../../../Modal/Assign";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const ChatQueue = () => {
  const navigate = useNavigate();
  const [ pickId, setPickId] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleAssignOk = () => {
    setIsAssignModalOpen(false);
  };

  const handleDeleteOk = () => {
    navigate(`/pink/${pickId}`)
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  
  const handleAssignCancel = () => {
    setIsAssignModalOpen(false);
  };
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Client ID  <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Client Name <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Email Address  <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Request Date & time  <SortingArrow />
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-center whitespace-nowrap"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap vertical-top"
              >
                11
              </th>
              <td className="px-3 py-4 vertical-top">Client Name</td>
              <td className="px-3 py-4 vertical-top">
                jesse5667@mailinator.com
              </td>
              <td className="px-3 py-4 vertical-top">01/01/2024 10:00 am</td>
              <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
                <span
                  className="underline cursor-pointer mx-1 font-semibold"
                  onClick={() => navigate(`/pink`)}
                >
                  Pick
                </span>
                <span
                  className="underline cursor-pointer mx-1 font-semibold"
                  onClick={() => setIsAssignModalOpen(true)}
                >
                  Assign
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <div className="flex justify-end mt-4">
          <Pagination 
           />
        </div>
      </div>
      <Assign
        isOpen={isAssignModalOpen}
        onOk={handleAssignOk}
        onCancel={handleAssignCancel}
      />

        {/* <ConfirmationModal
        ConfirmationHeading="Pick"
        ConfirmationParagraph="Are you sure you want to pick?"
        isOpen={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      /> */}
    </>
  );
};

export default ChatQueue;
