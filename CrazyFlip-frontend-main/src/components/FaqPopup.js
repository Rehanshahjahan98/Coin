import React from 'react';
import './FaqPopup.css';
import './ConnectPopup.css';
import discord from '../assets/discord.png';
import logo from '../assets/side-logo.png';
import { FaTimes } from 'react-icons/fa';

const FaqPopup = ({ onClose }) => {
  return (
    <div className='main-container'>
      <div className='pop-up-container'>
        <button
          className='close-icon'
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <img
          src={logo}
          alt='logo'
          className='logo'
        />
        <div className='content'>
          <div className='faq'>
            <span className='orange'>FAQ</span>
            <br />
            <span className='orange'>Why Hopiumbet?</span>
            <br />
            <span className='white'>
              We wanted to create a CoinFlip game where flippers could use their
              P2E tokens to play.
            </span>
            <br />
            <span className='white'>Odds are 50/50 with a 5% fee.</span>
          </div>
          <div className='faq'>
            <span className='orange'>How do I get hold of Hopiumbet?</span>
            <br />
            <span className='white'>
              Join our discord group for more info, assistance or whatever.
            </span>
            <h3 id='chat-Btn'>
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
          </div>
          <div className='faq'>
            <span className='orange'>
              What does the future hold for Hopiumbet?
            </span>
            <br />
            <span className='white'>
              Look for other P2E themed web3 tokens here shortly.
            </span>
            <br />
            <br />
          </div>
          <div className='faq'>
            <span className='orange'>How to Play?</span>
            <br />
            <span className='white'>1. Connect your wallet.</span>
            <br />
            <span className='white'>2. Pick either heads or tails.</span>
            <br />
            <span className='white'>
              3. Select your desired token and flip amount.
            </span>
            <br />
            <span className='white'>4. Click "Flip".</span>
            <br />
            <span className='white'>
              5. Click approve and wait for coin to spin.
            </span>
          </div>
          <div className='faq'>
            <span className='orange'>RESPONSIBLE FLIPPING</span>
            <br />
            <span className='white'>
              Have fun but please only play with tokens you can afford to part
              with.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPopup;
