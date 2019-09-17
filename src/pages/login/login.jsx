import React,{Component} from "react";
import { Form,Input,Icon,Button,message} from 'antd';

import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'

const  Item = Form.Item;
//登录的路由组件
class Login extends Component{
    handleSubmit = (event)=>{
        // 阻止事件的默认行为，防止表单自动刷新页面
        event.preventDefault();
        // 对所有表单字段进行检验
        this.props.form.validateFields(async (err, values) => {
            // 检验成功
            if(!err){
                // console.log("提交ajax的请求 ", values)
                const {username,password} = values;
                try{
                    const response = await reqLogin(username,password)
                    // console.log("请求成功",response)
                    const result = response.data; //{status:0,data:user}{status:1,msg:'xxx'}
                    if(result.status===0){//登录成功
                        // 提示登录成功
                        message.success("登录成功");
                        // 跳转到管理界面,不需要回退到登录界面（如果需要，则要使用history.push）
                        this.props.history.replace('/')
                    }else{//登录失败
                        //提示错误信息
                        message.error(result.msg)
                    }
                }catch (e ) {
                    alert("请求出错了",e.message)
                }

            }else{
                console.log("检验失败！")
            }
        })



        // const form = this.props.form
        // const values = form.getFieldsValue()
        // console.log('headleSubmit()',values)
    };
    validatePwd = (rule,value,callback)=>{
        // console.log('validatePwd',rule,value)
        if(!value){
            callback("密码不能为空")
        }else if (value.length<6){
            callback("密码长度不能小于6位")
        }else if(value.length>12){
            callback("密码长度不能大于12位")
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback("密码是由字母、数字和下划线组成")
        }else {
            callback(); //验证通过
        }


        // callback('xxx')
    };
    render(){
        // 得到具有强大功能得Form对象
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>优派后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名必须输入' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue: 'admin', // 初始值
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatePwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

// 1.高阶函数：更加动态，更加具有扩展性
// 接受函数类型的参数
// 返回值是函数

// 2.高阶组件
//  本质就是一个函数
// 接收一个组件（被包装），返回一个新组件（包装组件），心组件内部渲染被包装组件传入特定属性
// 作用：扩展组件的功能
// 高阶组件也是高阶函数：接收一个组件函数，返回是一个新的组件函数

// 包装Form组件，生成一个新的组件：Form(Login)
// 新组件会向form传递一个强大的对象属性：form
const WrapLogin = Form.create()(Login)
export default WrapLogin

// 1.前台表单验证
// 2.收集表单数据

/*
async 和 await
1.作用？
    简化promise对象的使用：不要再使用then()来指定成功/失败的回调函数
    以同步编码（没有回调函数了）方式实现异步流程
2.哪里写await？
    在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3.哪里写async
    await的所在函数（最近）定义的左侧
*/
