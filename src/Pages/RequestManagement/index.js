import { Button, Card, Typography, Divider, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RequestQueue from "./RequestManagementTabs/RequestQueue";
import PickedRequests from "./RequestManagementTabs/PickedRequests";
const RequestManagement = () => {
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  return (
    <>
      <Card>
        <div className="flex items-center justify-between flex-wrap relative gap-3 mb-4">
          <Typography className="text-xl font-semibold mb-0" align={"left"}>
            Support Requests
          </Typography>
          <div className="flex justify-end flex-wrap gap-3">
            <div className="text-[16px] font-semibold flex items-center">
              Total Requests - 21
            </div>
            <Button
              type="primary"
              onClick={() => navigate("/raise-request")}
              icon={<PlusOutlined />}
            >
              Raise new Request
            </Button>
          </div>
        </div>
        <Divider />
        <div className="relative flex flex-col gap-4">
          <Tabs defaultActiveKey="1">
            {" "}
            <TabPane tab="Request queue" key="1">
              <RequestQueue />
            </TabPane>{" "}
            <TabPane tab="Picked requests" key="2">
              <PickedRequests />
            </TabPane>{" "}
          </Tabs>
        </div>
      </Card>
    </>
  );
};

export default RequestManagement;
