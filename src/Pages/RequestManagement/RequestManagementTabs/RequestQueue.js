import { Pagination, Select } from "antd";
import SortingArrow from "../../../Common/SortingArrow";
const selectOption = [
  { value: "1", label: "Pick" },
  { value: "2", label: "Assign" },
];
const RequestQueue = () => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-3 whitespace-nowrap">
                Request ID <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Client Name <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Date <SortingArrow />
              </th>
              <th scope="col" className="px-3 py-3">
                Policy <SortingArrow />
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
                #12345
              </th>
              <td className="px-3 py-4 vertical-top">
                <p className="font-semibold text-[#000]">Client Name</p>
                <p>client@gmail.com</p>
              </td>
              <td className="px-3 py-4 vertical-top">16/07/2024</td>
              <td className="px-3 py-4 vertical-top">Policy Text</td>
              <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
                <Select
                  options={selectOption}
                  className="w-[100px] mb-4"
                />
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

export default RequestQueue;
