import React, { useContext } from 'react';
import './ConnectPopup.css';
import metaMask from '../assets/MetaMaskLogo.png';
import discord from '../assets/discord.png';
import { CoinFlipContext } from '../Context/conflipContext';

const ConnectPopup = (props) => {
  const { connectWallet, currentAccount } = useContext(CoinFlipContext);

  const handleClose = () => {
    props.onClose();
  };

  const connect = async () => {
    await connectWallet();
    console.log(currentAccount, '...');
    handleClose();
  };

  return (
    <div className='popup-container'>
      <div className='topDiv'></div>
      <h2
        style={{ paddingTop: '20px', marginRight: '160px' }}
        className='h2'
      >
        Connect Supported Wallet
      </h2>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className='tableRow'>
                  <img
                    src={metaMask}
                    alt='metamask-logo'
                    className='metamask-logo'
                  />
                  <h2>METAMASK</h2>
                </div>
              </td>
              <td>
                <button
                  className='connectBtn'
                  onClick={connect}
                >
                  Connect
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <div className='tableRow'>
                  <i
                    className='fa fa-question-circle'
                    aria-hidden='true'
                    style={{
                      fontSize: '30px',
                      marginRight: '10px',
                      paddingBottom: '30px',
                    }}
                  ></i>
                  <h4>Get Help Connecting your wallet</h4>
                </div>
                <h3 id='chatBtn'>
                  <img
                    src={discord}
                    alt='metamask-logo'
                    className='metamask-logo'
                  />
                  <a
                    href='https://discord.gg/RjAvVnDMAS'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Chat with us on discord &#5171; &#5171;
                  </a>
                </h3>
              </td>
              <td>
                <button
                  className='connectBtn'
                  onClick={handleClose}
                >
                  Close
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectPopup;
