import React, { useState } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const SortingArrow = ({ onSort }) => {
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const handleSort = () => {
    const newSortDirection = !isSortedAsc;
    setIsSortedAsc(newSortDirection);
    onSort(newSortDirection ? "ASC" : "DESC"); // Call the onSort prop with the current sort direction
  };

  return (
    <div onClick={handleSort} className="cursor-pointer inline ml-1">
      {isSortedAsc ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
    </div>
  );
};

export default SortingArrow;
