import React from 'react'
import Sidemenu from '../../component/sandbox/sidemenu'
import TOPHeader from '../../component/sandbox/topheader'
import { Route, Switch } from 'react-router-dom'
import home from './home/home'
import RoleList from './rolelist/RoleList'
import RightList from './rolelist/RightList'
import UserList from './userlist/UserList'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Nopage from './nopage/Nopage'
import { Layout, theme } from 'antd'
import Gaiblist from './change/Gaiblist'

import './sandbox.scss'

const { Content } = Layout;
export default function sandbox() {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
        <Layout>
            <Sidemenu></Sidemenu>
            <Layout>
                <TOPHeader></TOPHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow:'auto',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                   <Switch>
                    <Route path="/home" component={home} />
                    <Route path="/rolelist/rolelist" component={RoleList} />
                    <Route path="/rolelist/rightlist" component={RightList} />
                    <Route path="/userlist/userlist" component={UserList} />
                    <Route path="/userlist/change"  component={Gaiblist} />

                    <Redirect from="/" to="/home" exact />
                    <Route path="*" component={Nopage} />
                </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
