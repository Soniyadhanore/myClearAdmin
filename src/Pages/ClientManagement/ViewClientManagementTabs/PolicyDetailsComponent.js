import React from "react";
import { Card, Divider, Typography, Col, Row } from "antd";
import DateHelper from "../../../Helpers/lib/DateHelper";
const PolicyDetailsComponent = ( { policy, responcess }) => {
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4 gap-3">
          <Typography className="text-xl font-semibold" align={"left"}>
            Policy Detail
          </Typography>
        </div>
        <Divider />
        <div className="w-full">
          <img src="images/digital-card.jpg" alt="Digital-card" className="w-[250px] mb-[14px]"/>
          <div className="flex mb-8">
            <Row gutter={[40, 16]}>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  ID :{" "}
                </div>
                <div className="text-base">{policy?.policy_number}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Subscriber :{" "}
                </div>
                <div className="text-base">{responcess?.full_name}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Member :{" "}
                </div>
                <div className="text-base">{responcess?.full_name}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Effective coverage date :{" "}
                </div>
                <div className="text-base">{policy?.policy_effective_date ? DateHelper.format(policy?.policy_effective_date , 'm/d/Y') : "-"}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Premium :{" "}
                </div>
                <div className="text-base">{policy?.policy_premium ? `$${policy?.policy_premium}` : "-"}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Premium Due :{" "}
                </div>
                <div className="text-base">{policy?.premium_due ? `$${policy?.premium_due}` : "-"}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Max out of pocket :{" "}
                </div>
                <div className="text-base">{  policy?.policy_max_out_of_pocket ? `$${policy?.policy_max_out_of_pocket}` : "-"}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Deductible :{" "}
                </div>
                <div className="text-base">{policy?.deductible ? `$${policy?.deductible}` : "-" }</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Doctor's Visit :{" "}
                </div>
                <div className="text-base">{policy?.doctors_visit ? `$${policy.doctors_visit}` : "-"}</div>
                </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Specialist :{" "}
                </div>
                <div className="text-base">{policy?.specialist_visit ? `$${policy.specialist_visit}` : "-"}</div>
              </Col>
              <Col
                className="gutter-row flex items-start justify-start"
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="text-base font-medium text-black w-[250px]">
                  Subsidy :{" "}
                </div>
                <div className="text-base">{policy?.subsidy ? `$${policy.subsidy}` : "-" }</div>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </>
  );
};

export default PolicyDetailsComponent;
