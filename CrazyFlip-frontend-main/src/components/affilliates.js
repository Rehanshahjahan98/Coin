import React from 'react'
import { Row, Col } from 'react-bootstrap'
const Affilliates = ({logindata}) => {

    const updatedAtDate = new Date(logindata.createdAt);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      };
    
      // Convert the Date object to localized date and time string
      const localizedString = updatedAtDate.toLocaleString(undefined, options);
  return (
    <div className='affilliate_mai_div'>
        <h3 className="text-center myAccount mt-5 border-0" style={{letterSpacing:"1px", marginBottom:"80px"}}>Affilliates</h3>

        <div className='overflowX-auto'>
        <Row className='text-start px-2 g-0'>
            <Col xs={4}>
                <div>
                    <p className='fw-bold'>Sign up Date</p>
                </div>
            </Col>
            <Col xs={4}>
            <div>
                    <p className='fw-bold'>Wallet Address</p>
                </div>
            </Col>
            <Col xs={4}>
            <div>
                    <p className='fw-bold'>Total Plays</p>
                </div>
            </Col>
        </Row>
        <Row className='text-start px-2 g-0'>
            <Col xs={4}>
                <div>
                    <p className=''>{localizedString}</p>
                </div>
            </Col>
            <Col xs={4}>
            <div>
                    <p className=''>{logindata.walletAddress}</p>
                </div>
            </Col>
            <Col xs={4}>
            <div>
                    <p className=''>{}</p>
                </div>
            </Col>
        </Row>

        </div>
    </div>
  )
}

export default Affilliates