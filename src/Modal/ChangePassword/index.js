import React from "react";
import { Form, Input, Modal } from "antd";
import { changeLoader } from "../../Redux/reducers/loader";
import { changePassword, logout } from "../../Axios/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const ChangePassword = ({ isOpen, onOk, onCancel }) => {

  const [oldPassword, setOldPassword] = React.useState("");
  const [oldPasswordErrorText, setOldPasswordErrorText] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordErrorText, setNewPasswordErrorText] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] =
    React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleError = () => {
    let error = false;
    if (oldPassword === "") {
      setOldPasswordErrorText("Please enter old password");
      error = true;
    }
    if (newPassword === "") {
      setNewPasswordErrorText("Please enter new password");
      error = true;
    }
    if ( newPassword && newPassword.length < 10) {
      setNewPasswordErrorText("Password must be at least 10 characters");
      error = true;
    }
    if(newPassword && newPassword.length > 25) {
      setNewPasswordErrorText("Password must be at maximum 25 characters");
      error = true;
    }
    if (
      newPassword &&
      RegExp(
        "^(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{10,}$"
      ).test(newPassword) === false
    ) {
      setNewPasswordErrorText(
        "Password must be at least 10 characters and contain at least one capital letter."
      );
      error = true;
    }
    
    if (confirmPassword && confirmPassword.length < 10) {
      setConfirmPasswordErrorText("Password must be at least 10 characters");
      error = true;
    }
    if(confirmPassword && confirmPassword.length > 25) {
      setConfirmPasswordErrorText("Password must be at maximum 25 characters");
      error = true;
    }
    if (
      confirmPassword &&
      RegExp(
        "^(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{10,}$"
      ).test(confirmPassword) === false
    ) {
      setConfirmPasswordErrorText(
        "Password must be at least 10 characters and contain at least one capital letter."
      );
      error = true;
    }
    if (confirmPassword === "") {
      setConfirmPasswordErrorText("Please enter confirm password");
      error = true;
    }
    if (confirmPassword !== newPassword) {
      setConfirmPasswordErrorText("Password doesn't match");
      error = true;
    }
    return error;
  };

  const handleChangePass = async (e) => {
    e.preventDefault(); 
    dispatch(changeLoader(true));
    if (!handleError()) {
      try {
        const response = await changePassword({ old_password : oldPassword, password : newPassword });
        if (response.ack) {
          navigate("/client-management");
          try {
            const response = await logout();
            if (response.ack) {
              localStorage.clear();
              navigate("/");
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
          onCancel();
        } 
        dispatch(changeLoader(false));
        toast[response.ack ? "success" : "error"](response.message, {
          limit: 1,
          toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),   
        });
      } catch (error) {
        dispatch(changeLoader(false));
        console.error(error);
      }
    }else{
      dispatch(changeLoader(false));
    }
  };

  return (
    <>
      <Modal
        title="Change Password"
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={handleChangePass}
        okText="Submit"
      >
        <Form
          name="change password"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: 24 }}
          autoComplete="off"
        >
          <Form.Item
            label="Old Password"
            name="Old Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password size="large" onChange={(e) => {
                  setOldPassword(e.target.value);
                  setOldPasswordErrorText("");
            }} />
            <span className="text-red-500">{oldPasswordErrorText}</span>
          </Form.Item>
          <Form.Item
            label="New Password"
            name="New Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password size="large" onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPasswordErrorText("");
              }} />
              <span className="text-red-500">{newPasswordErrorText}</span>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="Confirm Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password size="large" onChange={(e)=>{
              setConfirmPassword(e.target.value);
              setConfirmPasswordErrorText("");
            }} />
            <span className="text-red-500">{confirmPasswordErrorText}</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ChangePassword;
