import React, { useEffect, useState } from "react";
import {
  Card,
  Divider,
  Button,
  Typography,
  Switch,
  Select,
  DatePicker,
  Form,
} from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateCmsStatus, getCmsDetail } from "../../Axios/services/Cms";
import { useDispatch } from "react-redux";
import { changeLoader } from "../../Redux/reducers/loader";
import { toast } from "react-toastify";
import DateHelper from "../../Helpers/lib/DateHelper";
const selectProviderTypeOption = [
  { value: "1", label: "Provider" },
  { value: "2", label: "Client" },
];
const CmsEditor = () => {
  const {slug} = useParams()
  const navigate = useNavigate();
  const [responce, setResponce] = useState({});
  const dispatch = useDispatch();
  const handleGetDetail = async() => {
    dispatch(changeLoader(true));
    try{
      const response = await getCmsDetail();
      if(response.ack){ 
        setResponce(response?.data)
      }
      toast[response.ack ? "success" : "error"](response.message, {
        limit: 1,
        toastId: "forgotPassword" + (response.ack ? "Success" : "Error"),
      });
      dispatch(changeLoader(false));
    }catch(error){
      dispatch(changeLoader(false));
      console.log(error)
    }
  };

  const handleUpdateStatus = async() => {
    dispatch(changeLoader(true));
    try{
        let params = {
         status : responce?.status === "active" ? "inactive" : "active"
        }
       let res = await UpdateCmsStatus(params);
       if(res.ack){
         handleGetDetail();
        }
        toast[res.ack ? "success" : "error"](res.message, {
          limit: 1,
          toastId: "forgotPassword" + (res.ack ? "Success" : "Error"),
        });
        dispatch(changeLoader(false));
    }catch(error){
        dispatch(changeLoader(false));
        console.log(error);
    }
  };

  const handleEditorChange = (event, editor) => {
    // const data = editor.getData();
    // console.log({ event, editor, data });
    // setResponce((responce) => ({ ...responce, content: data }));
  };


  useEffect(() => {
    handleGetDetail();
  }, []);

  return (
    <Card>
      {/* below is Terms Condition content */}
      <div className="min-h-[calc(100vh_-_290px)] editor-height">
        <div className="flex items-center justify-between mb-4">
          <Typography className="text-lg font-semibold" align={"left"}>
            <LeftOutlined
              onClick={() => navigate(-1)}
              className="text=lg text-black mr-2 cursor-pointer"
            />
            {responce?.title}
          </Typography>
          <div className="flex items-center justify-between gap-3">
            <Switch
              size="large"
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              defaultChecked ={responce?.status === "active" ? true : false}
              onChange={() => {
                 handleUpdateStatus()
              }}
            />
          </div>
        </div>
        <Divider />
        <div className="mb-0">
          <Form layout="horizontal" className="flex gap-4">
            <Form.Item label="Updated on">
             <div className="text-sm font-normal">{DateHelper.format(responce?.updatedAt, 'm/d/Y h:i A')}</div>
            </Form.Item>
          </Form>
        </div>
        <div className="text-sm font-normal mb-[5px]">Description</div>
        <CKEditor className="" data={responce?.content}  onChange={() => {
           handleEditorChange()
        }} editor={ClassicEditor} />
        {/* data={this.state.editorData}
            onChange={this.handleEditorChange} */}
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button type="">Cancel</Button>
        <Button type="primary">Save</Button>
      </div>

      {/* below is privacy policy content */}
      {/* <div className="min-h-[calc(100vh_-_290px)] editor-height">
        <div className="flex items-center justify-between mb-4">
          <Typography className="text-xl font-semibold " align={"left"}>
            Privacy Policy
          </Typography>
          <Switch
            size="large"
            checkedChildren="Active"
            unCheckedChildren="Inactive"
          />
        </div>
        <Divider />
        <div className="mb-0">
          <Form layout="horizontal" className="flex gap-4">
            <Form.Item label="User Type">
              <Select
                style={{
                  width: 120,
                  textAlign: "left",
                }}
                placeholder="User Type"
                options={selectProviderTypeOption}
              />
            </Form.Item>
            <Form.Item label="Updated on">
              <DatePicker size="medium" />
            </Form.Item>
          </Form>
        </div>
        <CKEditor className="" editor={ClassicEditor} />
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button type="">Cancel</Button>
        <Button type="primary">Submit</Button>
      </div> */}

      {/* below is Disclaimer content */}
      {/* <div className="min-h-[calc(100vh_-_290px)] editor-height">
        <div className="flex items-center justify-between mb-4">
          <Typography className="text-xl font-semibold " align={"left"}>
            Disclaimer
          </Typography>
          <Switch
            size="large"
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            defaultChecked
          />
        </div>
        <Divider />
        <div className="mb-0">
          <Form layout="horizontal" className="flex gap-4">
            <Form.Item label="User Type">
              <Select
                style={{
                  width: 120,
                  textAlign: "left",
                }}
                placeholder="User Type"
                options={selectProviderTypeOption}
              />
            </Form.Item>
            <Form.Item label="Updated on">
              <DatePicker size="medium" />
            </Form.Item>
          </Form>
        </div>
        <CKEditor className="" editor={ClassicEditor} />
      </div>
      <Divider />
      <div className="flex justify-end gap-3">
        <Button type="">Cancel</Button>
        <Button type="primary">Submit</Button>
      </div> */}
    </Card>
  );
};

export default CmsEditor;
