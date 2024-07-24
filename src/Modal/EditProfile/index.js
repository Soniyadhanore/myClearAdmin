import React from "react";
import { Form, Input, Modal } from "antd";
import { validateEmail } from "../../Axios/custom";
import { profileUpdate } from "../../Axios/services/AuthService";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const EditProfile = ({
  isOpen,
  onCancel,
  adminName,
  emailAddress,
  contactNumber,
  handleGetProfile,
}) => {
  const [name, setName] = React.useState(adminName);
  const [email, setEmailAddress] = React.useState(emailAddress);
  const [contact, setContactNumber] = React.useState(contactNumber);
  const [nameError, setNameError] = React.useState("");
  const [emailErrorText, setEmailErrorText] = React.useState("");
  const [ContactErrorText, setContactErrorText] = React.useState("");
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
    if (name === "") {
      setNameError("Please enter name");
      error = true;
    }
    if (name && RegExp(/^[a-zA-Z ]*$/).test(name) === false) {
      setNameError("Please enter valid name");
      error = true;
    }
    if (name && name.length > 100) {
      setNameError("Maximum 100 characters allowed");
      error = true;
    }
    // if (contact === "") {
    //   setContactErrorText("Please enter contact number");
    //   error = true;
    // }
    if ((contact && contact.length < 10) || (contact && contact.length > 10)) {
      setContactErrorText("Invalid contact number. Maximum 10 digits allowed.");
      error = true;
    }
    if (contact && RegExp(/^[0-9\b]+$/).test(contact) === false) {
      setContactErrorText("Please enter valid contact number");
      error = true;
    }
    return error;
  };

  const handleSave = async () => {

    if (handleError()) return;
    const data = { full_name: name, email, contact_number: contact };
    onCancel();
    dispatch(changeLoader(true));
    try {
      const response = await profileUpdate(data);
      toast[response.ack ? "success" : "error"](response.message, {
        limit: 1,
        toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
      });
      if (response.ack) {
        onCancel();
        handleGetProfile();
      }
      dispatch(changeLoader(false));
    } catch (error) {
      console.error(error);
      dispatch(changeLoader(false));
    }
  };

  return (
    <>
      <Modal
        title="Edit Profile"
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={handleSave}
        okText="Save"
      >
        <Form
          name="Edit Profile"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: 24 }}
          autoComplete="off"
        >
          <Form.Item
           label={
            <>
              Name
             <span style={{ color: "red" }}> *</span>
            </>
          }
            name="Name"
          >
            <Input
              size="large"
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              type="text"
              defaultValue={adminName}
            />
            <span className="text-red-500">{nameError}</span>
          </Form.Item>
          <Form.Item
           label={
            <>
              Email Address
             <span style={{ color: "red" }}> *</span>
            </>
          }
            name="Email Address"
          >
            <Input
              size="large"
              disabled = {true}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                setEmailErrorText("");
              }}
              defaultValue={emailAddress}
            />
            <span className="text-red-500">{emailErrorText}</span>
          </Form.Item>
          <Form.Item
           label="Contact number"
            name="Contact number"
          >
            <Input
              size="large"
              onChange={(e) => {
                setContactNumber(e.target.value.trim());
                setContactErrorText("");
              }}
              type="text"
              defaultValue={contactNumber}
            />
            <span className="text-red-500">{ContactErrorText}</span>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditProfile;
