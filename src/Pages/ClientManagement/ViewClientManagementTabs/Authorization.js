import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Switch, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import SortingArrow from "../../../Common/SortingArrow";
import SendAuthorization from "../../../Modal/SendAuthorization";

const Authorization = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-end items-center my-5">
        <div className="flex gap-5 mr-[10px]">
          <div className="font-semibold">Friendly?</div>
          <Switch defaultChecked />
        </div>
        <div>
          <Button type="primary" onClick={() => setIsDeleteModalOpen(true)}>Send Authorisation</Button>
        </div>
      </div>
      <table className="w-full  text-left	text-sm text-gray-500">
        <thead className=" text-gray-700 capitalize text-xs	 bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-3 py-3 whitespace-nowrap"
              title="Appointment Id"
            >
              Unfriendly status received date <SortingArrow />
            </th>
            <th scope="col" className="px-3 py-3" title="Name">
              Authorisation Sent on <SortingArrow />
            </th>
            <th scope="col" className="px-3 py-3" title="Name">
              Signed Date & time <SortingArrow />
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-center whitespace-nowrap vertical-top"
              title="Action"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="px-3 py-4 font-medium text-gray-900 ">
              01/02/2024
            </th>
            <td className="px-3 py-4 vertical-top">01/02/2024</td>
            <td className="px-3 py-4 vertical-top">01/02/2024 - 16:40</td>
            <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
              <Tooltip title="View signed form">
                <EyeOutlined
                  onClick={() => navigate("/view-admin")}
                  className="mx-1.5 cursor-pointer"
                />
              </Tooltip>
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="px-3 py-4 font-medium text-gray-900 ">
              01/02/2024
            </th>
            <td className="px-3 py-4 vertical-top">01/02/2024</td>
            <td className="px-3 py-4 vertical-top">01/02/2024 - 16:40</td>
            <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
              <Tooltip title="View signed form">
                <EyeOutlined
                  onClick={() => navigate("/view-admin")}
                  className="mx-1.5 cursor-pointer"
                />
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <SendAuthorization
        isOpen={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default Authorization;
