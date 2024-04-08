import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
const { confirm } = Modal

export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/posts?_embed=children',).then(res => {
      const list = res.data;
      list[0].children = "";
      setdataSource(list);
    })
  },[setdataSource])
  const columns = [
    {
      title: '标号ID',
      dataIndex: 'id',

    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color='orange'>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div className='operate'>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
          <Popover content={<div style={{ textAlign: "center" }}>
            <Switch checked={item.pagepermisson} onChange={() => switchMethed(item)}></Switch>
          </div>} title="配置项" trigger={item.pagepermisson === undefined ? '' : 'click'}>
            <Button type='primary' shape='circle' icon={<EditOutlined disabled={item.pagepermisson === 'undefined'} />} />
          </Popover>

        </div>
      }
    },
  ];
  const switchMethed = (item) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setdataSource([...dataSource])
    if(item.grade === 1){
      axios.patch(`http://localhost:3000/posts/${item.id}`,{
        pagepermisson : item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:3000/children/${item.id}`,{
        pagepermisson : item.pagepermisson
      })
    }
  }
  const confirmMethod = (item) => {
    confirm({
      title: "Delete the task",
      icon: <DeleteOutlined />,
      content: "some descriptions",
      onOk() { deletemethed(item) },
      onCancel() { console.log('cancel') }
    })
  }
  const deletemethed = (item) => {
    if (item.grade === 1) {
      setdataSource(dataSource.filter(data => data.id !== item.id))
      axios.delete(`http://localhost:3000/posts/${item.id}`)
    } else {
      let list = dataSource.filter(data => data.id === item.postId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setdataSource([...dataSource])
      console.log(list, dataSource)
      axios.delete(`http://localhost:3000/children/${item.id}`)
    }

  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  )
}
