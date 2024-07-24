import React, { useEffect } from "react";
import { Button, Card, Divider, Form, Input, Typography, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CreateAdmin, getRoleOptions } from "../../Axios/services/ManageAdmins";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { validateEmail } from "../../Axios/custom";

const AddAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [roles_id, setRolesId] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  //Error
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [mobileError, setMobileError] = React.useState("");
  const [roleError, setRoleError] = React.useState("");

  const handleError = () => {
    let error = false;
    if (firstName && RegExp(/^[a-zA-Z\s]*$/).test(firstName) === false) {
      setFirstNameError("Please enter valid first name");
      error = true;
    }
    if ((firstName && firstName.length > 50) || firstName.length < 3) {
      setFirstNameError("Please enter valid first name");
      error = true;
    }
    if (lastName && RegExp(/^[a-zA-Z\s]*$/).test(lastName) === false) {
      setLastNameError("Please enter valid last name");
      error = true;
    }
    if ((lastName && lastName.length > 50) || lastName.length < 3) {
      setLastNameError("Please enter valid last name");
      error = true;
    }
    if ((email && email.length > 100) || email.length < 3) {
      setEmailError("Please enter valid email");
      error = true;
    }
    if (email && validateEmail(email) === false) {
      setEmailError("Please enter valid email");
      error = true;
    }
    if ((mobile && mobile.length > 10) ||(mobile && mobile.length < 10)) {
      setMobileError("Please enter valid mobile number");
      error = true;
    }
    if (mobile && RegExp(/^[0-9]*$/).test(mobile) === false) {
      setMobileError("Please enter valid mobile number");
      error = true;
    }
    if(!roles_id){
      setRoleError("Please select role");
      error = true;
    }
    return error;
  };

  const handleCreateAdmin = async () => {
   dispatch(changeLoader(true));
    if(!handleError()){
      try {
        const response = await CreateAdmin({
          first_name: firstName,
          last_name: lastName,
          email: email,
          contact_number: mobile,
          role_id: roles_id,
        })
        if(response.ack){
          navigate("/manage-sub-admin");
        }
        dispatch(changeLoader(false));
      } catch (err) {
        console.log(err);
        dispatch(changeLoader(false));
      }
    }else{
      dispatch(changeLoader(false));
    }
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
    <Card>
      <Typography className="text-xl font-semibold" align={"left"}>
        <LeftOutlined className="mr-2" onClick={() => navigate(-1)} />
        Create Sub Admin Account
      </Typography>
      <Divider />
      <div className="min-h-[calc(100vh_-_305px)]">
        <Form
          name="login"
          layout="vertical"
          style={{
            maxWidth: 500,
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          className=""
        >
          <Form.Item label="First Name" name="First Name*">
            <Input
              size="large"
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(false);
              }}
            />
            <span className="text-red-500">{firstNameError}</span>
          </Form.Item>
          <Form.Item label="Last Name" name="Last Name">
            <Input
              size="large"
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(false);
              }}
            />
            <span className="text-red-500">{lastNameError}</span>
          </Form.Item>
          <Form.Item label="Email Address" name="Email Address">
            <Input
              size="large"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            <span className="text-red-500">{emailError}</span>
          </Form.Item>
          <Form.Item label="Mobile Number" name="Mobile Number">
            <Input
              size="large"
              onChange={(e) => {
                setMobile(e.target.value);
                setMobileError(false);
              }}
            />
            <span className="text-red-500">{mobileError}</span>
          </Form.Item>
          <Form.Item label="Role" name="Role">
            <Select
              size="large"
              value={roles_id}
              options={
               roles?.length > 0 &&
                roles?.map((item) => {
                  return { label: item.role_name, value: item.id };
                })
              }
              onChange={(value) => {
                setRolesId(value);
                setRoleError("");
              }}
            />
            <span className="text-red-500">{roleError}</span>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button
          type="primary"
          disabled={
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            roles_id === ""
          }
          onClick={handleCreateAdmin}
        >
          Create Account
        </Button>
      </div>
    </Card>
  );
};

export default AddAdmin;
