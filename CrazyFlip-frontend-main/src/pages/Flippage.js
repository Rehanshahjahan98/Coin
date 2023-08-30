import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MainSection from '../components/MainSection';
import Sidebar from '../components/Sidebar';
import '../components/Navbar.css';

const Flippage = (props) => {
  const [option, setOption] = useState('CHMB');

  const handleChange = (e) => {
    const selectedVal = e.target.value;
    setOption(selectedVal);
    props.onChange(selectedVal);
  };

  return (
    <>
      <div>
        <Sidebar />
        <Navbar />
        <div id='right-clicks'>
          <select
            className='select-opts'
            onChange={handleChange}
          >
            <option value='CHMB'>CHMB</option>
            <option value='ERTHA'>ERTHA</option>
            <option value='BVC'>BVC</option>
            <option value='TLM'>TLM</option>
            <option value='BSC'>BSC</option>
          </select>
        </div>
        <MainSection option={option} />
      </div>
    </>
  );
};

export default Flippage;
