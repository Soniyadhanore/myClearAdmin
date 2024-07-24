import { Button, Modal, Radio } from "antd";

const Assign = ({ isOpen, onOk, onCancel }) => {
  return (
    <>
      <Modal
        centered
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        width={600}
        footer={null}
      >
        <div className="flex flex-col gap-1">
          <div className="flex justify-center items-center">
            <div className="font-semibold text-lg">Assign Agent</div>
          </div>
          <div className="w-full ">
            <div className="pt-4">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="text-sm mb-2">agent name 1</p>
                  </div>
                  <div>
                    <Radio />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="text-sm mb-2">agent name 2</p>
                  </div>
                  <div>
                    <Radio />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="text-sm mb-2">agent name 3</p>
                  </div>
                  <div>
                    <Radio />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src="images/user.png"
                      alt="Agent Icon"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <p className="text-sm mb-2">agent name 4</p>
                  </div>
                  <div>
                    <Radio />
                  </div>
                </div>
              </div>
              <div className="text-center mt-[50px]">
                <Button type="primary">Assign</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Assign;
