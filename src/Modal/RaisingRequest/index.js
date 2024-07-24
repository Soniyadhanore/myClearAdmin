import React, { useState } from "react";
import { Modal, Select, Upload, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
const selectOption = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];
const RaisingRequest = ({
  isOpen,
  onOk,
  onCancel,
  ReasonText,
}) => {
  const [rejectReason, setRejectReason] = useState("");
  return (
    <>
      <Modal
        title={ReasonText}
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        width={400}
      >
        <Select
          placeholder="Select client"
          options={selectOption}
          className="w-full mb-4"
        />
        <Select
          placeholder="Select policy"
          options={selectOption}
          className="w-full mb-4"
        />
        <TextArea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Request description"
          rows={3}
          className="w-full mb-4"
        />
        <Upload name="logo" action="/upload.do" listType="picture" className="w-full mb-4">
          <Button icon={<UploadOutlined />}>Attachment (if any)</Button>
        </Upload>
      </Modal>
    </>
  );
};
export default RaisingRequest;
