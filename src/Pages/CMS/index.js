import React, { useEffect, useState } from "react";
import { Switch, Tooltip, Pagination, Card, Typography, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SortingArrow from "../../Common/SortingArrow";
import { UpdateCmsStatus, getCmsData } from "../../Axios/services/Cms";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { toast } from "react-toastify";
import DateHelper from "../../Helpers/lib/DateHelper";
const CMSPage = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [responce, setResponce] = useState([]);
  const dispatch = useDispatch();
  const getCms = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getCmsData();
      if (response.ack) {
        setResponce(response?.data);
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

  const handleUpdateStatus = async(id , item) => {
    dispatch(changeLoader(true));
    try{
        let params = {
         status : item === "active" ? "inactive" : "active"
        }
       let responce = await UpdateCmsStatus(params);
       if(responce.ack){
         getCms();
        }
        toast[responce.ack ? "success" : "error"](responce.message, {
          limit: 1,
          toastId: "forgotPassword" + (responce.ack ? "Success" : "Error"),
        });
        dispatch(changeLoader(false));
    }catch(error){
        dispatch(changeLoader(false));
        console.log(error);
    }
  };

  // useEffect(() => {
  //   getCms();
  // }, []);

  return (
    <>
      <Card>
        <div className="flex justify-between	mb-4 gap-3">
          <Typography className="text-xl mb-0 font-semibold" align={"left"}>
            CMS
          </Typography>
          <div className="flex justify-between gap-3">
            <Search
              placeholder="Search by Name"
              style={{
                width: 250,
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left  text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">
                  Page name <SortingArrow />
                </th>
                <th scope="col" className="px-3 py-3">
                  Updated on
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
            {/* {responce?.length > 0 &&
              responce?.map((item) => (
                <tbody className="text-xs text-gray-700 bg-white border-b">
                  <tr>
                    <th
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item?.title}
                    </th>
                    <td className="px-3 py-4">{DateHelper.format(item?.updatedAt, 'm/d/Y h:i A')}</td>
                    <td className="px-3 py-4 vertical-top">
                      <Switch  defaultValue = {item?.status == "active" ? true : false} onChange={() => {
                           handleUpdateStatus(item?.id , item?.status);
                      }} />
                    </td>{" "}
                    <td className="px-3 py-4 text-center whitespace-nowrap">
                      <Tooltip title="Edit">
                        <EditOutlined
                          onClick={() => navigate(`/cms-editor/${item?.id}`)}
                          className="mx-1.5 cursor-pointer"
                        />
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              ))}   */}
          </table>
        </div>
        <div className="text-right mt-4">
          <Pagination defaultCurrent={1} total={5} />
        </div>
      </Card>
    </>
  );
};

export default CMSPage;
