import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Tree } from 'antd';
import axios from 'axios';
import { UnorderedListOutlined } from '@ant-design/icons'

// const {co} = Modal

export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [treeData, settreeData] = useState([]);
  const [current, setcurrent] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    console.log(current,currentId)
    setIsModalOpen(false);
    // 同步datasource
    setdataSource(dataSource.map(item=>{
      if(item.id===currentId){
        return {
          ...item,
          rights:current
        }
      }
      return item
    }))
    //patch  补丁更新
    axios.patch(`http://localhost:3000/roles/${currentId}`,{
      rights:current
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const opentree = () => {
    setIsModalOpen(true);
    axios.get('http://localhost:3000/posts?_embed=children').then(res => {
      settreeData(res.data)
    })
  };
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    // console.log('onCheck', checkedKeys, info);
    setcurrent(checkedKeys.checked)
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色名字',
      dataIndex: 'roleName',
    },
    {
      title: '角色类型',
      dataIndex: 'roleType',
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button shape='circle' icon={<UnorderedListOutlined />}
            onClick={() => {
              opentree();
              setcurrent(item.rights);
              setcurrentId(item.id)
            }}></Button>
        </div>
      }
    }
  ];
  useEffect(() => {
    axios.get("http://localhost:3000/roles").then(
      res => {
        setdataSource(res.data)
      }
    )
  }, [setdataSource])
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} pagination={{ pageSize: 5, }}></Table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={current}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={treeData}
          checkStrictly={true}
        />
      </Modal>
    </div>
  )
}
