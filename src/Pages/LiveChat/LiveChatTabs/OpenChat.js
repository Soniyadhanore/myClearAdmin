import { Pagination, Tooltip } from "antd";
import SortingArrow from "../../../Common/SortingArrow";
import { MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OpenChat = () => {
  const navigate = useNavigate();
  const [hasMessage, setHasMessage] = useState(false);

  useEffect(() => {
    // API call ya message check logic yaha aayega
    setHasMessage(true);
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Client ID <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Client Name <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Email Address <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
              Assigned Agent <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
              Assigned Date & time <SortingArrow />
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
              <td className="px-3 py-4 vertical-top">
                <p className="text-black font-semibold">Maxwell Smith</p>
                <p>Maxwell@mailinator.com</p>
              </td>
              <td className="px-3 py-4 vertical-top">01/01/2024 10:00 am</td>
              <td className="px-3 py-4 text-center vertical-top">
              </td>
            </tr>
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
              <td className="px-3 py-4 vertical-top">
                <p className="text-black font-semibold">Maxwell Smith</p>
                <p>Maxwell@mailinator.com</p>
              </td>
              <td className="px-3 py-4 vertical-top">01/01/2024 10:00 am</td>
              <td className="px-3 py-4 text-center vertical-top">
                <Tooltip title="Chat">
                <MessageOutlined  onClick={() => navigate(`/pink`)}/>
                </Tooltip>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-right mt-4">
        <div className="flex justify-end mt-4">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default OpenChat;
