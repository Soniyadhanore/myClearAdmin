import React from "react";
import { Modal, DatePicker, Col, Row } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const RescheduleModal = ({ isOpen, onOk, onCancel, ReasonText }) => {
  dayjs.extend(customParseFormat);
//   const disabledDate = (current) => {
//     return (current = current < dayjs().endOf("day"));
//   };

  return (
    <>
      <Modal
        title={ReasonText}
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        width={350}
        
      >
        <Row gutter={15}>
          <Col span={24}>
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              // disabledDate={disabledDate}
              // disabledTime={disabledDateTime}
              showTime={{
                defaultValue: dayjs("00:00:00", "HH:mm:ss"),
              }}
              style={{
                width:'100%',
                marginBottom: '5px'

              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default RescheduleModal;
