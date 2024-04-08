/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Layout, Button, theme, Dropdown, Space,Avatar,Typography  } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // SmileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'; //高阶组件
const { Header } = Layout;
const { Text } = Typography;


function Topheader(props) {
    const {username,role:{roleName}} = JSON.parse(localStorage.getItem("token"))
    const [collapsed, setCollapsed] = useState(false);
    const items = [
        {
            label: (
                <Text strong>{roleName}</Text>
            ),
            key: '0',
          },
          {
            label: (
                <Text type="danger" strong onClick={()=>{
                    localStorage.removeItem("token")
                    props.history.replace("/login")
                }}>退出登录</Text>
            ),
            key: '1',
          },
    ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <div className='' style={{ float: "right"}}>
                    <span>欢迎{username}回来</span>
                    <Dropdown menu={{ items }}>
                       
                            <Space>
                            <Avatar size="large" icon={<UserOutlined />} />
                            </Space>
                        
                    </Dropdown>
                </div>
            </Header>
        </Layout>
    )
}

export default withRouter(Topheader)
