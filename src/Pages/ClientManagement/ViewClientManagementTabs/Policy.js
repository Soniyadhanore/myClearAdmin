import React, { useEffect } from "react";
import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
import PolicyDetailsComponent from "./PolicyDetailsComponent";
import { useNavigate } from "react-router-dom";
import Dependent from "./Dependent";
import PolicyContent from "./PolicyContent";

const { Panel } = Collapse;

const Policy = ({policies , responcess}) => {
  console.log(policies)
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center my-5">
        <div className="flex gap-5 mr-[10px]">
          <div className="font-semibold">Associated Agent</div>
          <div className="">{policies[0]?.insurance?.agent_name} (NPN - {policies[0]?.insurance?.agent_npn ? policies[0]?.insurance?.agent_npn : "N/A"})</div>
        </div>
        <div>
          <Button type="primary" onClick={() => navigate("/raise-request")}>
            Raise a request
          </Button>
        </div>
      </div>
      <PolicyContent policies={policies} responcess={responcess}/>
    </>
  );
};

export default Policy;
