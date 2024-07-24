import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Typography,
  Select,
  Upload,
} from "antd";
import {
  LeftOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { CreateRaiseRequest, FileUpload, GetAllPolicy, GetClients, GetRequestDetail, UpdateRaiseRequest } from "../../Axios/services/ManageRequest";
import { changeLoader } from "../../Redux/reducers/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ImageCropper from "../../Modal/Cropper";
import { getBase64 } from "../../Helpers/Functions";
const { Option } = Select;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 10;

const RaiseRequest = () => {
  const navigate = useNavigate();
  const {slug} = useParams()
  const [clients, setClients] = React.useState([]);
  const [policys, setPolicys] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [searchValue, setSearchValue] = useState("");
  const [ clientId , setClientId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState(null);
  const [ policyId , setPolicyId] = useState("");
  const [cropper, setCropper] = useState(null);
  const [cropType, setCropType] = useState(null);
  const [clientErrorText, setClientErrorText] = useState("");
  const [agent_id , setAgentId] = useState(null);
  const [policyErrorText, setPolicyErrorText] = useState("");
  const [descriptionErrorText, setDescriptionErrorText] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ requestId , setRequestId] = useState(null);

  const dispatch = useDispatch();
  const handleSearch = (e) => {
    setSearchValue(e.target.value.trimStart());
  };


  const handleError = () => {
    let error = false;
    // if (searchValue === "") {
    //   setClientErrorText("Please enter client name");
    //   error = true;
    // }
    if (searchValue && RegExp(/^[a-zA-Z ]*$/).test(searchValue) === false) {
      setClientErrorText("Please enter valid client name");
      error = true;
    }
    if (searchValue && searchValue.length > 100) {
      setClientErrorText("Name must be at maximum 100 characters");
      error = true;
    }
    if(policyId===null){
      setPolicyErrorText("Please select policy");
      error = true;
    }
    if (!policys) {
      setPolicyErrorText("Please select policy");
      error = true;
    }
    if (!description) {
      setDescriptionErrorText("Please enter description");
      error = true;
    }
    if(description && description.length > 1000){
      setDescriptionErrorText("Description must be at maximum 1000 characters.");
      error = true;
    }
    return error;
  };

  const handleRaiseRequest = async (type) => {
    dispatch(changeLoader(true));
    if (handleError()) {
      dispatch(changeLoader(false));
      return;
    }
    try {
      let response;
      if (type === 'edit') {
        response = await UpdateRaiseRequest({
          request_id: Number(slug),
          request_description: description,
          documents: uploadedImages,
        });
      } else {
        response = await CreateRaiseRequest({
          request_client: clientId,
          request_policy: policyId,
          request_agent: agent_id,
          request_description: description,
          documents: uploadedImages,
        });
      }
      if (response.ack) {  
        navigate('/request-management');
      }
      toast[response.ack ? "success" : "error"](response.message, {
        limit: 1,
        toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };
  

  const filteredClients = clients.filter((client) =>
    client.full_name.toLowerCase().includes(searchValue.toLowerCase()) || client.email.toLowerCase().includes(searchValue.toLowerCase())
  );
  const getAllClients = async () => {
    dispatch(changeLoader(true));
    try {
      let parms = {};
      if (searchValue) {
        parms["search"] = searchValue;
      }
      const response = await GetClients(parms);
      if (response.ack) {
        setClients(response.data);
      }
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };

 const handleImageUpload = async (event, type) => {
  dispatch(changeLoader(true));
  const files = event.target.files;
  console.log("files",files);
  if (!files || files.length === 0) {
    dispatch(changeLoader(false));
    throw new Error("No files selected");
  }

  if (type !== 'edit' && uploadedImages.length + files.length > MAX_IMAGES) {
    dispatch(changeLoader(false));
    toast.error(`Cannot upload more than ${MAX_IMAGES} images`, {
      limit: 1,
      toastId: "imageError",
    });
    return;
  }
const arrayOfImages=[]
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
    arrayOfImages.push(base64Image)
    // setCropperImage(base64Image);
    // api call for file upload
    // const fileUpload = await FileUpload({ base64File: base64Image });
    // console.log(fileUpload);

    // if (fileUpload.ack) {
    //   setUploadedImages(type === 'edit' ? [fileUpload.data] : [...uploadedImages, fileUpload.data]);
    //   toast.success(fileUpload.message, {
    //     limit: 1,
    //     toastId: "imageUploadSuccess",
    //   });
    // } else {
    //   toast.error(fileUpload.message, {
    //     limit: 1,
    //     toastId: "imageUploadError",
    //   });
    // }
  }
  const fileUpload = await FileUpload({ base64File: arrayOfImages });
      if (fileUpload.ack) {
      setUploadedImages(type === 'edit' ? [fileUpload.data] : [...uploadedImages, fileUpload.data]);
      toast.success(fileUpload.message, {
        limit: 1,
        toastId: "imageUploadSuccess",
      });
    } else {
      toast.error(fileUpload.message, {
        limit: 1,
        toastId: "imageUploadError",
      });
    }
  dispatch(changeLoader(false));
};

  const handleImageRemove = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getAllPolicy = async (clientId) => {
    dispatch(changeLoader(true));
    try {
      const response = await GetAllPolicy(clientId);
      if (response.ack) {
        setPolicys(response?.data);
        setAgentId(response?.data[0]?.insurance?.id)
      }
      dispatch(changeLoader(false));
    } catch (err) {
      dispatch(changeLoader(false));
      console.log(err);
    }
  };

  const handleGetRequestDetail = async() => {
    dispatch(changeLoader(true));
    try{
        let responce = await GetRequestDetail(slug);
        if(responce?.ack){
          setRequestId(responce?.data?.request_id)
          setClientId(responce?.data?.client?.id)
          setPolicyId(responce?.data?.policy?.id)
          setAgentId(responce?.data?.request_agent)
          setDescription(responce?.data?.request_description)
          let images = responce?.data?.request_documents?.map((image)=>image?.document)
          setUploadedImages(images)
        }
        dispatch(changeLoader(false));
    }catch(error){
      dispatch(changeLoader(false));
      console.log(error)
    }
  };

  useEffect(() => {
    if(slug){
      handleGetRequestDetail()
    }
  }, [])

  useEffect(()=>{
      if(clientId && slug){
        getAllPolicy(clientId);
      }
  },[clientId])

  useEffect(() => {
    const getSearchData = setTimeout(() => {
      getAllClients();
    }, 500);

    return () => clearTimeout(getSearchData);
  }, [ searchValue ]);

  return (
    <Card>
      <Typography className="text-xl font-semibold" align={"left"}>
        <LeftOutlined className="mr-2" onClick={() => navigate(-1)} />
        {slug ? "Update Raised Ticket" : "Raise Request"}
      </Typography>
      <Divider />
      <div className="min-h-[calc(100vh_-_305px)]">
        <Form
          name="raise request"
          layout="vertical"
          style={{
            maxWidth: 500,
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          className=""
        >
          <Form.Item label="Client" name="client">
            <Select
              size="large"
              open={dropdownOpen}
              onDropdownVisibleChange={setDropdownOpen}
              onChange={(value) => {
                getAllPolicy(value);
                setClientId(value);
                setPolicyId(null);
                setAgentId(null);
                setPolicyErrorText("");
                setClientErrorText("");
              }}
              disabled={slug ? true : false}
              value={clientId}
              dropdownRender={(menu) => (
                <div>
                  <Input
                    style={{ marginBottom: "8px" }}
                    type="search"
                    placeholder="Search for a Client"
                    value={searchValue}
                    onChange={handleSearch}
                    autoFocus
                  />
                  {menu}
                </div>
              )}
              onSelect={() => setDropdownOpen(false)}
              filterOption={false} // We are filtering manually
            >
              {filteredClients?.length > 0 &&
                filteredClients.map((client) => (
                  <Option key={client.id} value={client.id}>
                   {client.full_name} ({client.email})
                  </Option>
                ))}
            </Select>
            <span className="text-red-500">{clientErrorText}</span>
            {/* <Select size="large" 
            onChange={(value) => getAllPolicy(value)}
            options={clients?.length > 0 && clients.map((client) => ({value: client.id, label: client.full_name}))} 
            showSearch
              placeholder="Search to Client"
              optionFilterProp="label"/> */}
          </Form.Item>
          <Form.Item label="Policy" name="Policy">
            <Select
              size="large"
              onChange={(value) => {setPolicyId(value); setPolicyErrorText("")}}
              value={policyId}
              disabled={slug ? true : false}
              options={
                policys?.length > 0 &&
                policys?.map((policy) => ({
                  value: policy.id,
                  label: policy.policy_name,
                }))
              }
            />
            <span className="text-red-500">{policyErrorText}</span>
          </Form.Item>
          <Form.Item label="Agent" name="Agent">
            {policys?.length > 0
              ? policys.map((policy) =>
                  policy ? (
                    <div key={policy.insurance.agent_email}>
                      {policy.insurance.agent_name} -{" "}
                      {policy.insurance.agent_email}
                    </div>
                  ) : (
                    "-to be displayed based on Client selection-"
                  )
                )
              : "-to be displayed based on Client selection-"}
          </Form.Item>

          {/* <Form.Item label="Agent" name="Agent">
            <Select size="large" options={selectAgentOption} />
          </Form.Item> */}
          <Form.Item
            label="Description"
            name="Description"
            className="col-span-2"
          >
            <TextArea
              size="large"
              value={description}
              onChange={(e) => {setDescription(e.target.value) ; setDescriptionErrorText("")}}
            />
            <span className="text-red-500">{descriptionErrorText}</span>
          </Form.Item>
          <Form.Item label="Attachment" name="Attachment">
            <div className="upload-container">
              <label htmlFor="file-upload" className="custom-file-upload">
                <UploadOutlined /> Click to Upload
                <input
                  id="file-upload"
                  type="file"
                  onChange={(event) => slug ? handleImageUpload(event, "edit") : handleImageUpload(event, "create")}
                  multiple
                />
              </label>
              <div className="flex flex-wrap gap-4">
              {uploadedImages?.length > 0 &&
                uploadedImages.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className="uploaded-image"
                    />
                    <CloseCircleOutlined
                      className="remove-icon"
                      onClick={() => handleImageRemove(index)}
                    />
                  </div>
                ))}
                </div>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        {/* <Button>Cancel</Button> */}
        <Button
          type="primary"
          onClick={() => handleRaiseRequest(slug ? 'edit' : 'create')}
          disabled={clients === null || policys === null || description === "" || policyId===null}
        >
          {slug ? "Update Raised Ticket" : "Raise Request"}
        </Button>
      </div>

      {/* {cropper ? (
        <ImageCropper
          cropperImage={cropperImage}
          closepopup={() => {
            setCropper(false);
            if (document.getElementById("file-upload")) {
              document.getElementById("file-upload").value = "";
            }
          }}
          setCropImage={async(croppedImage) => {
            const fileUpload = await FileUpload({ base64File: croppedImage.croppedImage})
            if(fileUpload.ack){
              setUploadedImages([...uploadedImages, fileUpload?.data]);
              toast.success(fileUpload?.message, {
                limit: 1,
                toastId: "imageUploadSuccess",
              })
            }else{
              toast.error(fileUpload?.message, {
                limit: 1,
                toastId: "imageUploadError",
              })
            }
            setCropper(false);
            setCropperImage("");
          }}
        />
      ) : null} */}
    </Card>
  );
};

export default RaiseRequest;
