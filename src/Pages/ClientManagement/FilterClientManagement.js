import React from "react";
import { Button, Divider, Drawer } from "antd";

const FilterClientManagement = ({
  isOpen,
  onClose,
  setFriendly,
  setStatus,
  status,
  friendly,
  resetFilter,
  handlegetAllClients
}) => {
  const toggleStatus = (value) => {
    setStatus(status === value ? "" : value);
  };

  const toggleFriendly = (value) => {
    setFriendly(friendly === value ? "" : value);
  };

  return (
    <Drawer
      title="Filters"
      onClose={onClose}
      open={isOpen}
      maskClosable={false}
      footer={
        <>
          <div className="flex justify-end py-1 gap-2">
            <Button
              disabled={status === "" && friendly === ""}
              onClick={() => {
                resetFilter();
              }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              disabled={status === "" && friendly === ""}
              onClick={() => {
                handlegetAllClients();
                onClose();
              }}
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
                  status === "active"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleStatus("active")}
              >
                Active
              </button>
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  status === "inactive"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleStatus("inactive")}
              >
                Inactive
              </button>
            </div>
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col my-4 w-full mx-auto">
            <p className="font-semibold text-sm">Friendly</p>
            <div className="flex mt-[8px] flex-wrap gap-2">
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  friendly === "yes"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleFriendly("yes")}
              >
                Yes
              </button>
              <button
                className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                  friendly === "no"
                    ? "bg-[#0dbff1] text-white"
                    : "bg-slate-100 text-black"
                }`}
                onClick={() => toggleFriendly("no")}
              >
                No
              </button>
            </div>
          </div>
          <Divider className="m-0" />
        </div>
      </div>
    </Drawer>
  );
};

export default FilterClientManagement;
