import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Space, Select } from "antd";
import { Input } from "antd";
import "./EditModal.css";
import { saveDataToLocalStorage } from "../../commons/LocalStorageHanlder";

const App = ({
  isModalOpen,
  setIsModalOpen,
  todos,
  editTodo,
  setTodosTemp,
}) => {
  const [tName, setTname] = useState("");
  const [status, setStatus] = useState("");
  const handleOk = () => {
    let temp = [...todos];
    temp = temp.map((o) => {
      if (o.key === editTodo.key) {
        if (tName) {
          o.name = tName;
        }
        o.tags = [status];
      }
      return o;
    });
    setTodosTemp(temp);
    setTname("");
    setIsModalOpen(false);
    saveDataToLocalStorage("todos", temp);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Edit Todo Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ width: 100 }}
      >
        <div className="inp-container">
          <Input
            placeholder="Please Enter todo's New Name"
            value={tName}
            onChange={(e) => {
              setTname(e.target.value);
            }}
          />
          <div className="select-container">
            <Space size="middle" wrap>
              <Select
                defaultValue={editTodo?.tags[0]}
                style={{
                  width: 150,
                  marginTop: "20px",
                }}
                onChange={(v) => {
                  setStatus(v);
                }}
                options={[
                  {
                    value: "complete",
                    label: "complete",
                  },
                  {
                    value: "incomplete",
                    label: "incomplete",
                  },
                  {
                    value: "overdue",
                    label: "Overdue",
                  },
                ]}
              />
            </Space>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default App;
