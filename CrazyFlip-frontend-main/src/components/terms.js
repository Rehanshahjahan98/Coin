import React, { useState } from 'react';
import './terms.css';
import './ConnectPopup.css';
import discord from '../assets/discord.png';
import logo from '../assets/side-logo.png';
import { FaTimes } from 'react-icons/fa';

const FaqPopup = ({ onClose }) => {
  const [section, setSection] = useState('general');

  const content = {
    general: {
      title: 'General FAQ',
      questions: [
        {
          question: 'Why Hopiumbet.gg?',
          answer: 'We have been involved in all aspects of P2E tokens, NFTs, etc. and wanted to create a Coinflip type game where Flippers could use their P2E tokens to play.',
        },
        {
          question: 'What tokens and how much can I bet?',
          answer: 'On the Coinflip homepage, a dropdown is available that shows which tokens are currently available. Once you pick a token, a table to the left will show how much of that token you can bet.',
        },
        {
          question: 'What are the odds/cost?',
          answer: 'Odds are 50/50 and there is a 5% fee charged on losing and winning flips.',
        },
        
       {
	  question: 'How can I contact Hopiumbet.gg for Support?',
          answer: (
            <div>
              Join us on Discord:
              <h3 id='chat-Btn'>
                <img src={discord} alt='discord-logo' className='logo-discord' />
                <a href='https://discord.gg/RjAvVnDMAS' target='_blank' rel='noreferrer'>
                  Chat with us on Discord &#5171; &#5171;
                </a>
              </h3>
            </div>
          ),
        },
        {
          question: 'What does the future hold for Hopiumbet.gg?',
          answer: 'More Chains, more Tokens, more Games and more!',
        },
      ],
    },
    affiliate: {
      title: 'Affiliate Network FAQ',
      questions: [
        {
          question: 'How does it work?',
          answer: 'Our Affiliate Network works like others with one notable exception - everything is OnChain to ensure accurate and immediate payouts. Sign Up to become an Affiliate and then send your provided Affiliate Link to other individuals. If they Sign Up from your Link, they become an Affiliate of yours.',
        },
        {
          question: 'What does it pay?',
          answer: 'As an Affiliate, you will receive 20% of Hopiumbet.gg’s fees received from every bet your Affiliate places. For example, if an Affiliate of yours place a 20 token bet and wins, Hopiumbet.gg’s fee is 5%, or 2 tokens (.05 * 40 tokens). You, as an Affiliate, would receive 0.02 tokens automatically to your wallet.',
        },
        {
          question: 'Are there any other advantages of becoming an Affiliate and getting Affiliates under you?',
          answer: 'Yes, you will be airdropped FREE $Hopiumbet tokens based on the volume of you and your Affiliates! Tokens will be airdropped every Month based on the previous month’s volume of bets.',
        },
        {
          question: 'Do I need to do anything special to Sign Up as an Affiliate?',
          answer: 'No, just Sign Up (Metamask wallet required) get your Affiliate Link and start spreading it around! Everything else is OnChain and automatic when your Affiliates bet!',
        },
      ],
    },
    token: {
      title: 'Hopiumbet.gg Token FAQ',
      questions: [
        {
          question: 'Where can I find information about $HOPIUMBET Tokenomics?',
          answer: 'On our Tokenomics channel on our Discord server here.',
        },
        {
          question: 'How can I get $HOPIUMBET tokens?',
          answer: 'We did not have a presale and they are not for sale on any CEXs or DEXs. You can get free airdropped tokens by Flipping. Join our Affiliate Network, sign up Affiliates, play and start receiving airdrops every month!',
        },
        {
          question: 'What is the $HOPIUMBETs utility?',
          answer: 'Currently there is no built-in utility to our token. In the future, we envision being able to use it for enhanced betting, Lottery entries and possibly distributions of casino earnings.',
        },
      ],
    },
  };

  const handleSectionChange = (newSection) => {
    setSection(newSection);
  };

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
          <div className='buttons'>
	    <button
	      className={`section-button ${section === 'general' ? 'active' : ''}`}
	      onClick={() => handleSectionChange('general')}
	    >
	      General FAQ
	    </button>
	    <button
	      className={`section-button ${section === 'affiliate' ? 'active' : ''}`}
	      onClick={() => handleSectionChange('affiliate')}
	    >
	      Affiliate Network FAQ
	    </button>
	    <button
	      className={`section-button ${section === 'token' ? 'active' : ''}`}
	      onClick={() => handleSectionChange('token')}
	    >
	      Token FAQ
	    </button>
	  </div>
          <div className='faq'>
            <div className='centered-title'>
	            <span className='title'>{content[section].title}</span>
            </div>
	          <br />
            {content[section].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            <br />
	
              </div>
            ))}
            <div className='centered-title'>
	            <span className='title'>{content[section].title}</span>
            </div>
	          <br />
            {content[section].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            <br />
	
              </div>
            ))}
            <div className='centered-title'>
	            <span className='title'>{content[section].title}</span>
            </div>
	          <br />
            {content[section].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            <br />
	
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPopup;

