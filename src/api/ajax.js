
import axios from 'axios'
import {message} from 'antd'

// 发送异步请求的函数模块
// 封装axios库
// 函数的返回值是promise对象
/* 1.优化：统一处理请求异常？
          在外层包一个自己创建的promise对象
          在请求出错时，不去reject,而是显示错误提示
   2.优化2：异步得到不是response,而是response.data
          在请求成功resolve时：resolve(response.data)
 */
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject) =>{
        let promise;
        // 1.执行异步ajax请求
        if(type==='GET'){//发送GET请求
            promise = axios.get(url,{//配置对象
                params:data//指定请求参数
            })
        }else {
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            // 2.如果成功了，调用resolve(value)
            resolve(response.data)

        }).catch(error=>{
            // 3.如果失败了，不调用reject(reason),而是提示异常信息
            message.error("请求出错了："+ error.message)
        })


   });
    if (type==='GET'){  // 发送get请求
        return axios.get(url,{ // 配置对象
            params:{data}  //指定请求参数
        })
    }else{ //发送post请求
        return axios.post(url, data)
    }
}
//请求登录接口
// ajax('/login',{username:'admin',password:'123456'}, 'post').then();
//添加用户
