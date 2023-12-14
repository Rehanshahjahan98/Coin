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
          answer: 'Last Updated: 10/28/2',
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
	            <span className='title'>Terms Of Service</span><br/><br/>
            </div>
            <div className='white'>
              <p>
                Please read these Terms and Conditions carefully before using Our Service. Welcome to Hopiumbet.gg (the “Site”). The Site is operated by Hopiumbet.gg (the “Company”, “we” “our” or “us”).
                <br/><br/><span className='title'>Acknowledgement</span><br/>
                These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service
                Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
                By accessing or using the Services You confirm to be 18 years or older. If You are not 18 years or older You may not access the Service.
                
                You are not allowed to register on the Website and use our services if you are a resident of Aruba, Australia, Belgium, Bonaire, Curacao, Cyprus, Denmark, Estonia, France, Germany, Hungary, Iran, Iraq, Italy, Netherlands, Saba, Slovakia, Spain, St Maarten, Statia, Turkey, United Arab Emirates, U.S.A or the U.S.A dependencies, United Kingdom. We reserve the right to refuse customers from any other countries over and above the aforementioned jurisdictions at our own discretion.
                
                For legal reasons, some or all residents or persons located in certain countries, in addition to those listed in the paragraph above, may be prohibited from accessing certain services on the Website. This Website is not intended to be used by persons in countries where such activities are prohibited. You are responsible for researching the laws applicable in your locality or country. You must ensure that you are complying with the law in the jurisdiction in which you are using the Website or any Service.
                
                
                Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service
                
                In the Agreement, "you" or "your" or "user" or “player” means any person who uses the Site, Services or the Software under the Agreement.
                
                Important: Please review the Privacy Policy prior to your use of the Site or the Services.
                
                By using or accessing the Site or, you consent to the terms and conditions set forth in the Agreement and agree to be bound by its terms.
                <br/><br/><span className='orange'>Definitions</span><br/>
                For the purposes of these Terms and Conditions:
                
                Account means a unique account created for You to access our Service or parts of our Service.
                
                Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hopiumbet.gg
                
                Service refers to the Website.
                
                Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.
                
                Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.
                Website refers to hopiumbet.gg
                
                You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                1. Acceptance and Amendment of the Agreement
                
                If you do not agree to any terms or conditions of the Agreement you should immediately stop using the Site and the Services.
                
                We may amend the Agreement from time to time and any changes made shall come into effect 14 days after being published on the Site or earlier if required by any applicable law, regulation or directive. You agree that your access or use of the Site or your use of the Services following such period will be deemed to constitute your acceptance of the amendments made to the Agreement.
                
                It remains your responsibility to ensure that you are aware of the correct, current terms and conditions of Agreement and we advise you to check the Terms of Service and the Privacy Policy on a regular basis.
                
                We may terminate or suspend your use of the Services and/or this Site at any time, at our sole discretion and for any reason which may include but is not limited to a breach by you of the Agreement without providing any financial compensation to you.
                2. Use of the Site and Services
                
                The Site and the Services may only be used by you if you are over the age of 18 and over the age for which the Site and the Services are legal under the laws of any jurisdiction which applies to you (the "Legal Age").
                
                The Site and the materials incorporated therein are not designed to appeal or target those who have not yet reached Legal Age.
                
                If you are not of Legal Age you must immediately stop using or accessing the Site and the Services.
                3. Intellectual Property Rights
                The Company, its affiliates and its licensors (as applicable) own all software, data, written materials and other content, graphics, forms, artwork, images, pictures, graphics, photographs, functional components, animations, videos, music, audio, text and any software concepts and documentation and other material on, in or made available through the Site (collectively the “Site Content”).
                You agree not to remove or alter any copyright notice or any other proprietary notice on the Site or the Site Content.
                In addition, the brand names and any other trademarks, service marks and/or trade names used on this Site (the “Trade Marks”) are the trademarks, service marks and/or trade names of the Company, its affiliates or its licensors (as applicable) and these entities reserve all rights to such Trade Marks.
                The Site Content and Trademarks are protected by copyright and/or other intellectual property rights. You hereby acknowledge that by using the Services or by using or visiting the Site, you obtain no rights in the TradeMarks and the Site Content and you may only use the same in complete accordance with the Agreement.
                4. User Accounts
                When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service. You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.
                You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
                You cannot transfer, sell, or pledge Your Account to another person. This prohibition includes the transfer of any assets of value of any kind, including but not limited to ownership of accounts, winnings, deposits, bets, rights and/or claims in connection with these assets, legal, commercial, or otherwise. The prohibition on said transfers also includes however is not limited to the encumbrance, pledging, assigning, usufruct, trading, brokering, hypothecation and/or gifting in cooperation with a fiduciary or any other third party, company, natural or legal individual, foundation and/or association in any way shape or form.
                5. Prohibited Activities
                By visiting or using using the Site you agree not to and not to permit others:
                a. access or collect any personally identifiable information of other users or visitors of the Site for any reason whatsoever;
                b. use the Site, the Services, the Site Content in connection with any unlawful activity;
                c. copy, redistribute, publish, reverse engineer, decompile, disassemble, modify, translate or make any attempt to access the source code to create derivative works of the source code, or otherwise;
                d. to harvest or collect any data or information through the Site, or use any robot, spider, scraper or any other means, automated or otherwise, to access the Site;
                e. disclose any data about the Site or the Services to any third parties;
                f. distribute any malicious code viruses, spyware, trojans, worms, spybots, keyloggers or any other form of malware, droppers, logic bombs, hidden files, locks, clocks, copy protection features, CPU serial number references or any other device of similar intent to the Site or Services or upload any upload files designed to harm the Site, the Services or the users or visitors to the Site or users of the Services;
                g. not modify, lease, copy, distribute, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any of the Site Content, Trademarks or User Content;
                h. make the software available to any third party through a computer network or otherwise;
                i. not to take any action that would reduce or harm the Company’s, its affiliates or the Sites goodwill or reputation.
                6. Your Undertakings and Representations
                By visiting or using the Site you represent, warrant and affirm:
                a. you are of Legal Age;
                b. you will only use the Site and Services for non-commercial purposes and in a personal capacity;
                c. you have verified and determined that your use of the Services and the Site does not violate any laws or regulations of any jurisdiction that applies to you and you will not use the Site or Services or any materials and information contained therein, in connection with any unlawful activity;
                d. you shall use the Site and the Services in complete accordance with the terms and conditions of the Agreement, as amended from time to time;
                e. you will not to use the Site, Services, or any information contained on the Site for any illegal or unauthorized purposes that violates any local, national, or international laws (including but not limited to import, export, copyright, and trademark laws);
                f. not impersonate any individual, person, or entity, other than yourself;
                g. to waive any right to participate in a class action or trial by jury against the Company or its affiliates in any jurisdiction where such waiver is possible and agree to submit to arbitral proceedings in the event of a dispute as further set out in these Terms of Service.
                If You are using the Site on behalf of an organization, company, or entity (collectively, a “Subscribing Organization”) then you represent and warrant that you: (i) are authorized as a representative or agent of that Subscribing Organization with sufficient authority to bind that Subscribing Organization to the Agreement; (ii) have read the Agreement; (iii) understand these Agreement, and (iv) agree to these Agreement on behalf of such Subscribing Organization.
                7. Third-Party Content
                This Site may contain hyperlinks to other websites, services or products or content operated by persons/entities other than us (collectively “Third Party Content”). Such hyperlinks are provided for your reference and convenience only. You agree not to hold us responsible for the Third Party Content . A hyperlink from this Site to the Third Party Content does not imply that we endorse such Third Party Content. You are solely responsible for determining the extent to which you may use any Third Party Content and do so at your own risk.
                We do not endorse nor do we make any warranties, representations with respect to any such to the Third Party Content (which includes but is not limited to the accuracy of the information, the quality of products or services contained in the Third Party Content).
                8. Gaming Services
                The Site, Site Content and Services makes available casino type games for your personal entertainment and may contain references to, link to or advertise Third Party Content which relates to online gaming and gambling services (the “Gaming Services”).
                The Gaming Services are only directed to and are intended to be viewed and used for those users or visitors to the Site who are located in jurisdictions where the use of the Gaming Services is legal.
                Without limiting the foregoing, you understand that laws regarding online gaming and gambling vary throughout the world, and it is your sole obligation to ensure that you fully comply with any law, regulation or directive, applicable to the country you are located in with regards to the use of the Site, Services and the Gaming Services. The ability to access to the Site does not necessarily mean that the Site, the Services, the Site Content, Gaming Services and/or your activities via the Site, are legal under the laws, regulations or directives applicable to the country you are located in.
                You hereby agree and affirm with regards to your access or use of the Gaming Services:
                a. you are located in a jurisdiction where it is lawful to use the Gaming Services which you access;
                b. you are not under the age of 18 or the age of legal consent for engaging in or using the Gaming Services;
                c. you have evaluated the laws, regulations and directives relating to your use of the Gaming Services and your use or access of the Gaming Services will not violate any applicable law, regulation or directive;
                d. your use of the information available on the Site or via the Services may result in the loss of any monies you so choose to gamble or wager on the Gaming Services;
                e. you will verify any requirements imposed by Gaming Services for its use, as may be amended from time to time;
                f. you are fully aware that there is a risk of losing money when gaming and gambling by means of the Gaming Services and you are fully responsible for any such loss; and
                g. your use of the Gaming Services is at your sole option, discretion and risk. In relation to your gambling losses you shall have no claims whatsoever against the Company, its affiliates, its licensors or their respective directors, officers or employees.
                The Site does not provide any advice on the legality of online or offline gambling and that it is your sole responsibility to understand the gambling laws applicable to you in your jurisdiction and to comply with the same.
                9. Disclaimer
                YOUR ACCESS TO AND USE OF THE SITE, THE SERVICES AND ALL MATERIALS ON THE SITE OR MADE AVAILABLE VIA THE SERVICES IS AT YOUR SOLE OPTION, DISCRETION AND RISK.
                THE SITE, THE SERVICES AND ALL MATERIALS ON THE SITE OR MADE AVAILABLE VIA THE SERVICES ARE MADE AVAILABLE ON AN "AS IS" BASIS. THE COMPANY, ITS AFFILIATES AND THEIR LICENSORS DISCLAIM WITH REGARDS TO THE SITE, THE SERVICES AND ALL MATERIALS ON THE SITE OR MADE AVAILABLE VIA THE SERVICES ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS, AND WARRANTIES (WHETHER BY LAW, STATUTE OR OTHERWISE) INCLUDING, WITHOUT LIMITATION, ANY IMPLIED WARRANTY OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, SATISFACTORY QUALITY, NON-INTERFERENCE, ACCURACY OF THE SITE OR THE SERVICES, OR INFRINGEMENT OF APPLICABLE LAWS AND REGULATIONS.
                THE COMPANY MAKES NO WARRANTY THAT THE SITE, THE SERVICES AND ALL MATERIALS ON THE SITE OR MADE AVAILABLE VIA THE SERVICES WILL MEET YOUR REQUIREMENTS, BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THEY ARE FREE OF VIRUSES SPYWARE, MALWARE OR BUGS.
                10. Limitation of Liability
                The Company, its affiliates and their licensors shall not be liable to you or any third party in contract, tort, negligence, or otherwise, for any loss or damage whatsoever arising from or in any way connected with your, or any third party's, use or access of the Site or the Services, whether direct or indirect, including, without limitation, damage for loss of business, loss of profits (including loss of or failure to receive anticipated winnings), business interruption, loss of business information, or any other pecuniary or consequential loss (even where we have been notified by you of the possibility of such loss or damage).
                The Company, its affiliates and licensors shall not be liable in contract, tort or otherwise, for any loss or damage whatsoever arising from or in any way connected with your use, of any link contained on the Site nor are they responsible for the content contained on any Internet site linked to from the Site.
                You confirm that the Company shall not be liable to you or any third party for any modification to, suspension of or discontinuance of the Site or the Services.
                11. Indemnity
                By visiting or using the Site or by using the Services, you agree to fully indemnify, defend and hold us, and our officers, directors, employees, agents, licensors, suppliers, harmless (collectively the “Indemnified Parties”) immediately on demand, from and against and all claims, liabilities, proceedings, damages, losses, liabilities, fines costs and expenses of any kind which includes but is not limited to legal fees, arising out of or incurred as a result of: (i) any breach of the Agreement; (ii) your access and use of the Site or the Services (or by anyone else using your username and password); (iii) your violation of any law; (iv) your negligence; (v) your willful misconduct (collectively the “Claims”).
                You hereby agree: (i) to immediately notify us of any Claim; (ii) not to settle any Claim without our prior written consent; (iii) that the Indemnified Parties (as applicable) may assume the defense of any claim and you shall cooperate to all reasonable requests for information and assistance with respect to the Claims.
                You shall have the right to employ separate counsel of any Claim and to participate in the defense thereof.
                In the event that the Indemnified Parties (as applicable) do not notify you that we elect to undertake the defense of the Claim, you shall have the right to defend the Claim with counsel reasonably acceptable to the Indemnified Party, subject to the applicable Indemnified Parties right to assume, at their sole cost and expense, the defense of any Claim at any time prior to the settlement or final determination thereof.
                12. Termination of the Agreement
                We may terminate the Agreement as well as terminate your access to the Site and the Services immediately without notice to you (and without any financial compensation to you):
                a. if for any reason we decide to discontinue to provide the Services or the Site or any part thereof, in general or specifically to you;
                b. if we believe that you have breached any of the terms of the Agreement;
                c. if your use of the Services or the Site has been in any way improper or breaches the spirit of the Agreement; or
                d. for any other reasonable grounds we see fit.
                13. Entire Agreement
                The Agreement contains the entire agreement between us and you relating to your use of the Site, the Software and the Services and supersedes any and all prior agreement between us and you in relation to the same. You confirm that, in agreeing to accept the Agreement, you have not relied on any warranty or representation save insofar as the same has expressly been made a representation by the Company in the Agreement.
                14. Severability
                To the extent permitted by law, all provisions of this Agreement shall be severable and no provision shall be affected by the invalidity of any other provision.
                15. Irreparable Harm
                You acknowledge and agree that your breach of any of the Agreement could cause irreparable harm to us. Without affecting any other rights and remedies that we may have and despite anything to the contrary in this Agreement, you hereby acknowledge and agree that damages would not be an adequate remedy for any breach by you of the provisions of this Agreement, and that the we shall be entitled to remedies of injunction, specific performance and other equitable relief for any threatened or actual breach of the provisions of this Agreement and that no proof of special damages shall be necessary for the enforcement of this Agreement.
                16. Surviving Provisions
                Any provisions hereof which expressly or by their nature are required to survive termination or expiration of this Agreement in order to achieve their purpose shall survive until it shall no longer be necessary for them to survive in order to achieve that purpose. Without derogating from the generality of the foregoing, Sections 3, 5, 6 and 9-18 (inclusive) hereof shall survive termination of this Agreement.
                17. Waiver
                No waiver by us of any terms of the Agreement shall be construed as a waiver of any preceding or succeeding breach of any terms of the Agreement.
                18. Third Parties
                Unless otherwise expressly stated, nothing in this Agreement shall create or confer any rights or any other benefits to third parties. Nothing in the Agreement shall be construed as creating any agency, partnership, trust arrangement, fiduciary relationship or any other form of joint enterprise between you and us.
                Nothing in the Agreement shall be construed as creating any agency, partnership, trust arrangement, fiduciary relationship or any other form of joint enterprise between you and us.
                19. Assignment
                We reserve the right to transfer, assign, sublicense or pledge the Agreement, in whole or in part, without your consent: (i) to any entity within the same corporate group as the Company, or (ii) in the event of a merger, sale of assets or other similar corporate transaction in which the Company may be involved in. You may not transfer, assign, sublicense or pledge in any manner whatsoever any of your rights or obligations under the Agreement.
                '
                </p>
            </div>
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