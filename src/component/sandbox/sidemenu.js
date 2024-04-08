import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import './sidemenu.scss';
import axios from 'axios';

import {
    HomeOutlined, ApartmentOutlined, AppstoreAddOutlined,
    UserAddOutlined, DeleteOutlined, SaveOutlined, InfoCircleOutlined,
    VerticalAlignBottomOutlined, LoginOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import { withRouter } from 'react-router-dom'; //高阶组件

const { Sider } = Layout;

// icon映射表
const iconlist = {
    "/home": <HomeOutlined />,
    "/userlist": <ApartmentOutlined />,
    "/rolelist": <AppstoreAddOutlined />,
    "/userlist/add": <UserAddOutlined />,
    "/userlist/delete": <DeleteOutlined />,
    "/userlist/change": <SaveOutlined />,
    "/rolelist/changerole": <InfoCircleOutlined />,
    "/rolelist/deleterole": <VerticalAlignBottomOutlined />,
    "/rolelist/change": <LoginOutlined />,
}

function Sidemenu(props) {
    const [meun, setMeun] = useState([]);
    const [collapsed] = useState(false);
    //动态菜单获取和渲染
    useEffect(() => {
        axios.get('http://localhost:3000/posts?_embed=children').then(
            res => {
                setMeun(res.data)
            }
        )
    }, [])
    const permission = (item) => {
        return item.pagepermisson
    }
    const renderMenu = (menu) => {
        return menu.map(item => {
            if (item.children?.length > 0 && permission(item)) {
                return <SubMenu key={item.key} icon={iconlist[item.key]} title={item.title}>
                    {renderMenu(item.children)}
                </SubMenu>
            }
            return permission(item) && <Menu.Item key={item.key} icon={iconlist[item.key]} onClick={() => {
                props.history.push(item.key)
            }}>{item.title}</Menu.Item>
        })
    }
    const openkey = ["/"+props.location.pathname.split("/")[1]];
    const selectkey = [props.location.pathname];
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='sidebar'>
                <div className="demo-logo-vertical">KanBan-System</div>
                <div className='menuclass'>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectkey}
                        defaultOpenKeys={openkey}
                    >
                        {renderMenu(meun)}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}
export default withRouter(Sidemenu)
