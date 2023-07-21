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
  const [todosTemp, setTodosTemp] = useState(todos);

  const handleChangeStatus = (v, todo) => {
    let temp = [...todosTemp];
    temp = temp.map((o) => {
      if (o.key === todo.key) {
        o.tags = [v];
      }
      return o;
    });
    setTodosTemp(temp);
  };

  const handleDelete = (t) => {
    let temp = [...todosTemp];
    temp = temp.filter((o) => o.key !== t.key);
    setTodosTemp(temp);
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
      <div className="select--search-container">
        <Space style={{}}>
          <Search
            placeholder="Search Todo Name"
            allowClear
            size="large"
            onChange={(e) => {
              let v = e.target.value;
              if (v === "") {
                setTodosTemp(todos);
              } else {
                let temp = [...todos];
                temp = temp.filter((o) =>
                  o.name.toLowerCase().includes(v.toLowerCase())
                );
                console.log(temp);
                setTodosTemp(temp);
              }
            }}
            set
          />
        </Space>
        <div className="select-container">
          <Space size="large" wrap>
            <Select
              defaultValue={"filter status"}
              style={{
                width: 120,
              }}
              onChange={(v) => {
                let temp = [...todos];
                if (v === "all todos") {
                  setTodosTemp(temp);
                  return;
                }
                temp = temp.filter((o) => o.tags[0] === v);
                setTodosTemp(temp);
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
                {
                  value: "all todos",
                  label: "all todos",
                },
              ]}
            />
          </Space>
        </div>
      </div>
      <Table columns={columns} dataSource={todosTemp} width={500} />
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
