import "./Table.css";
import React, { useState } from "react";
import { Space, Table, Tag, Select, message, Popconfirm } from "antd";
import { Button } from "antd";
import EditModal from "../Modals/EditModal";
import { Input } from "antd";
const { Search } = Input;

const TableList = ({ todos, setTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(todos[0]);
  const [searchValue, setSearchValue] = useState("");

  const handleChangeStatus = (v, todo) => {
    let temp = [...todos];
    temp = temp.map((o) => {
      if (o.key === todo.key) {
        o.tags = [v];
      }
      return o;
    });
    setTodos(temp);
  };

  const handleDelete = (t) => {
    let temp = [...todos];
    temp = temp.filter((o) => o.key !== t.key);
    setTodos(temp);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="todo-name-link">{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "Status",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color =
              tag === "incomplete"
                ? "geekblue"
                : tag === "overdue"
                ? "red"
                : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (todo) => (
        <Space size="middle">
          <Button
            type="default"
            size="small"
            onClick={() => {
              setEditTodo(todo);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => {
              handleDelete(todo);
            }}
            onCancel={() => {
              console.log("cancel");
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
    {
      title: "Change Status",
      key: "change",
      render: (todo) => (
        <Space size="middle" wrap>
          <Select
            defaultValue={todo.tags[0]}
            style={{
              width: 120,
            }}
            onChange={(v) => {
              handleChangeStatus(v, todo);
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
      ),
    },
  ];

  return (
    <div className="table-main">
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Search
          placeholder="Search Todo Name"
          allowClear
          size="large"
          onChange={(e) => {
            let v = e.target.value;
            if (v === "") {
              setTodos(todos);
            } else {
              let temp = [...todos];
              temp = temp.filter((o) => o.name.includes(v));
              console.log(temp);
              setTodos(temp);
            }
          }}
          set
        />
      </Space>
      <Table columns={columns} dataSource={todos} width={500} />
      <EditModal
        editTodo={editTodo}
        todos={todos}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setTodos={setTodos}
      />
    </div>
  );
};

export default TableList;
