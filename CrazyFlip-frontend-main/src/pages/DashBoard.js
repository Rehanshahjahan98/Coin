import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Content from '../components/content'
import axios from 'axios'
const DashBoard = () => {
const [logindata, setLogindata]=useState({})
  useEffect(()=>{
      const getuserDetail = async ()=>{
        try {
          // console.log("inside")
          const response = await axios('http://185.193.126.26:8080/login', { withCredentials: true, method: "get", });
          // console.log(response.data.data, "get user detail");
          setLogindata(response.data.data)
        } catch (error) {
        }
      }
      getuserDetail();
  

  }, [])
  return (
    <>
    <Header/>
    <div className='d-flex gap-1' style={{width:"100%"}}>
    {/* <div className='position-relative menu_div' style={{width:"20%", background:"#553b6e"}}>
    <Menu/>
    </div> */}
    {/* <div className='text-white content-div' style={{width:"80%", paddingLeft:"80px"}}>
      <Content logindata={logindata}/>
    </div> */}
    <Content logindata={logindata}/>

    </div>
    </>
  )
}

export default DashBoard
