import React, { useEffect, useState } from "react";
import {
  Tooltip,
  Button,
  Pagination,
  Card,
  Typography,
  Input,
  Switch,
  Empty,
  Badge,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  FunnelPlotOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SortingArrow from "../../Common/SortingArrow";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import FilterManageAdmin from "./FilterManageAdmin";
import { DeleteAdmin, getAllAdmins, UpdateAdminStatus } from "../../Axios/services/ManageAdmins";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { UpdateCustomerStatus } from "../../Axios/services/ClientManagement";
import { toast } from "react-toastify";

const { Search } = Input;
const ManageSubAdmins = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [status , setStatus] = useState("");
  let [filtercount, setFilterCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [sorting, setSorting] = useState({
    order: "ASC",
    sort_by: "id",
  });
  const [ deleteId , setDeleteId ] = useState(null);
  let [role_Id, setRole_Id] = React.useState([]);
  // console.log(role_Id);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
  let [pageCount, setPageCount] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSort = (order, sortby) => {
    let obj = {
      order: order,
      sort_by: sortby,
    };
    setSorting(obj);
  };

  const handlePageChange = (newPage) => {
    page = newPage;
    setPage(newPage);
    handlegetAllAdmins();
  };

  const handleDeleteOk = async () => {
    dispatch(changeLoader(true));
    try {
      const responce = await DeleteAdmin(deleteId);
      if(responce?.ack){
        handlegetAllAdmins();
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
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };
  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
    // if(status === "active" || status === "inactive"){
    //   handlegetAllAdmins();
    // }
     if(status === "" && role_Id.length === 0){
      handlegetAllAdmins();
      setRole_Id([]);
      setStatus("");
    }
  };

  const handlegetAllAdmins = async () => {
    dispatch(changeLoader(true));
    try {
      let params = {
        page: page,
        limit: limit,
        ...sorting
      };
      if (search) {
        params["search"] = search.trim();
      }
      if(status){
        params["status"] = status;
      }
      if(role_Id?.length > 0){
        console.log(role_Id);
        params["roles"] = role_Id.join(",");
      }
      const response = await getAllAdmins(params);
      if (response?.ack) {
        setDataSource(response?.users);
        setItemTotal(response?.users?.count);
        setPageCount(Math.ceil(response?.users?.count / limit));
        let count = 0;
        if (status) {
          count = count + 1;
        }
        if(role_Id?.length > 0){
          count = count + 1;
        }
        setFilterCount(count);
      }
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    dispatch(changeLoader(true));
    try {
      let params = {  status: status};
      let responce = await UpdateAdminStatus(id, params);
      if (responce.ack) {
        handlegetAllAdmins();
      }
      toast[responce.ack ? "success" : "error"](responce.message, {
        limit: 1,
        toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      handlegetAllAdmins();
    }, 500);
    return () => clearTimeout(getSearchData);
  }, [search , sorting]);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between relative mb-4">
          <Typography className="text-xl font-semibold mb-0" align={"left"}>
            Manage Admins
          </Typography>
          <div className="flex justify-end gap-3">
            <Badge count={filtercount}>
            <Button onClick={showFilterDrawer}>
              <span>
                <FunnelPlotOutlined /> Filter
              </span>
            </Button>
            </Badge>
            <Search
              placeholder="Search by  Name & Email "
              style={{
                width: 250,
              }}
              className="mx-1.5 cursor-pointer"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="primary"
              onClick={() => navigate("/add-admin")}
              icon={<PlusOutlined />}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table
            dataSource={dataSource}
            className="w-full text-sm text-left text-gray-500"
          >
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">
                  Full Name{" "}
                  <SortingArrow  onSort={(order) => {  handleSort(order, "full_name")}}
                  />
                </th>

                <th scope="col" className="px-3 py-3">
                  Email Address{" "}
                  <SortingArrow onSort={(order) => {handleSort(order, "email")}}
                  />
                </th>
                <th scope="col" className="px-3 py-3">
                  Mobile Number <SortingArrow onSort={(order) => handleSort(order, "contact_number")} />
                </th>
                <th scope="col" className="px-3 py-3">
                  Role <SortingArrow onSort={(order) => handleSort(order, "role")} />
                </th>
                <th scope="col" className="px-3 py-3">
                  Status
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
              {dataSource?.rows?.length > 0 ?
                dataSource?.rows?.map((item) => (
                  <tr key={item?.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap vertical-top capitalize"
                    >
                      {item.full_name}
                    </th>
                    <td className="px-3 py-4 vertical-top">{item.email}</td>
                    <td className="px-3 py-4 vertical-top">
                      {item.contact_number ? item.contact_number : "-"}
                    </td>
                    <td className="px-3 py-4 vertical-top capitalize">
                      {item.role?.role_name}
                    </td>

                    <td className="px-3 py-4 vertical-top">
                      <Switch
                        checked={item.status === "active"}
                        onChange={(e) => {
                          if (e === false) {
                            handleUpdateStatus(item?.id, "inactive");
                          } else {
                            handleUpdateStatus(item?.id, "active");
                          }
                        }}
                      />
                    </td>
                    <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
                      <Tooltip title="View">
                        <EyeOutlined
                          onClick={() => navigate(`/view-admin/${item.id}`)}
                          className="mx-1.5 cursor-pointer"
                        />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <EditOutlined
                          onClick={() => navigate(`/edit-admin/${item.id}`)}
                          className="mx-1.5 cursor-pointer"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => {setIsDeleteModalOpen(true); setDeleteId(item?.id)}}
                          className="mx-1.5 cursor-pointer"
                        />
                      </Tooltip>
                    </td>
                  </tr>
                )) : 
                <tr>
                <td colSpan={6} className="text-center">
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
                }
            </tbody>
          </table>
        </div>
        {pageCount > 1 && (
          <div className="text-right mt-4">
            <Pagination
              defaultCurrent={page}
              defaultPageSize={limit}
              total={itemTotal}
              onChange={handlePageChange}
              pageSizeOptions={[10, 25, 50, 100]}
              onShowSizeChange={(current, size) => {
                limit = size;
                setLimit(limit);
                handlegetAllAdmins();
              }}
            />
          </div>
        )}
      </Card>

      {/* delete modal */}
      <ConfirmationModal
        ConfirmationHeading="Delete"
        ConfirmationParagraph="Are you sure you want to delete this Admin?"
        isOpen={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      />
      {filterDrawerOpen && <FilterManageAdmin
        isOpen={true}
        setStatus = {setStatus}
        role_Id = {role_Id}
        setRole_Id = {setRole_Id}
        status = {status}
        setFilterDrawerOpen = {setFilterDrawerOpen}
        onClose={handleFilterDrawerClose}
        handlegetAllAdmins = {handlegetAllAdmins}
        resetFilter = {() => {
          role_Id = []
          setRole_Id(role_Id)
          status = ""
          setStatus(status);
          handlegetAllAdmins();
          setFilterDrawerOpen(false)
        }}
      />}
    </>
  );
};

export default ManageSubAdmins;
