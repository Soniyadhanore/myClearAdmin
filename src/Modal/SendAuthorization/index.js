import React from "react";
import { Modal, Typography } from "antd";
const SendAuthorization  = ({
  isOpen,
  onOk,
  onCancel,
}) => {
  return (
    <>
      <Modal
         title="Authorization"
         centered
         open={isOpen}
         onCancel={onCancel}
         onOk={onOk}
         cancelText="No"
         okText="Yes"
        width={400}
      >
        <Typography className="text-sm mb-4">
        Are you sure you want to authorize this action?
        </Typography>
      </Modal>
    </>
  );
};
export default SendAuthorization ;
