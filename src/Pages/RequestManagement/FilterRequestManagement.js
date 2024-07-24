import React, { useEffect, useState } from "react";
import { Button, DatePicker, Divider, Drawer, Input, Select } from "antd";
import { getAgents } from "../../Axios/services/ManageRequest";
import { Option } from "antd/es/mentions";
import DateHelper from "../../Helpers/lib/DateHelper";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
const FilterRequestManagement = ({
  isOpen,
  onClose,
  setStatus,
  status,
  resetFilter,
  handlegetRequest,
  setRaised_by,
  raised_by,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  selectedItems,
  setSelectedItems,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agents, setAgents] = useState([]);
  const dispatch = useDispatch();
  const [searchAgent, setSearchAgent] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const getAgentsData = async () => {
    dispatch(changeLoader(true));
    try {
      let params = {};
      if (searchAgent) {
        params["search"] = searchAgent;
      }
      const response = await getAgents(params);
      if (response?.ack) {
        setAgents(response?.data);
      }
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  const toggleStatus = (value) => {
    setStatus(status === value ? "" : value);
  };

  const toggleRaised_by = (value) => {
    setRaised_by(raised_by === value ? "" : value);
  };

  const disabledEndDate = (current) => {
    if (!startDate) {
      return false;
    }
    return current && current.isBefore(startDate, 'day');
  };
  useEffect(() => {
    const getSearchData = setTimeout(() => {
      getAgentsData();
    }, 700);
    return () => clearTimeout(getSearchData);
  }, [searchAgent]);

  return (
    <Drawer
      title="Filters"
      onClose={onClose}
      maskClosable={false}
      open={isOpen}
      footer={
        <>
          <div className="flex justify-end py-1 gap-2">
            <Button
              onClick={() => {
                resetFilter();
                setDateRange([]);
              }}
              disabled={
                status === "" &&
                raised_by === "" &&
                startDate === null &&
                endDate === null &&
                selectedItems?.length === 0
              }
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => {
                onClose();
              }}
              disabled={
                status === "" &&
                raised_by === "" &&
                startDate === null &&
                endDate === null &&
                selectedItems?.length === 0
              }
            >
              Apply Filters
            </Button>
          </div>
        </>
      }
    >
      <div role="presentation" className="w-full overflow-auto">
        <div className="h-[calc(100%-54px)] overflow-auto">
          <div className="flex flex-col my-4 w-full mx-auto">
            <p className="font-semibold text-sm">Status</p>
            <div className="flex mt-[8px] flex-wrap gap-2">
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  status === "open"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleStatus("open")}
              >
                Open
              </button>
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  status === "resolved"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleStatus("resolved")}
              >
                Resolved
              </button>
              {/* <button className="cursor-pointer w-[90px] p-2 bg-slate-100 text-black text-xs rounded-lg text-center">
                Pending
              </button> */}
            </div>
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col my-4 w-full mx-auto">
            <p className="font-semibold text-sm">Request Date</p>
            <div className="flex mt-[8px] flex-wrap gap-2">
              <RangePicker
                disabledDate={disabledEndDate}
                onCalendarChange={(e) => {
                  const startDate = e[0]?.$d;
                  const endDate = e[1]?.$d;

                  // if (startDate && endDate && endDate < startDate) {
                  //   toast.error("End date should be greater than start date");
                  //   return;
                  // }

                  setStartDate(DateHelper.format(startDate, "m/d/Y"));
                  setEndDate(DateHelper.format(endDate, "m/d/Y"));
                  setDateRange(e);
                }}
                value={dateRange}
              />
            </div>
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col my-4 w-full mx-auto">
            <p className="font-semibold text-sm">Raised by</p>
            <div className="flex mt-[8px] flex-wrap gap-2">
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  raised_by === "admin"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleRaised_by("admin")}
              >
                Admin
              </button>
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  raised_by === "user"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleRaised_by("user")}
              >
                Client
              </button>
            </div>
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col my-4 w-full mx-auto">
            <p className="font-semibold text-sm">Agent</p>
            <Select
              className="mt-[8px]"
              size="large"
              mode="multiple"
              open={dropdownOpen}
              onDropdownVisibleChange={setDropdownOpen}
              onChange={setSelectedItems}
              value={selectedItems}
              dropdownRender={(menu) => (
                <div>
                  <Input
                    style={{ marginBottom: "8px" }}
                    type="search"
                    placeholder="Search for a Client"
                    value={searchAgent}
                    onChange={(e) => {
                      setSearchAgent(e.target.value);
                    }}
                    autoFocus
                  />
                  {menu}
                </div>
              )}
              onSelect={() => setDropdownOpen(false)}
              filterOption={false} // We are filtering manually
            >
              {agents?.length > 0 &&
                agents.map((client) => (
                  <Option key={client.id} value={client.id}>
                    {client.agent_name}
                  </Option>
                ))}
            </Select>
          </div>
          <Divider className="m-0" />
        </div>
      </div>
    </Drawer>
  );
};

export default FilterRequestManagement;
