import React from "react";
import { Modal, Typography } from "antd";
const CloseChat = ({
  isOpen,
  onOk,
  onCancel,
  ConfirmationHeading,
  ConfirmationParagraph,
}) => {
  return (
    <>
      <Modal
        title={ConfirmationHeading}
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        width={500}
        cancelText="No"
        okText="Yes"
        >
        <Typography className="text-sm mb-4">
          {ConfirmationParagraph}
        </Typography>
      </Modal>
    </>
  );
};
export default CloseChat;
