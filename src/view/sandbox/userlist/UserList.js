import React, { useState, useEffect, useRef } from 'react';
import { Button, Table, Modal, Switch, } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Userform from '../../../component/from-component/userform';
const { confirm } = Modal


export default function UserList() {
  const [dataSource, setdataSource] = useState([]);
  const [roleList, setroleList] = useState([]);
  const [regionList, setregionList] = useState([]);
  const addform = useRef(null);
  const updatafrom = useRef(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsUpdatadisabled, setIsUpdatadisabled] = useState(false)
  const [current, setcurrent] = useState(null)
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const columns = [
    {
      title: '区域选择',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === "" ? '全球' : region}</b>
      },
      filters: [
        {
          text: '全球',
          value: '全球',
        },
        ...regionList.map(item=>({
          text: item.title,
          value: item.value,
        }))
        
      ],
      onFilter: (value, item) => item.region.startsWith(value),
      width: '30%',
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />} disabled={item.default} onClick={() => deleteitem(item)}></Button>
          <Button type='primary' shape='circle' icon={<EditOutlined />} disabled={item.default} onClick={() => handleupdata(item)}></Button>
        </div>
      }
    }
  ];

  useEffect(() => {
    axios.get("http://localhost:3000/users?_expand=role").then(res => {
      setdataSource(res.data)
    })
  }, [setdataSource])
  useEffect(() => {
    axios.get("http://localhost:3000/regions").then(res => {
      setregionList(res.data)
    })
  }, [setregionList])
  useEffect(() => {
    axios.get("http://localhost:3000/roles").then(res => {
      setroleList(res.data)
    })
  }, [setroleList])

  const CollectionCreateForm = ({ open, onCreate, onCancel, }) => {
    return (
      <div>
        <Modal
          open={open}
          title="用户添加"
          okText="确定"
          cancelText="取消"
          onCancel={onCancel}
          onOk={(values) => {
            addform.current.validateFields().then(value => {
              onCreate(values);
              axios.post(`http://localhost:3000/users`, {
                ...value,
                "roleState": true,
                "default": false,
              }).then(res => {
                console.log(res.data)
                setdataSource([...dataSource, {
                  ...res.data,
                  role: roleList.filter(item => item.id === value.roleId)[0],
                }])
              })
            }).catch(err => {
              console.log(err)
            })
          }}
        >
          <Userform regionList={regionList} roleList={roleList} ref={addform}></Userform>
        </Modal>
      </div>

    );
  };
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const deleteitem = (item) => {  //删除表格脏数据或是不需要成员
    confirm({
      title: '确定删除？',
      onOk() {
        setdataSource(dataSource.filter(data => data.id !== item.id));
        axios.delete(`http://localhost:3000/users/${item.id}`)
      },
      onCancel() { },
    })
  }
  const handleChange = (item) => { //用户状态操作
    // console.log("hasui",item)
    item.roleState = !item.roleState;
    setdataSource([...dataSource])

    axios.patch(`http://localhost:3000/users/${item.id}`, {
      roleState: item.roleState
    })
  }
  const handleupdata = (item) => {
    setIsModalOpen(true);
    if (item.roleId === 1) {
      setIsUpdatadisabled(true)
    } else {
      setIsUpdatadisabled(false)
    }
    setTimeout(() => { //异步处理
      updatafrom.current.setFieldsValue(item)
    }, 0)

    setcurrent(item)
  }
  const handleOk = () => {
    setIsModalOpen(false);
    updatafrom.current.validateFields().then(value => {
      setIsUpdatadisabled(false)
      setdataSource(dataSource.map(item => {
        if (item.id === current.id) {
          return {
            ...item,
            ...value,
            role: roleList.filter(data => data.id === value.roleId)[0]
          }
        }
        return item
      }))
      setIsUpdatadisabled(!IsUpdatadisabled)
      axios.patch(`http://localhost:3000/users/${current.id}`,value)
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsUpdatadisabled(!IsUpdatadisabled)
  };

  return (
    <div>
      <div>
        <Button type="primary" onClick={() => {
          setOpen(true);
        }}
        >添加用户</Button>
        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Modal title="用户更新" okText="更新"
          cancelText="取消" open={isModalOpen} onOk={() => handleOk()} onCancel={handleCancel}>
          <Userform regionList={regionList} roleList={roleList} ref={updatafrom} IsUpdatadisabled={IsUpdatadisabled}></Userform>
        </Modal>
      </div>
      <Table columns={columns} dataSource={dataSource} onChange={onChange}
        pagination={{ pageSize: 8 }} rowKey={item => item.id} />
    </div>
  )
}
