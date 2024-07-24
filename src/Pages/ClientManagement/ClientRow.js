import { useNavigate } from "react-router-dom";
import DateHelper from "../../Helpers/lib/DateHelper";
import { Switch ,Tooltip  } from "antd";
import {RedoOutlined} from "@ant-design/icons";
import { Resend_Password, UpdateCustomerStatus } from "../../Axios/services/ClientManagement";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { useEffect } from "react";
const ClientRow = ({ Clients, handlegetAllClients }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUpdateStatus = async (id) => {
    dispatch(changeLoader(true));
    try {
      let params = {
        status: Clients.status === "active" ? "inactive" : "active",
      };
      let responce = await UpdateCustomerStatus(id, params);
      if (responce.ack) {
        handlegetAllClients();
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


  const handleResetPassword = async (id) => {
    dispatch(changeLoader(true));
    try {
     
      let responce = await Resend_Password(id);
      if (responce.ack) {
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


  return (
    <>
      <tr
        key={Clients.id}
        className="bg-white border-b cursor-pointer"        
      >
        <th scope="row" onClick={() => navigate(`/view-client-management/${Clients.id}`)} className="px-3 py-4 font-medium text-gray-900">
          {Clients.id}
        </th>
        <td className="px-3 py-4 vertical-top" onClick={() => navigate(`/view-client-management/${Clients.id}`)}>{Clients.full_name}</td>
        <td className="px-3 py-4 vertical-top" onClick={() => navigate(`/view-client-management/${Clients.id}`)}>{Clients.email}</td>
        <td className="px-3 py-4 vertical-top" onClick={() => navigate(`/view-client-management/${Clients.id}`)}>{Clients.contact_number}</td>
        <td className="px-3 py-4 vertical-top capitalize">
          {Clients.friendly}
        </td>
        <td className="px-3 py-4 vertical-top" onClick={() => navigate(`/view-client-management/${Clients.id}`)}>
          {DateHelper.format(Clients.updatedAt, "m/d/Y h:i A")}
        </td>
        <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Stop the event from bubbling up to <tr>
            }}
          >
            <Switch
              defaultChecked={Clients.status === "active"}
              onChange={() => {
                handleUpdateStatus(Clients.id);
              }}
            />
          </div>
        </td>
        {/* <td className="px-3 py-4 text-center whitespace-nowrap vertical-top">
          <div
          >
            <Tooltip title="Resend Password" >
                <RedoOutlined  onClick={() => handleResetPassword(Clients.id)}/>
            </Tooltip>
          </div>
        </td> */}
      </tr>
    </>
  );
};

export default ClientRow;
