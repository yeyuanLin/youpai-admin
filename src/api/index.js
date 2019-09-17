// 要求：能根据接口文档定义接口请求
// 包含应用中所有接口请求函数的模块

import ajax from "./ajax";

// const BASE = 'http://localhost:5000';
const BASE ='' ;
// export function reqLogin({username,password}) {
//         return ajax('/login',{username,password},'POST')
// }
// 登录
// export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST');
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')
// 添加用户
// export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST');
