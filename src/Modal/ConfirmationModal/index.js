import React from "react";
import { Modal, Typography } from "antd";
const ConfirmationModal = ({
  isOpen,
  onOk,
  onCancel,
  ConfirmationHeading,
  ConfirmationParagraph,
  responceData
}) => {
  return (
    <>
      <Modal
        title={ConfirmationHeading}
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        width={300}
        // okButtonProps={{ disabled: responceData === "Resolved" }}
        >
        <Typography className="text-sm mb-4">
          {ConfirmationParagraph}
        </Typography>
      </Modal>
    </>
  );
};
export default ConfirmationModal;
