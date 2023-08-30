import React, {useContext, useEffect} from "react";
import "./Transactions.css";
import { CoinFlipContext } from '../Context/conflipContext';



const RecordItem = (props) => {
  return (
    <tr>
      <td>{props.id} </td>
      <td>{props.wallet} </td>
      <td>{props.price} </td>
      <td>{props.res} </td>
      <td>{props.dur}</td>
    </tr>
  );
};


export default function Transactions() {
  const { trxHistory } = useContext(CoinFlipContext);
  

  
  return (
    <>
      <div className="trans-container" id="transactions-bg">
        <h1>Recent Plays</h1>
        <div className="res-table">
          {trxHistory.map((c) => (
            <RecordItem
              key={c.id}
              wallet={c.wallet}
              price={c.price}
              res={c.res}
              dur={c.dur}
            />
          ))}
        </div>
      </div>
    </>
  );
}
