import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import './FaqPopup.css';
import Sidebar from "../components/Sidebar";
import './ConnectPopup.css';
import discord from '../assets/discord.png';
import logo from '../assets/side-logo.png';
import { FaTimes } from 'react-icons/fa';

const Terms = ({ onClose }) => {
  const [section, setSection] = useState('general');

  const content = {
    general: {
      title: 'Terms Of Service',
      questions: [
        {
          question: 'Last Updated: 10/28/23',
          answer: 'Please read these Terms and Conditions carefully before using Our Service. Welcome to Hopiumbet.gg (the “Site”). The Site is operated by Hopiumbet.gg (the “Company”, “we” “our” or “us”).',
        },
        {
          question: 'Acknowledgement',
          answer: 'These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service. By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service. By accessing or using the Services You confirm to be 18 years or older. If You are not 18 years or older You may not access the Service. You are not allowed to register on the Website and use our services if you are a resident of Aruba, Australia, Belgium, Bonaire, Curacao, Cyprus, Denmark, Estonia, France, Germany, Hungary, Iran, Iraq, Italy, Netherlands, Saba, Slovakia, Spain, St Maarten, Statia, Turkey, United Arab Emirates, U.S.A or the U.S.A dependencies, United Kingdom. We reserve the right to refuse customers from any other countries over and above the aforementioned jurisdictions at our own discretion. For legal reasons, some or all residents or persons located in certain countries, in addition to those listed in the paragraph above, may be prohibited from accessing certain services on the Website. This Website is not intended to be used by persons in countries where such activities are prohibited. You are responsible for researching the laws applicable in your locality or country. You must ensure that you are complying with the law in the jurisdiction in which you are using the Website or any Service. Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service In the Agreement, "you" or "your" or "user" or “player” means any person who uses the Site, Services or the Software under the Agreement. Important: Please review the Privacy Policy prior to your use of the Site or the Services.',
        },
        {
          question: 'Definitions',
          answer: 'For the purposes of these Terms and Conditions: Account means a unique account created for You to access our Service or parts of our Service. Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hopiumbet.gg Service refers to the Website. Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service. Website refers to hopiumbet.gg You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.',
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
          question: 'What does it pay?',
          answer: 'As an Affiliate, you will receive 20% of Hopiumbet.gg’s fees received from every bet your Affiliate places. For example, if an Affiliate of yours place a 20 token bet and wins, Hopiumbet.gg’s fee is 5%, or 2 tokens (.05 * 40 tokens). You, as an Affiliate, would receive 0.02 tokens automatically to your wallet.',
        },
        {
          question: 'Are there any other advantages of becoming an Affiliate and getting Affiliates under you?',
          answer: 'Yes, you will be airdropped FREE $Hopiumbet tokens based on the volume of you and your Affiliates! Tokens will be airdropped every Month based on the previous month’s volume of bets.',
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
          question: 'What does it pay?',
          answer: 'As an Affiliate, you will receive 20% of Hopiumbet.gg’s fees received from every bet your Affiliate places. For example, if an Affiliate of yours place a 20 token bet and wins, Hopiumbet.gg’s fee is 5%, or 2 tokens (.05 * 40 tokens). You, as an Affiliate, would receive 0.02 tokens automatically to your wallet.',
        },
        {
          question: 'Are there any other advantages of becoming an Affiliate and getting Affiliates under you?',
          answer: 'Yes, you will be airdropped FREE $Hopiumbet tokens based on the volume of you and your Affiliates! Tokens will be airdropped every Month based on the previous month’s volume of bets.',
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
          answer: (
            <div>
              On our Tokenomics channel on our Discord server :
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
   <>
    <Sidebar />
    <div className="navbar">
        <Navbar />
      </div>
    <div className='main-container'>
              
      <main>
        
        <div className='faq'>
               
            <div className='centered-title'>
	            <span className='title'>{content['general'].title}</span>
            </div>
	          <br />
            {content["general"].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            
	
              </div>
            ))}
            <div className='centered-title'>
                 <br />
                 <br />

	            <span className='title'>{content['affiliate'].title}</span>
            </div>
	          <br />
            {content['affiliate'].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            
	
              </div>
            ))}
            <div className='centered-title'>
                  <br />
		  <br />

	            <span className='title'>{content['token'].title}</span>
            </div>
	          <br />
            {content['token'].questions.map((qna, index) => (
              <div key={index}>
                <span className='orange'>{qna.question}</span>
                <br />
                <span className='white'>{qna.answer}</span>
                <br />
		            
	
              </div>
            ))}
          </div>

      </main>

      <footer>
        {/* Add footer content here if needed */}
      </footer>
    </div>
  </>
  );
};

export default Terms;