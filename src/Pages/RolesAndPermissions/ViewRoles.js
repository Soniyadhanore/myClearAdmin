import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Divider, Typography, Col, Row, Checkbox } from "antd";
import ConfirmationModal from "../../Modal/ConfirmationModal";
import { LeftOutlined } from "@ant-design/icons";
import {
  getModules,
  getPermissionDetail,
  updatePermission,
} from "../../Axios/services/permission";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { toast } from "react-toastify";
import DateHelper from "../../Helpers/lib/DateHelper";
const ViewRoles = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rolePermissionDetails, setRolePermissionDetails] = useState([]);
  let [modulesdata, setModulesdata] = useState([]);
  let [disabled, setDisabled] = useState(false);
  const [permissionData, setPermisionData] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleRolePermissionDetail = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getPermissionDetail(slug);
      if (response.ack) {
        setRolePermissionDetails(response?.data);
        setPermisionData(response?.data?.permissions);
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

  const handlegetModules = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getModules();
      if (response.ack) {
        setModulesdata(response?.data?.modules);
        setPermissions(response?.data?.permissions);
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

  const handleSave = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await updatePermission(slug, {
        permissions: permissionData,
      });
      if (response.ack) {
        // navigate('/roles-and-permissions')
        handlegetModules();
      }
      dispatch(changeLoader(false));
      toast[response.ack ? "success" : "error"](response.message, {
        limit: 1,
        toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
      });
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  const handleCheckboxChange = (id, permissionId) => {
    const newPermissions = [...permissionData];
    let index = 0;
    let findModuleObject = newPermissions.find((perm, i) => {
      if (perm?.module_id === id) {
        index = i;
        return true;
      }
    });
    if (!findModuleObject) {
      newPermissions.push({ module_id: id, permission: [permissionId] });
    } else {
      let permissions = findModuleObject.permission;
      if (permissions.includes(permissionId)) {
        permissions = permissions.filter((perm) => perm !== permissionId);
      } else {
        permissions.push(permissionId);
      }
      findModuleObject.permission = permissions;
      newPermissions[index] = findModuleObject;
    }
    setPermisionData(newPermissions);
  };
  const isChecked = (id, permissionId) => {
    const findModuleObject = permissionData.find(
      (perm) => perm?.module_id === id
    );
    if (!findModuleObject) return false;
    let permission = findModuleObject?.permission.includes(permissionId);
    return permission;
  };

  useEffect(() => {
    let buttonStatus = true;
    if (permissionData.length > 0) {
      for (let i = 0; i < permissionData.length; i++) {
        let permission = permissionData[i].permission;
        if (permission.length > 0) {
          buttonStatus = false;
          break;
        }
      }
    }
    setDisabled(buttonStatus);
  }, [permissionData]);

  useEffect(() => {
    handlegetModules();
    handleRolePermissionDetail();
  }, []);
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4 gap-3">
          <div>
            <Typography className="text-xl font-semibold" align={"left"}>
              <LeftOutlined onClick={() => navigate(-1)} className="mr-2" />
              Permissions
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="max-w-5xl	">
          <Row gutter={[40, 16]}>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px] capitalize">
                Role Name :{" "}
              </div>
              <div className="text-base">
                {" "}
                {rolePermissionDetails?.role_name}
              </div>
            </Col>
            <Col
              className="gutter-row flex items-start justify-start"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={24}
            >
              <div className="text-base font-medium text-black w-[250px]">
                Last Updated :{" "}
              </div>
              <div className="text-base">
                {" "}
                {DateHelper.format(
                  rolePermissionDetails?.updatedAt,
                  "m/d/Y  h:i A"
                )}
              </div>
            </Col>
          </Row>
        </div>
        <Divider />
        <div className="w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead>
              <tr>
                <th className="font-semibold text-black text-lg">Module</th>
              </tr>
            </thead>
            <tbody>
              {modulesdata?.length > 0 &&
                modulesdata?.map((moduleItem) => {
                  const availablePermissions =
                    moduleItem?.available_permissions.split(",");
                  return (
                    <tr key={moduleItem.id} className="bg-white border-b">
                      <th
                        scope="row"
                        className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap capitalize"
                      >
                        {moduleItem.module_name}
                      </th>
                      {availablePermissions?.map((permKey) => {
                        let data = permissions.find(
                          (data) => data.slug.toLowerCase() == permKey
                        );
                        if (data) {
                          return (
                            <td
                              key={permKey}
                              className="px-3 py-4 text-left w-[300px] whitespace-nowrap"
                            >
                              <label>
                                <input
                                  type="checkbox"
                                  checked={isChecked(moduleItem?.id, data?.id)}
                                  className="mr-1"
                                  onChange={() =>
                                    handleCheckboxChange(
                                      moduleItem?.id,
                                      data?.id
                                    )
                                  }
                                />
                                {data?.permission_name}
                              </label>
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Divider />
        <div className="flex justify-end gap-3">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="primary" onClick={handleSave} disabled={disabled}>
            Save
          </Button>
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

export default ViewRoles;
