import React, { useState } from "react";
import { Typography, Button, Input, Form, Layout, Card, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Axios/services/AuthService";
import { validateEmail } from "../../../Axios/custom";
import { toast } from "react-toastify";
import LoadingButton from "../../../Components/LodingButton";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../../Redux/reducers/loader";
import addDeleteGetLocalStorage from "../../../Axios/addDeleteGetLocalStorage";
import { storageKeys } from "../../../Axios/Enum";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");

  const handleError = () => {
    let error = false;
    if (email === "") {
      setEmailErrorText("Please enter email");
      error = true;
    }
    if (password === "") {
      setPasswordErrorText("Please enter password");
      error = true;
    }
    if (email)
      if (!validateEmail(email)) {
        setEmailErrorText("Please enter valid email");
        error = true;
      }
    return error;
  };
  const handleLogin = async (e) => {
    dispatch(changeLoader(true));
    e.preventDefault();

    let data = {
      email: email,
      password: password,
      access: "admin",
    };

    try {
      if (handleError()) {
        dispatch(changeLoader(false));
        return;
      }

      const response = await login(data);
      if (response.ack) {
        // toast.success(response.message, {
        //   limit: 1,
        //   toastId: "loginSuccess",
        // });
         addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN, response.data.token, "add", "single")
         const token = await jwtDecode(response.data.token)
        if(token.reset_password === 0){
          toast.warn("You have logged in with system generated password , please change your password", {
            limit: 1,
            toastId: "loginSuccess",
          });
          navigate("/reset-password");
        }else{
          toast.success(response.message, {
            limit: 1,
            toastId: "loginSuccess",
          });
          navigate("/client-management");
        }
      } else {
        toast.error(response.message, {
          limit: 1,
          toastId: "loginError",
        });
      }
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.error("Login error:", error);
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
              Login to your account
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
              onSubmitCapture={handleLogin}
            >
              <Form.Item
                label="Email Address"
                name="email"
                // rules={
                //   [
                //     { required: true, message: 'Please enter email' },
                //     { type: 'email', message: 'Please enter valid email' }
                //   ]
                // }
              >
                <Input
                  size="large"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErrorText("");
                  }}
                />
                <span className="text-red-500">{emailErrorText}</span>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                // rules={
                //   [
                //     { required: true, message: 'Please enter email' },
                //     { type: 'email', message: 'Please enter valid email' }
                //   ]
                // }
              >
                <Input.Password
                  size="large"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErrorText("");
                  }}
                />
                <span className="text-red-500">{passwordErrorText}</span>
              </Form.Item>
              <div className="text-right">
                <Link to="/forgot-password">
                  <Button className="p-0 font-semibold" type="link">
                    Forgot Password
                  </Button>
                </Link>
              </div>
              <LoadingButton
                className="w-full mt-4"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={email === "" || password === "" ? true : false}
              >
                Login
              </LoadingButton>
            </Form>
          </Card>
        </Flex>
      </Layout>
    </>
  );
};

export default Login;
