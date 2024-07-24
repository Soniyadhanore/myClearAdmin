import React from "react";
import { Empty } from "antd";
const EmptyComponent = ({ description }) => (
 <div className="flex flex-cols justify-center items-center">
  <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />
 </div>
);
export default EmptyComponent;
