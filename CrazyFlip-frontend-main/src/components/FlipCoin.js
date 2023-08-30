import React, { useState } from 'react';
import './FlipCoin.css';
import ConnectPopup from './ConnectPopup';

const FlipCoin = (props) => {
  const [result, setResult] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [winningResult, setWinningResult] = useState('');
  const [flippingInProgress, setFlippingInProgress] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setResult('');
    setWinningResult('');
  };

  const FlipCoin = () => {
    if (!flippingInProgress) {
      console.log('Coin Flipping...');
      setFlippingInProgress(true);
      setResult('flipping');
    }
  };

  const StopCoin = (result) => {
    if (flippingInProgress) {
      setResult('');
      setWinningResult(result);
      setShowPopup(true);
      setFlippingInProgress(false);
      console.log('Coin Flipping stooped.');
    }
  };

  return (
    <div className='center-content'>
      <div className='hello'>
        <button
          onClick={FlipCoin}
          className='flip-btn'
        >
          FLIP
        </button>
        <div
          id='coin'
          className={result}
          key={+new Date()}
        >
          {result === '' && winningResult === '' && (
            <div className='side-a'></div>
          )}
          {result === 'flipping' && <div className='side-c'></div>}
          {winningResult === 'astroman' && <div className='side-b'></div>}
          {winningResult === 'alien' && <div className='side-a'></div>}
        </div>

        {/* Temporary Buttons */}
        <div className='button-row'>
          <button
            onClick={() => StopCoin('astroman')}
            className='stop-btn'
          >
            AstroMan
          </button>
          <button
            onClick={() => StopCoin('alien')}
            className='stop-btn'
          >
            Alien
          </button>
        </div>
      </div>

      {isOpen && <ConnectPopup onClose={togglePopup} />}

      {showPopup && (
        <div className='popup-message'>
          <p>{winningResult === 'astroman' ? 'AstroMan' : 'Alien'} won!</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default FlipCoin;
