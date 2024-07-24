import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
const { Panel } = Collapse;

const Dependent = ({ policy }) => {
  return (
    <>
      <Collapse accordion bordered={false}>
        {policy?.dependents &&
          policy?.dependents.map((dependent, index) => (
            <Panel
              header={`Dependent 1 - ${dependent?.dependent_full_name}`}
              key={index}
            >
              <Card>
                <div className="flex justify-between items-center mb-4 gap-3">
                  <Typography className="text-xl font-semibold" align={"left"}>
                    Policy Detail
                  </Typography>
                </div>
                <Divider />
                <div className="w-full">
                  <img
                    src="images/no-digital-card.jpg"
                    alt="no-digital-card"
                    className="w-[250px] mb-[14px]"
                  />
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
                          Unique ID :{" "}
                        </div>
                        <div className="text-base">{dependent?.policy_id}</div>
                      </Col>
                      {/* <Col
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
                        <div className="text-base">Rosy Smith</div>
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
                        <div className="text-base">Rosy Smith</div>
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
                          Effective Date of coverage :{" "}
                        </div>
                        <div className="text-base">$480.00</div>
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
                        <div className="text-base">$480.00</div>
                      </Col> */}
                      {/* <Col
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
                        <div className="text-base">$0.00</div>
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
                        <div className="text-base">$3,800.00</div>
                      </Col> */}
                      <Col
                        className="gutter-row flex items-start justify-start"
                        xs={24}
                        sm={24}
                        md={12}
                        lg={12}
                        xl={12}
                      >
                        <div className="text-base font-medium text-black w-[250px]">
                          Digital card of policy :{" "}
                        </div>
                        <div className="text-base">
                          {dependent?.digital_card
                            ? dependent?.digital_card
                            : "-"}
                        </div>
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
                          Gender :{" "}
                        </div>
                        <div className="text-base capitalize">
                          {dependent?.dependent_gender}
                        </div>
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
                          Dependent Name :{" "}
                        </div>
                        <div className="text-base">
                          {dependent?.dependent_full_name}
                        </div>
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
                          Relationship to policyholder :{" "}
                        </div>
                        <div className="text-base">
                          {dependent?.relationship_to_policy_holder
                            ? dependent?.relationship_to_policy_holder
                            : "-"}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Panel>
          ))}

        {/* <Panel header="dependent 2 - gill smith" key="2">
              <Card>
                <div className="flex justify-between items-center mb-4 gap-3">
                  <Typography className="text-xl font-semibold" align={"left"}>
                    Policy Detail
                  </Typography>
                </div>
                <Divider />
                <div className="w-full">
                  <img
                    src="images/digital-card.jpg"
                    alt="Digital-card"
                    className="w-[250px] mb-[14px]"
                  />
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
                        <div className="text-base">#U3728613456</div>
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
                        <div className="text-base">Rosy Smith</div>
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
                        <div className="text-base">Rosy Smith</div>
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
                          Effective Date of coverage :{" "}
                        </div>
                        <div className="text-base">$480.00</div>
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
                        <div className="text-base">$480.00</div>
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
                        <div className="text-base">$0.00</div>
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
                        <div className="text-base">$3,800.00</div>
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
                        <div className="text-base">$0.00</div>
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
                        <div className="text-base">$0.00</div>
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
                        <div className="text-base">$40.00</div>
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
                        <div className="text-base">$488.00</div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Panel> */}
      </Collapse>
    </>
  );
};

export default Dependent;
