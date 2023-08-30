import React, { useState } from 'react';

const coins = [
  {
    htmlFor: '2',
    id: '2',
    label: '2',
    value: '2',
  },
  {
    htmlFor: '10',
    id: '10',
    label: '10',
    value: '10',
  },
  {
    htmlFor: '20',
    id: '20',
    label: '20',
    value: '20',
  },
  {
    htmlFor: '40',
    id: '40',
    label: '40',
    value: '40',
  },
  {
    htmlFor: '60',
    id: '60',
    label: '60',
    value: '60',
  },
];

function RadioItem({ htmlFor, id, label, value, onSelect, selected }) {
  const handleRadioClick = () => {
    onSelect(value);
  };

  return (
    <div>
      <input
        type='radio'
        id={id}
        name='coin-option'
        value={value}
        className='custom-radio'
        onChange={handleRadioClick}
        checked={selected}
      />
      <label htmlFor={htmlFor}>{label}</label>
      <br />
    </div>
  );
}

const Coin = ({
  option,
  isCoinSelected,
  setIsCoinSelected,
  onBetAmountChange,
}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleCoinSelect = (value) => {
    setSelectedCoin(value);
    setIsCoinSelected(true);
    onBetAmountChange(value);
  };
  // console.log('🚀 ~ file: Coin.js:91 ~ option:', option);
  return (
    <div className='buttons-col'>
      <div className='radio-button'>
        {coins.map((c) => (
          <RadioItem
            name='coin-option'
            htmlFor={c.htmlFor}
            id={c.id}
            label={`${c.label} ${option}`}
            value={c.value}
            key={c.id}
            onSelect={handleCoinSelect}
            selected={selectedCoin === c.value && isCoinSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default Coin;
