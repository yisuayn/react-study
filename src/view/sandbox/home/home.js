import React from 'react'
import { Button } from 'antd';
// import axios from 'axios';
export default function home() {
  const ajax =()=>{
    // 取数据
    // axios.get().then()
    // 增加
    // axios.psot('http://localhost:3000/posts').then(
    //   res=>{
    //     console.log(res.data)
    //   }
    // )
    // 更新 put
    // axios.put().then()
    // 更新patch
    // axios.patch().then()
    // 删除
    // axios.delete().then()
    // _embed向下找关联信息
    // axios.get('http://localhost:3000/posts?_embed=comments').then(
    //   res=>{
    //     console.log(res.data)
    //   }
    // )
    //_expand 向上找信息
    // axios.get('http://localhost:3000/comments?_expand=post').then(
    //   res=>{
    //     console.log(res.data)
    //   }
    // )
  }
  return (
    <div>
       <Button type="primary" onClick={ajax}>Button</Button>
    </div>
  )
}
