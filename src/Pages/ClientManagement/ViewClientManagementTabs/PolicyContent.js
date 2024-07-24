import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
import Dependent from "./Dependent";
import { useEffect } from "react";
import PolicyDetailsComponent from "./PolicyDetailsComponent";
import DateHelper from "../../../Helpers/lib/DateHelper";
const { Panel } = Collapse;
const PolicyContent = ({policies , responcess}) => {
    return (
        <>
        <Collapse accordion bordered={false} className="policy-drop">
        {policies && policies.map((policy, index) => (
          <Panel
            header={
              <div className="flex">
                <div className="mr-3">
                  <img src="images/auto.jpg" alt="Auto" />
                </div>
                <div className="flex items-start justify-between w-full">
                  <div>
                    <div className="font-semibold mb-1">Policy name: {policy?.policy_name}</div>
                    <div className="font-semibold mb-1">Policy ID: {policy?.policy_number}</div>
                    <div className="font-semibold mb-1">Subscriber: {responcess?.full_name}</div>
                    <div className="font-semibold mb-1">
                      Effective coverage date: {policy?.policy_effective_date ? DateHelper.format(policy.policy_effective_date , "m/d/Y") : "N/A"}
                    </div>
                  </div>
                  <div className="font-semibold">Member: {responcess?.full_name}</div>
                </div>
              </div>
            }
            key={index}
          >
            <PolicyDetailsComponent policy={policy} responcess={responcess} />
            <Dependent policy={policy} />
          </Panel>
        ))}
      </Collapse>
        </>
    );
};

export default PolicyContent;