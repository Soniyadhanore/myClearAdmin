import { useEffect, useState } from "react";
import { Button, Input, Pagination, Badge } from "antd";
import { FunnelPlotOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../Modal/ConfirmationModal";
import FilterRequestManagement from "../FilterRequestManagement";
import { changeLoader } from "../../../Redux/reducers/loader";
import { GetAllRequest } from "../../../Axios/services/ManageRequest";
import { useDispatch } from "react-redux";
import DateHelper from "../../../Helpers/lib/DateHelper";
import { getStatusColor } from "../../../Helpers/Functions";
import EmptyComponent from "../../Empty";
const { Search } = Input;
const PickedRequests = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  let [selectedItems, setSelectedItems] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  let [status, setStatus] = useState("");
  let [startDate, setStartDate] = useState(null);
  let [endDate, setEndDate] = useState(null);
  let [raised_by, setRaised_by] = useState("");
  let [filtercount, setFilterCount] = useState(0);
  let [pageCount, setPageCount] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const handlegetRequest = async () => {
    dispatch(changeLoader(true));
    try {
      let params = { page: page, limit: limit };
      if (search) {
        params["search"] = search.trim();
      }
      if (status) {
        params["status"] = status;
      }
      if (startDate) {
        params["start_date"] = startDate;
      }
      if (endDate) {
        params["end_date"] = endDate;
      }
      if (raised_by) {
        params["raised_by"] = raised_by;
      }
      if (selectedItems.length > 0) {
        params["agents"] = selectedItems.join(",");
      }
      const responce = await GetAllRequest(params);
      if (responce?.ack) {
        setRequestData(responce?.data);
        setItemTotal(responce?.data?.count);
        setPageCount(Math.ceil(responce?.data?.count / limit));
        let count = 0;
        if (status) {
          count = count + 1;
        }
        if (startDate && endDate) {
          count = count + 1;
        }
        if (raised_by) {
          count = count + 1;
        }
        if (selectedItems.length > 0) {
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

  const handlePageChange = (newPage) => {
    page = newPage;
    setPage(newPage);
    handlegetRequest();
  };
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };
  const handleFilterDrawerClose = () => {
    setFilterDrawerOpen(false);
    handlegetRequest();
  };

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      handlegetRequest();
    }, 500);
    return () => clearTimeout(getSearchData);
  }, [search]);

  return (
    <>
        <div className="flex items-center justify-end flex-wrap relative gap-3 mb-4">
            <Badge count={filtercount}>
              <Button onClick={showFilterDrawer}>
                <span>
                  <FunnelPlotOutlined /> Filter
                </span>
              </Button>{" "}
            </Badge>
            <Search
              placeholder="Search by Request ID, client name, description"
              style={{
                width: 350,
              }}
              className="cursor-pointer"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        <div className="relative flex flex-col gap-4">
          {requestData?.rows?.length > 0 ? (
            requestData?.rows?.map((row, index) => (
              <div
                key={row?.id}
                onClick={() => navigate(`/view-request/${row?.id}`)}
                className="rounded-md p-4 border flex flex-col gap-1 cursor-pointer"
              >
                <div className="flex items-center justify-start gap-4 mb-0">
                  <div className="text-xs">{row?.request_id}</div>
                  <div className="text-xs text-center flex-grow justify-center flex">
                    {DateHelper.format(row?.createdAt, "m/d/Y h:i A")}
                  </div>
                  <div className="flex flex-col items-end justify-center gap-2 ml-auto">
                    <span
                      className={`w-[100px] py-2 px-3 text-xs rounded-lg text-center capitalize ${getStatusColor(
                        row?.request_status
                      )}`}
                    >
                      {row?.request_status}
                    </span>
                    <div className="text-xs -mb-6 text-center">
                      {DateHelper.format(row?.updatedAt, "m/d/Y h:i A")}
                    </div>
                  </div>
                </div>
                <div className=" text-sm capitalize max-w-[800px]">
                  {row?.request_description?.slice(0, 200)}
                </div>
                <div className="font-normal	text-sm">
                  {row?.client?.full_name}{" "}
                  {row?.client?.email ? `(${row?.client?.email})` : ""}
                </div>
                <div className="font-normal	text-base">
                  {row?.policy?.policy_number
                    ? row?.policy?.policy_number
                    : "N/A"}{" "}
                  - {row?.policy?.policy_name}
                </div>
                <div className="font-normal	text-sm">
                  {row?.requestAgent?.agent_name}{" "}
                  {row?.requestAgent?.agent_email
                    ? `(${row?.requestAgent?.agent_email})`
                    : ""}
                </div>
              </div>
            ))
          ) : (
            <div className="relative overflow-x-auto">
              <EmptyComponent description={"No Request Found"} />
            </div>
          )}
        </div>
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
                handlegetRequest();
              }}
            />
          </div>
        )}

      {/* delete modal */}
      <ConfirmationModal
        ConfirmationHeading="Delete"
        ConfirmationParagraph="Are you sure you want to delete this Request?"
        isOpen={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      />
      <FilterRequestManagement
        isOpen={filterDrawerOpen}
        onClose={handleFilterDrawerClose}
        setStatus={setStatus}
        setRaised_by={setRaised_by}
        raised_by={raised_by}
        status={status}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
        setEndDate={setEndDate}
        resetFilter={() => {
          status = "";
          raised_by = "";
          setRaised_by(raised_by);
          startDate = null;
          endDate = null;
          selectedItems = [];
          setSelectedItems(selectedItems);
          setStartDate(startDate);
          setEndDate(endDate);
          setStatus(status);
          handlegetRequest();
          setFilterDrawerOpen(false);
        }}
        handlegetRequest={handlegetRequest}
      />
    </>
  );
};

export default PickedRequests;
