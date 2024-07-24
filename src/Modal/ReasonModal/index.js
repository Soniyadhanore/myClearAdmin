import React, { useState } from "react";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
const RejectReasonModal = ({
  isOpen,
  onOk,
  onCancel,
  ReasonText,
  ReasonPlaceholder,
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
        <TextArea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder={ReasonPlaceholder}
          rows={3}
          style={{ marginTop: "0.5rem", marginBottom: "10px" }}
        />
      </Modal>
    </>
  );
};
export default RejectReasonModal;
