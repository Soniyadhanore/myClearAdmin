import React, { useEffect } from "react";
import { Button, Divider, Drawer } from "antd";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { getRoleOptions } from "../../Axios/services/ManageAdmins";
const FilterManageAdmin = ({
  isOpen,
  onClose,
  handlegetAllAdmins,
  setStatus,
  status,
  resetFilter,
  setRole_Id,
  role_Id,
  setFilterDrawerOpen,
}) => {
  const dispatch = useDispatch();
  const [roles, setRoles] = React.useState([]);

  const toggleStatus = (value) => {
    setStatus(status === value ? "" : value);
  };

  const toggleRole = (roleId) => {
    setRole_Id(prevSelectedRoles => {
      if (prevSelectedRoles.includes(roleId)) {
        return prevSelectedRoles.filter(id => id !== roleId);
      } else {
        return [...prevSelectedRoles, roleId];
      }
    });
  };

  const handleGetRoles = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getRoleOptions();
      if (response.ack) {
        setRoles(response?.data);
      }
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

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
              onClick={() => {
                resetFilter();
              }}
              disabled={status === "" && role_Id.length === 0}
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (status === "active" || status === "inactive" || role_Id.length > 0) {
                  handlegetAllAdmins();
                  setFilterDrawerOpen(false);
                } else {
                  setFilterDrawerOpen(false);
                }
                // handlegetAllAdmins();
              }}
              disabled={status === "" && role_Id.length === 0}
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
            <p className="font-semibold text-sm">Role</p>
            <div className="flex mt-[8px] flex-wrap gap-2">
              {roles?.length > 0 &&
                roles.map((role) => {
                  const isSelected = role_Id.includes(role?.id);
                  return (
                    <button
                      key={role?.id}
                      className={`cursor-pointer w-[90px] p-2 text-xs rounded-lg text-center ${
                        isSelected
                          ? "bg-[#0dbff1] text-white"
                          : "bg-slate-100 text-black"
                      }`}
                      onClick={() => toggleRole(role?.id)}
                    >
                      {role?.role_name}
                    </button>
                  );
                })}
              {/* <button className="cursor-pointer w-[90px] p-2 bg-slate-100 text-black text-xs rounded-lg text-center">
                Option 1
              </button>
              <button className="cursor-pointer w-[90px] p-2 bg-slate-100 text-black text-xs rounded-lg text-center">
                Option 2
              </button> */}
            </div>
          </div>
          <Divider className="m-0" />
        </div>
      </div>
    </Drawer>
  );
};

export default FilterManageAdmin;
