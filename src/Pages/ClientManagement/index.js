import React, { useState } from "react";
import { Card, Typography, Pagination, Switch, Badge, Button } from "antd";
import { FunnelPlotOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import RescheduleModal from "../../Modal/RescheduleAppointmentModal";
import ReasonModal from "../../Modal/ReasonModal";
import SortingArrow from "../../Common/SortingArrow";
import FilterClientManagement from "./FilterClientManagement";
import {
  UpdateCustomerStatus,
  exportAllData,
  getAllClients,
} from "../../Axios/services/ClientManagement";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import DateHelper from "../../Helpers/lib/DateHelper";
import { toast } from "react-toastify";
import EmptyComponent from "../Empty";
import ClientRow from "./ClientRow";

const ClientManagement = () => {
  const navigate = useNavigate();
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isRejectReasonModalOpen, setIsRejectReasonModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(10);
  const [itemTotal, setItemTotal] = useState(0);
  let [search, setSearch] = useState("");
  let [friendly, setFriendly] = useState("");
  let [status, setStatus] = useState("");
  let [pageCount, setPageCount] = useState(0);
  let [filtercount, setFilterCount] = useState(0);
  const [sorting, setSorting] = useState({
    order: "ASC",
    sort_by: "id",
  });

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const handleRescheduleModalOk = () => {
    setIsRescheduleOpen(false);
  };
  const handleRescheduleModalCancel = () => {
    setIsRescheduleOpen(false);
  };
  const handleRejectReasonModalOk = () => {
    setIsRejectReasonModalOpen(false);
  };
  const handleRejectReasonModalCancel = () => {
    setIsRejectReasonModalOpen(false);
  };
  const handleSort = (order, sortby) => {
    let obj = {
      order: order,
      sort_by: sortby,
    };
    setSorting(obj);
  };
  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };
  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
    handlegetAllClients();
  };

  const handleExportData = async () => {
    dispatch(changeLoader(true));
    try {
      let params = {};
      if (search) {
        params["search"] = search;
      }
      if (friendly) {
        params["friendly"] = friendly;
      }
      if (status) {
        params["status"] = status;
      }
      let responce = await exportAllData(params);
      if (responce.ack) {
        window.open(responce.data, "_blank");
      }
      dispatch(changeLoader(false));
    } catch (error) {
      console.log(error);
      dispatch(changeLoader(false));
    }
  };

  const handlePageChange = (newPage) => {
    page = newPage;
    setPage(newPage);
    handlegetAllClients();
  };

  const handlegetAllClients = async () => {
    dispatch(changeLoader(true));
    try {
      let params = { page: page, limit: limit, ...sorting };
      if (search) {
        params["search"] = search.trim();
      }
      if (friendly) {
        params["friendly"] = friendly;
      }
      if (status) {
        params["status"] = status;
      }
      const responce = await getAllClients(params);
      if (responce.ack) {
        setClients(responce.data);
        setItemTotal(responce?.data?.count);
        setPageCount(Math.ceil(responce?.data?.count / limit));
        let count = 0;
        if (status) {
          count = count + 1;
        }
        if (friendly) {
          count = count + 1;
        }
        setFilterCount(count);
      }
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getSearchData = setTimeout(() => {
      handlegetAllClients();
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [search, sorting]);

  return (
    <>
      <Card>
        <div className="flex justify-between mb-4 gap-5">
          <div className="">
            <Typography className="text-xl font-semibold" align={"left"}>
              Client Management
            </Typography>
          </div>
          <div className="flex justify-end gap-3">
            <div className="text-[16px] font-semibold flex items-center">
              Total Clients - {clients?.count}
            </div>
            <Badge count={filtercount}>
              <Button onClick={showFilterDrawer}>
                <span>
                  <FunnelPlotOutlined /> Filter{" "}
                </span>
              </Button>
            </Badge>
            <Search
              placeholder="Search by name, email, mobile number"
              onSearch={onSearch}
              style={{
                width: 300,
              }}
              className="mx-1.5 cursor-pointer"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button
              type="primary"
              onClick={handleExportData}
              disabled={clients?.count === 0}
            >
              Export data
            </Button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full  text-left	text-sm text-gray-500">
            <thead className=" text-gray-700 capitalize text-xs	 bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 whitespace-nowrap"
                  title="Appointment Id"
                >
                  Client ID{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "id");
                    }}
                  />
                </th>
                <th scope="col" className="px-3 py-3" title="Name">
                  Name{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "full_name");
                    }}
                  />
                </th>
                <th scope="col" className="px-3 py-3" title="Name">
                  Email Address{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "email");
                    }}
                  />
                </th>
                <th scope="col" className="px-3 py-3" title="Name">
                  Mobile number{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "contact_number");
                    }}
                  />
                </th>
                <th scope="col" className="px-3 py-3" title="Name">
                  Friendly{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "friendly");
                    }}
                  />
                </th>
                <th scope="col" className="px-3 py-3" title="Name">
                  Last Updated on{" "}
                  <SortingArrow
                    onSort={(order) => {
                      handleSort(order, "updatedAt");
                    }}
                  />
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-center whitespace-nowrap vertical-top"
                  title="Action"
                >
                  Status
                </th>
                {/* <th
                  scope="col"
                  className="px-3 py-3 text-center whitespace-nowrap vertical-top"
                  title="Action"
                >
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {clients?.rows?.length > 0 ? (
                clients?.rows?.map((Clients, index) => (
                  <ClientRow
                    Clients={Clients}
                    handlegetAllClients={handlegetAllClients}
                    setStatus={setStatus}
                    status={status}
                  />
                ))
              ) : (
                <tr>
                <td colSpan={8} className="text-center">
                  <div className="flex justify-center items-center h-full">
                    <EmptyComponent description={"No Client Found"} />
                  </div>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        {pageCount > 1 && (
          <div className="flex justify-end mt-4">
            <Pagination
              className="cursor-pointer"
              defaultCurrent={page}
              defaultPageSize={limit}
              total={itemTotal}
              onChange={handlePageChange}
              pageSizeOptions={[10, 25, 50, 100]}
              onShowSizeChange={(current, size) => {
                limit = size;
                setLimit(limit);
                handlegetAllClients();
              }}
            />
          </div>
        )}
      </Card>

      <RescheduleModal
        ReasonText="Reschedule an appointment."
        ReasonPlaceholder="Enter your reason here"
        isOpen={isRescheduleOpen}
        onOk={handleRescheduleModalOk}
        onCancel={handleRescheduleModalCancel}
      />

      <ReasonModal
        ReasonText="Cancel Appointment Reason"
        ReasonPlaceholder="Enter your reason here"
        isOpen={isRejectReasonModalOpen}
        onOk={handleRejectReasonModalOk}
        onCancel={handleRejectReasonModalCancel}
      />
      {filterDrawerOpen && (
        <FilterClientManagement
          isOpen={true}
          setFriendly={setFriendly}
          setStatus={setStatus}
          handlegetAllClients={handlegetAllClients}
          resetFilter={() => {
            friendly = "";
            status = "";
            setFriendly(friendly);
            setStatus(status);
            handlegetAllClients();
            setFilterDrawerOpen(false);
          }}
          status={status}
          friendly={friendly}
          onClose={handleFilterDrawerClose}
        />
      )}
    </>
  );
};
export default ClientManagement;
