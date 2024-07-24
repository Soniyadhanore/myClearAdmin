import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Form, Input, Typography, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams , useLocation  } from "react-router-dom";
import { getAdminDetail, getRoleOptions, UpdateAdmin } from "../../Axios/services/ManageAdmins";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../Axios/custom";
import { changeLoader } from "../../Redux/reducers/loader";
import { toast } from "react-toastify";

const selectStatusOption = [
  { value: "1", label: "Active" },
  { value: "2", label: "Inactive" },
  { value: "3", label: "Pending" },
];

const EditAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [form] = Form.useForm();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: [],
    status: 1,
    role_id : null
  });

  const [errors,setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: [],
    role_id : null,
    status: "",
  });

  const handleFormChange = (changedValues) => {
    // console.log('changedValues.............',Object.keys(changedValues)[0]);
    let key = Object.keys(changedValues)[0];
    setErrors({
      ...errors,
      [key]: "",
    })
    setFormValues((prevValues) => ({
      ...prevValues,
      ...changedValues,
    }));
  };

  const handleError = () => {
    let obj = {};
    let error = false;
    if (formValues.firstName && RegExp(/^[a-zA-Z\s]*$/).test(formValues.firstName) === false) {
      obj.firstName = "Please enter valid first name";
      error = true;
    }
    if ((formValues.firstName && formValues.firstName.length > 50) || formValues.firstName.length < 3) {
      obj.firstName = "Please enter valid first name";
      error = true;
    }
    if (formValues.lastName && RegExp(/^[a-zA-Z\s]*$/).test(formValues.lastName) === false) {
      obj.lastName = "Please enter valid last name";
      error = true;
    }
    if ((formValues.lastName && formValues.lastName.length > 50) || formValues.lastName.length < 3) {
      obj.lastName = "Please enter valid last name";
      error = true;
    }
    if ((formValues.email && formValues.email.length > 100) || formValues.email.length < 3) {
      obj.email = "Please enter valid email";
      error = true;
    }
    if (formValues.email && validateEmail(formValues.email) === false) {
      obj.email = "Please enter valid email";
      error = true;
    }
    if ((formValues.mobile && formValues.mobile.length > 10) || formValues.mobile.length < 10) {
      obj.mobile = "Please enter valid mobile number";
      error = true;
    }
    if (formValues.mobile && RegExp(/^[0-9]*$/).test(formValues.mobile) === false) {
      obj.mobile = "Please enter valid mobile number";
      error = true;
    }
    if(error === true){
      setErrors(obj)
    }
    return error;
  };

  const handleGetRoles = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getRoleOptions();
      if (response.ack) {
        setFormValues((prevValues) => ({
          ...prevValues,
          role: response?.data?.map((item) => ({
            value: item.id,
            label: item.role_name,
          })),
        }))
      }
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };

  const handleUpdateAdmin = async () => {
    dispatch(changeLoader(true));
    if (!handleError()) {
      try {
        const response = await UpdateAdmin({
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          email: formValues.email,
          contact_number: formValues.mobile,
          role_id: formValues.role_id,
          id : slug
        });
        if (response.ack && query === "") {
          navigate("/manage-sub-admin");
        }else{
          navigate(`/view-admin/${slug}`);
        }
        toast[response.ack ? "success" : "error"](response.message, {
          limit: 1,
          toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
        });
        dispatch(changeLoader(false));
      } catch (err) {
        console.log(err);
        dispatch(changeLoader(false));
      }
    } else {
      dispatch(changeLoader(false));
    }
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryStr = searchParams.toString();
    setQuery(queryStr);
    console.log(queryStr);
  }, [location]);

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  useEffect(() => {
    const handlegetAdminDetail = async () => {
      dispatch(changeLoader(true));
      try {
        const response = await getAdminDetail(slug);
        if (response.ack) {
          console.log(response.data);
          setFormValues((prevValues) => ({
            ...prevValues,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            email: response.data.email,
            mobile: response.data.contact_number,
            status: response.data.status,  
            role_id : response.data.role_id
          }));
        }
        dispatch(changeLoader(false));
      } catch (err) {
        console.log(err);
        dispatch(changeLoader(false));
      }
    };

    handlegetAdminDetail();
  }, [slug]);

  return (
    <Card>
      <Typography className="text-xl font-semibold" align={"left"}>
        <LeftOutlined className="mr-2" onClick={() => navigate(-1)} />Sub Admin Account
      </Typography>
      <Divider />
      <div className="min-h-[calc(100vh_-_305px)]">
        <Form
          form={form}
          name="Edit Profile"
          layout="vertical"
          style={{
            maxWidth: 500,
            width: "100%",
          }}
          initialValues={formValues}
          onValuesChange={handleFormChange}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            validateStatus={errors?.firstName ? "error" : ""}
            help={errors?.firstName}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            validateStatus={errors?.lastName ? "error" : ""}
            help={errors?.lastName}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            validateStatus={errors?.email ? "error" : ""}
            help={errors?.email}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobile"
            validateStatus={errors?.mobile ? "error" : ""}
            help={errors?.mobile}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role_id"
            // validateStatus={errors?.role ? "error" : ""}
            // help={errors?.role}
          >
            <Select
              size="large"
              options={formValues?.role}
              value={2}
              // onChange={handleRoleChange}
            />
          </Form.Item>
          {/* <Form.Item
            label="Status"
            name="status"
            validateStatus={errors?.status ? "error" : ""}
            help={errors?.status}
          >
            <Select
              size="large"
              options={selectStatusOption}
            />
          </Form.Item> */}
        </Form>
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button type="primary" disabled = {formValues?.firstName === '' || formValues?.lastName === '' || formValues?.email === '' || formValues?.mobile === ''} 
         onClick={handleUpdateAdmin}>Submit</Button>
      </div>
    </Card>
  );
};

export default EditAdmin;
