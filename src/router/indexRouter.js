import React from 'react'
import { HashRouter, Route,Redirect} from 'react-router-dom'
import login from '../view/login/Login'
import NewsSandBox from '../view/sandbox/sandbox'
import { Switch } from 'react-router-dom/cjs/react-router-dom.min'

export default function indexRouter() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={login} />
                {/* <Route path="/" component={NewsSandBox} /> */}
                <Route path="/" render={() => localStorage.getItem("token") ? <NewsSandBox></NewsSandBox>:<Redirect to="/login"/> } />
            </Switch>
        </HashRouter>
    )
}

