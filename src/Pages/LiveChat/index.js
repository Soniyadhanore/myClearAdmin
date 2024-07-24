import { Card, Tabs, Typography } from "antd";
import ChatQueue from "./LiveChatTabs/ChatQueue";
import ChatLogs from "./LiveChatTabs/ChatLogs";
import OpenChat from "./LiveChatTabs/OpenChat";

const LiveChat = () => {
  const { TabPane } = Tabs;

  return (
    <>
      <Card>
        <div className="flex justify-between mb-4 gap-5">
          <Typography className="text-xl font-semibold" align={"left"}>
            Live Chat
          </Typography>
        </div>
        <div className="relative">
          <Tabs defaultActiveKey="1">
            {" "}
            <TabPane tab="Chat Queue (5)" key="1">
              <ChatQueue />
            </TabPane>{" "}
            <TabPane tab="Chat Logs" key="2">
              <ChatLogs />
            </TabPane>{" "}
            <TabPane tab="Open Chat" key="3">
              <OpenChat/>
            </TabPane>{" "}
          </Tabs>
        </div>
      </Card>
    </>
  );
};
export default LiveChat;
