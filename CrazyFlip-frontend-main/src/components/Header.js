import React from 'react'
import layer4 from "../images/layer4.png"
const Header = () => {
  return (
    <div className='d-flex justify-content-space-between pt-2 ps-4 align-items-center text-white mb-1 header_div' style={{background:"#553b6e", height:"80px"}}>
        <div className='d-flex gap-1 w-30 align-items-center'>
            <img className='header-logo' width="60px" src={layer4} alt="" />
            <h1 className='mb-0 hopiumbet border-0'>HOPIUMBET</h1>
        </div>
        <div className='w-100'>
            <h1 className='mb-0 afilliate border-0'>AFFILIATE NETWORK</h1>
        </div>
    </div>
  )
}

export default Header
