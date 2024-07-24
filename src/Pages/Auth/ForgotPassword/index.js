import React from "react";
import {
  Typography,
  Button,
  Input,
  Form,
  Layout,
  Card,
  Flex,
} from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../Axios/services/AuthService";
import { changeLoader } from "../../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../../Axios/custom";
import { toast } from "react-toastify";
const { Title } = Typography;
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [emailErrorText, setEmailErrorText] = React.useState("");
  const dispatch = useDispatch();
  const handleError = () => {
    let error = false;
    if (email === "") {
      setEmailErrorText("Please enter email");
      error = true;
    }
    if (email)
      if (!validateEmail(email)) {
        setEmailErrorText("Please enter valid email");
        error = true;
      }
    return error;
  };
  const handleSendLink = async () => {
    dispatch(changeLoader(true));
    if (!handleError()) {
      try {
        dispatch(changeLoader(true));
        const response = await forgotPassword({ email , access: "admin"});
        if(response.ack){
          navigate("/");
        }
        dispatch(changeLoader(false));
        toast[response.ack ? "success" : "error"](
          response.message,
          { limit: 1, toastId: "forgotPassword" + (response.ack ? "Success" : "Error") }
        );
      } catch (error) {
        console.error(error);
        dispatch(changeLoader(false));
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
            <Title level={3} align={'center'}>Forgot Password</Title>
            <div className="text-[15px] font-normal">Enter registered email address to receive reset password link</div> 
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
              // onSubmitCapture={handleSendLink}
            >
              <Form.Item
                label="Email Address"
                name="Email"
                // rules={[
                //   {
                //     required: true,
                //     message: "Enter the registered email address to receive the reset password link.",
                //   },
                // ]}
              >
                <Input size="large" onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailErrorText("")
                  }} />
                  <span className="text-red-500">{emailErrorText}</span>
              </Form.Item>
             
              <div className="flex gap-4">
              <Button
                className="w-full mt-4"
                size="large"
                type="primary outline-btn"
                htmlType="submit"
                onClick={() => navigate("/")}
              >
                Back
              </Button>
              <Button
                className="w-full mt-4"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={handleSendLink}
              >
                Send Link
              </Button>
              </div>
            </Form>
          </Card>
        </Flex>
      </Layout>
    </>
  );
};

export default ForgotPassword;
