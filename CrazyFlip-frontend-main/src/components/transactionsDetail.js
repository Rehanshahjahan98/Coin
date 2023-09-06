import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify';

const TransactionsDetail = () => {

  const [transactionsData, setTransactionData] = useState()

  useEffect(() => {
    const getTransactions = async () => {
      axios.get('http://185.193.126.26:8080/admin/transactions', { withCredentials: true })
        .then(response => {
          console.log(response, "ressss")
          setTransactionData(response.data.data)
          toast.success('success!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        })
        .catch(error => {
          console.log(error.response.data.err, "error msg");
          toast.error(error.response.data.message || error.response.data.err[0].msg, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
    getTransactions()
  }, []);

  console.log(transactionsData, "transactionsDatatransactionsData")
  return (
    <div className='transaction_details'>
      <h3 className="text-center myAccount mt-5 border-0" style={{ letterSpacing: "1px", marginBottom: "80px" }}>TRANSACTIONS</h3>

      {/* <Row className='text-center m-0 g-0 justify-content-center transaction-row'>
        <Col xs={2}>
          <div>
            <p className='fw-bold'>Date</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <p className='fw-bold'>Wallet</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <p className='fw-bold'>Trx ID</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <p className='fw-bold'>Token</p>
          </div>
        </Col>
        <Col xs={2}>
          <div>
            <p className='fw-bold'>Amount</p>
          </div>
        </Col>
      </Row>

      <Row className="transaction-row text-center">
  {transactionsData?.length > 0 &&
    transactionsData?.map((col, index) => (
      <div className="transaction-item" key={index}>
        <Col xs={2} className="transaction-col">
          <div className="transaction-info">
            <p className="fw-bold">Date</p>
          </div>
        </Col>
        <Col xs={2} className="transaction-col px-2">
          <div className="transaction-info overflowX-auto">
            <p className="fw-bold">{col?.from}</p>
          </div>
        </Col>
        <Col xs={2} className="transaction-col px-2">
          <div className="transaction-info overflowX-auto">
            <p className="fw-bold">{col?.blockHash}</p>
          </div>
        </Col>
        <Col xs={2} className="transaction-col px-2">
          <div className="transaction-info overflowX-auto">
            <p className="fw-bold">{col?.tokenName}</p>
          </div>
        </Col>
        <Col xs={2} className="transaction-col px-2">
          <div className="transaction-info overflowX-auto">
            <p className="fw-bold">{col?.value}</p>
          </div>
        </Col>
      </div>
    ))}
</Row> */}
<div className="table-responsive">
  <table className="table transaction-table" style={{ backgroundColor: 'transparent' }}>
    <thead>
      <tr className="transaction-header">
        <th className="transaction-col">Date</th>
        <th className="transaction-col">Wallet</th>
        <th className="transaction-col">Trx ID</th>
        <th className="transaction-col">Token</th>
        <th className="transaction-col">Amount</th>
      </tr>
    </thead>
    <tbody>
      {transactionsData?.length > 0 &&
        transactionsData?.map((col, index) => (
          <tr className="transaction-row" key={index}>
            <td className="transaction-col">
              <div className="transaction-info">
                <p className="">Date</p>
              </div>
            </td>
            <td className="transaction-col">
              <div className="transaction-info overflowX-auto">
                <p className="">{col?.from}</p>
              </div>
            </td>
            <td className="transaction-col">
              <div className="transaction-info overflowX-auto">
                <p className="">{col?.blockHash}</p>
              </div>
            </td>
            <td className="transaction-col">
              <div className="transaction-info overflowX-auto">
                <p className="">{col?.tokenName}</p>
              </div>
            </td>
            <td className="transaction-col">
              <div className="transaction-info overflowX-auto">
                <p className="">{col?.value}</p>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>






    </div>
  )
}

export default TransactionsDetail
