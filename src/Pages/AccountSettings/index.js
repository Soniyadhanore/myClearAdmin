import React, { useState } from "react";
import { Button, Card, Form, Typography, Upload, Col, Row, Image } from "antd";
import { UploadOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../Modal/ChangePassword";
import EditProfile from "../../Modal/EditProfile";
import { getProfile } from "../../Axios/services/AuthService";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { FileUpload } from "../../Axios/services/ManageRequest";
import { toast } from "react-toastify";
import { getBase64 } from "../../Helpers/Functions";
import ImageCropper from "../../Modal/Cropper";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const [email, setEmailAddress] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [cropperImage, setCropperImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [uploadedImages, setUploadedImages] = useState("");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const MAX_IMAGES = 10;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const dispatch = useDispatch();
  const handleChange = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };
  const showChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };
  const handleChangePasswordOk = () => {
    setIsChangePasswordModalOpen(false);
  };
  const handleChangePasswordCancel = () => {
    setIsChangePasswordModalOpen(false);
  };

  const showEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };
  const handleEditProfileOk = () => {
    setIsEditProfileModalOpen(false);
  };
  const handleEditProfileCancel = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleImageUpload = async (event, type) => {
    dispatch(changeLoader(true));
    const files = event.target.files;

    if (!files || files.length === 0) {
      dispatch(changeLoader(false));
      throw new Error("No files selected");
    }

    if (uploadedImages.length + files.length > MAX_IMAGES) {
      dispatch(changeLoader(false));
      toast.error(`Cannot upload more than ${MAX_IMAGES} images`, {
        limit: 1,
        toastId: "imageError",
      });
      return;
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        dispatch(changeLoader(false));
        toast.error("File size too large", {
          limit: 1,
          toastId: "imageError",
        });
        return;
      }

      if (
        !["image/jpeg", "image/jpg", "image/png", "application/pdf"].includes(
          file.type
        )
      ) {
        dispatch(changeLoader(false));
        toast.error("File type not supported", {
          limit: 1,
          toastId: "imageError",
        });
        return;
      }
      const base64Image = await getBase64(file);
      setCropperImage(base64Image);
      setCropper(true);
      // setCropType(type);
    }
    dispatch(changeLoader(false));
  };

  const handleGetProfile = async () => {
    dispatch(changeLoader(true));
    try {
      const response = await getProfile();
      if (response.ack) {
        setAdminName(response?.data?.full_name);
        setEmailAddress(response?.data?.email);
        setContactNumber(response?.data?.contact_number);
      }
      dispatch(changeLoader(false));
    } catch (error) {
      dispatch(changeLoader(false));
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <>
      <Card>
        <div className="flex items-center justify-between relative mb-4">
          <Typography className="text-xl font-semibold mb-0" align={"left"}>
            Profile
          </Typography>
          <div className="flex justify-end gap-3">
            <Button type="primary" onClick={showChangePasswordModal}>
              Change Password
            </Button>
            <Button type="primary" onClick={showEditProfileModal}>
              Edit Profile
            </Button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <Form
            name="login"
            layout="vertical"
            style={{
              maxWidth: 600,
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
            <Form.Item>
              <div className="flex">
                <div className="custom-file-upload cursor-pointer">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center "
                  >
                    {uploadedImages ? (
                      <img
                        src={uploadedImages}
                        alt="profile-image"
                        className="!w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
                      />
                    ) : (
                      <>
                        <UploadOutlined className="mx-0 mb-2 text-[24px]" />
                        Click to Upload
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleImageUpload}
                          multiple
                        />
                      </>
                    )}

                    {/* after upload  */}
                    {/* <div>
                  <img
                    alt="profile-image"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    className="!w-[140px] h-[140px] rounded-md flex flex-col items-center justify-center text-gray-600 hover:text-gray-800"
                  />
                  <CloseOutlined
                    className="cursor-pointer absolute right-1 top-1 p-[5px] rounded-full bg-red-600 text-white"
                  />
                </div> */}
                  </label>
                </div>

                <div className="text-base self-center ml-[15px] font-medium">
                  {adminName}
                </div>
              </div>
            </Form.Item>
          </Form>
          <Row>
            <Col className="mb-3" span={6}>
              <div className="text-base	font-medium	text-black	">
                Email Address
              </div>
            </Col>
            <Col className="mb-3" span={18}>
              <div className="text-base">{email}</div>
            </Col>
            <Col className="mb-3" span={6}>
              <div className="text-base	font-medium	text-black	">
                Contact Number
              </div>
            </Col>
            <Col className="mb-3" span={18}>
              <div className="text-base">
                {contactNumber ? contactNumber : "-"}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      {isChangePasswordModalOpen && (
        <ChangePassword
          isOpen={true}
          onOk={handleChangePasswordOk}
          onCancel={handleChangePasswordCancel}
        />
      )}
      {isEditProfileModalOpen && (
        <EditProfile
          adminName={adminName}
          contactNumber={contactNumber}
          emailAddress={email}
          handleGetProfile={handleGetProfile}
          isOpen={true}
          onOk={handleEditProfileOk}
          onCancel={handleEditProfileCancel}
        />
      )}

      {cropper ? (
        <ImageCropper
          cropperImage={cropperImage}
          closepopup={() => {
            setCropper(false);
            if (document.getElementById("file-upload")) {
              document.getElementById("file-upload").value = "";
            }
          }}
          setCropImage={async (croppedImage) => {
            const fileUpload = await FileUpload({
              base64File: croppedImage.croppedImage,
            });
            if (fileUpload.ack) {
              setUploadedImages(fileUpload?.data);
              toast.success(fileUpload?.message, {
                limit: 1,
                toastId: "imageUploadSuccess",
              });
            } else {
              toast.error(fileUpload?.message, {
                limit: 1,
                toastId: "imageUploadError",
              });
            }
            setCropper(false);
            setCropperImage("");
          }}
        />
      ) : null}
    </>
  );
};

export default AccountSettings;
