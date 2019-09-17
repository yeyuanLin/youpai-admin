import React,{ Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

// 应用的跟组件
export default  class App extends Component{
    render() {
        return (
            //必须返回虚拟dom对象，生成新的dom对象
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={ Login }></Route>
                    <Route path='/' component={ Admin }></Route>
                </Switch>
            </BrowserRouter>

        )
    }
}
