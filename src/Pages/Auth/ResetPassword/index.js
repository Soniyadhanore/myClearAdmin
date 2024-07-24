import React from "react";
import { Typography, Button, Input, Form, Layout, Card, Flex } from "antd";
import { resetPassword } from "../../../Axios/services/AuthService";
import { toast } from "react-toastify";
import { changeLoader } from "../../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import LoadingButton from "../../../Components/LodingButton";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [passwordErrorText, setPasswordErrorText] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] =
    React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleError = () => {
    let error = false;
    if (password === "") {
      setPasswordErrorText("Please enter password");
      error = true;
    }
    if (password.length < 10) {
      setPasswordErrorText("Password must be at least 10 characters");
      error = true;
    }
    if(password.length > 25){
      setPasswordErrorText("Password must be at maximum 25 characters");
      error = true;
    }
    if (
      password &&
      RegExp(
        "^(?=.*[A-Z])[A-Za-z\\d@$!%*?&]{10,}$"
      ).test(password) === false
    ) {
      setPasswordErrorText(
        "Password must be at least 10 characters and contain at least one capital letter."
      );
      error = true;
    }
    
    if (confirmPassword === "") {
      setConfirmPasswordErrorText("Please enter confirm password");
      error = true;
    }
    if (confirmPassword.length < 10) {
      setConfirmPasswordErrorText("Password must be at least 10 characters");
      error = true;
    }
    if(confirmPassword.length > 25){
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
    if (confirmPassword !== password) {
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
        const response = await resetPassword({ password, access: "admin" });
        if (response.ack) {
          // console.log(response);
          navigate("/client-management");
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
      <Layout>
        <Flex
          gap="middle"
          align="center"
          justify="center"
          vertical
          style={{ minHeight: "100vh" }}
        >
          <Card className="relative">
            <img
              width={170}
              src="logo.svg"
              alt=""
              className="mx-auto absolute top-[-70px] left-0 right-0"
            />
            <Title level={3} align={"center"}>
              Reset Password
            </Title>
            <Form
              name="login"
              layout="vertical"
              style={{
                maxWidth: 400,
                minWidth: 400,
                marginTop: 24,
              }}
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              onSubmitCapture={handleChangePass}
            >
              <Form.Item
                label="New Password"
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter your new password.",
                //   },
                // ]}
              >
                <Input.Password
                  size="large"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErrorText("");
                    dispatch(changeLoader(false));
                  }}
                />
                <span className="text-red-500">{passwordErrorText}</span>
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message:
                //       "New Password and confirm password does not match.",
                //   },
                // ]}
              >
                <Input.Password
                  size="large"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordErrorText("");
                    dispatch(changeLoader(false));
                  }}
                />
                <span className="text-red-500">
                  {confirmPasswordErrorText}
                </span>
              </Form.Item>

              <LoadingButton
                className="w-full mt-4"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={
                  password === "" || confirmPassword === "" ? true : false
                }
              >
                Change Password
              </LoadingButton>
            </Form>
          </Card>
        </Flex>
      </Layout>
    </>
  );
};

export default ResetPassword;
