import React, { useEffect, useState } from "react";
import { Tooltip, Pagination, Card, Typography, Input, Switch, Empty } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SortingArrow from "../../Common/SortingArrow";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { getPermission } from "../../Axios/services/permission";
import { toast } from "react-toastify";
import DateHelper from "../../Helpers/lib/DateHelper";
import EmptyComponent from "../Empty";

const { Search } = Input;
const RolesAndPermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [rolePermissionData, setRolePermissionData] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
  let [pageCount, setPageCount] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [sorting,setSorting ] = useState({
    order : "ASC",
    sort_by : "id"
  });
  const handleSort = (order , sortby) => {
    let obj = {
      order : order,
      sort_by : sortby
    }
    setSorting(obj);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const getRolePermission = async () => {
    dispatch(changeLoader(true));
    try {
      let params = {page: page, limit: limit ,...sorting}
      if(search){
        params['search'] = search.trim();
      }
      const response = await getPermission(params);
      if (response.ack) {
        setRolePermissionData(response?.data?.rows);
        setItemTotal(response?.data?.count);
        setPageCount(Math.ceil(response?.data?.count / limit));
      }
      toast[response.ack ? "success" : "error"](response.message, {
        limit: 1,
        toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    page = newPage;
    setPage(newPage);
    getRolePermission();
  };
  
  React.useEffect(() => {
    const getSearchData = setTimeout(() => {
      getRolePermission();
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [search , sorting]);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between relative mb-4">
          <Typography className="text-xl font-semibold mb-0" align={"left"}>
            Roles & Permissions
          </Typography>
          <div className="flex justify-end gap-3">
            <Search
              placeholder="Search by role name"
              style={{
                width: 250,
              }}
              className="mx-1.5 cursor-pointer"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">
                  Role Name <SortingArrow  onSort={(order) => {  handleSort(order, "role_name")}} />
                </th>
                <th scope="col" className="px-3 py-3">
                  Last Updated On <SortingArrow  onSort={(order) => {  handleSort(order, "updatedAt")}} />
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
            {rolePermissionData?.length > 0 ?
              rolePermissionData?.map((item) => (
                  <tr className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap vertical-top"
                    >
                      {item?.role_name}
                    </th>
                    <td className="px-3 py-4 vertical-top">
                      {DateHelper.format(item?.updatedAt, "m/d/Y h:i A")}
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
                      <Tooltip title="View">
                        <EyeOutlined
                          onClick={() => navigate(`/view-roles/${item?.id}`)}
                          className="mx-1.5 cursor-pointer"
                        />
                      </Tooltip>
                    </td>
                  </tr>
              )) : 
              <tr>
              <td colSpan={3} className="text-center">
              <EmptyComponent description={'No Data Found'}  />
              </td>
            </tr>
              }
                </tbody>
          </table>
        </div>
        <div className="text-right mt-4">
          {pageCount > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination
                defaultCurrent={page}
                defaultPageSize={limit}
                total={itemTotal}
                onChange={handlePageChange}
                pageSizeOptions={[10, 25, 50, 100]}
                onShowSizeChange={(current, size) => {
                  limit = size;
                  setLimit(limit);
                  getRolePermission();
                }}
              />
            </div>
          )}
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

export default RolesAndPermissions;
