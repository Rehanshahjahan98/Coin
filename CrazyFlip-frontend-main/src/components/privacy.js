import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import './FaqPopup.css';
import Sidebar from "../components/Sidebar";
import './ConnectPopup.css';
import discord from '../assets/discord.png';
import logo from '../assets/side-logo.png';
import { FaTimes } from 'react-icons/fa';

const Private = ({ onClose }) => {
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
	            <span className='title'>Privacy Policy</span><br/><br/>
            </div>
            <div className='white'>
              <p>
                Last updated: October 29th, 2023
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.

                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                <br/><br/><span className='title'>Interpretation and Definitions</span><br/>
                Interpretation:

                The words of which the initial letter is capitalized have meanings defined under the following conditions.

                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

                Definitions

                For the purposes of this Privacy Policy:

                You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

                Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service. Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hopiumbet.gg

                For the purpose of the GDPR, the Company is the Data Controller.

                Account means a unique account created for You to access our Service or parts of our Service.

                Website refers to Hopiumbet.gg

                Service refers to the Website.

                Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the

                Company means to perform services related to the Service or to assist the Company in analyzing how the Service is used.

                For the purpose of the GDPR, Service Providers are considered Data Processors.

                Third-party Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service.

                Personal Data is any information that relates to an identified or identifiable individual.

                For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.

                Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.

                Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).

                Data Controller for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.
                
                <br/><br/><span className='title'>Collecting and Using Your Personal Data</span><br/>
                Personal Data

                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

                Email address
                Usage Data
                Wallet Address

                Usage Data

                Usage Data is collected automatically when using the Service.

                Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

                When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.

                We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.

                Tracking Technologies and Cookies

                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.

                You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.

                Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.

                We use both session and persistent Cookies for the purposes set out below:

                Necessary / Essential Cookies Type: Session Cookies Administered by: Us

                Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these

                Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.

                Cookies Policy / Notice Acceptance Cookies

                Type: Persistent Cookies

                Administered by: Us

                Purpose: These Cookies identify if users have accepted the use of cookies on the Website.

                Functionality Cookies

                Type: Persistent Cookies

                Administered by: Us

                Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.

                Tracking and Performance Cookies Type: Persistent Cookies Administered by: Third-Parties

                Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new advertisements, pages, features or new functionality of the Website to see how our users react to them.

                For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy.

                Use of Your Personal Data

                The Company may use Personal Data for the following purposes:

                To provide and maintain our Service, including to monitor the usage of our Service.

                To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.

                For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.

                To contact You: To contact You by email or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.

                To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.

                To manage Your requests: To attend and manage Your requests to Us.

                We may share your personal information in the following situations:

                For Business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.

                With Business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.

                Retention of Your Personal Data

                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.

                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.

                Transfer of Your Personal Data

                Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located.

                It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from Your jurisdiction.

                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.

                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                
                <br/><br/><span className='title'>Disclosure of Your Personal Data</span><br/>
                
                Business Transactions

                If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.

                Law enforcement

                Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).

                Other legal requirements

                The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:

                Comply with a legal obligation

                Protect and defend the rights or property of the Company

                Prevent or investigate possible wrongdoing in connection with the Service

                Protect the personal safety of Users of the Service or the public

                Protect against legal liability

                Security of Your Personal Data

                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.

                Detailed Information on the Processing of Your Personal Data

                Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.

                Analytics

                We may use third-party Service providers to monitor and analyze the use of our Service.

                Email Marketing

                We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt- out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send.

                Payments

                We may provide paid products and/or services within the Service. In that case, we may use third-party services for payment processing (e.g. payment processors).

                We will not store or collect Your payment card details. That information is provided directly to Our third-party payment processors whose use of Your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information.

                <br/><br/><span className='title'>Usage, Performance and Miscellaneous</span><br/>
                We may use third-party Service Providers to provide better improvement of our Service.

                GDPR Privacy

                Legal Basis for Processing Personal Data under GDPR

                We may process Personal Data under the following conditions:

                Consent: You have given Your consent for processing Personal Data for one or more specific purposes.

                Performance of a contract: Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.

                Legal obligations: Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.

                Vital interests: Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.

                Public interests: Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.

                Legitimate interests: Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.

                In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.

                Your Rights under the GDPR

                The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.

                You have the right under this Privacy Policy, and by law if You are within the EU, to:

                Request access to Your Personal Data. The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.

                Request correction of the Personal Data that We hold about You. You have the right to have any incomplete or inaccurate information We hold about You corrected.

                Object to processing of Your Personal Data. This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.

                Request erasure of Your Personal Data. You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.

                Request the transfer of Your Personal Data. We will provide to You, or to a third- party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.

                Withdraw Your consent. You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.

                Exercising of Your GDPR Data Protection Rights

                You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.

                You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.

                Children's Privacy

                Our Service does not address anyone under the age of 18. You must be at least 18 years or older in order to use our services, we do not offer our services to minors. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, We take steps to remove that information from Our servers as well as taking active steps to ban this user from our services and website.

                Links to Other Websites

                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.

                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.

                Changes to this Privacy Policy

                We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.

                We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.

                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. 
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

export default Private;