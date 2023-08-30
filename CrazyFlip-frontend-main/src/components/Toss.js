// import React, { useState } from "react";

// const tosses = [
//   {
//     htmlFor: "AstroMan",
//     id: "AstroMan",
//     label: "AstroMan",
//     value: "AstroMan",
//   },
//   {
//     htmlFor: "Alien",
//     id: "Alien",
//     label: "Alien",
//     value: "Alien",
//   },
// ];

// function RadioItem({ htmlFor, id, label, value, onSelect, selected }) {
//   const handleRadioClick = (e) => {
//     console.log(e.target.value);
//     onSelect(value);
//   };

//   return (
//     <div>
//       <input
//         type="radio"
//         id={id}
//         name="toss-option"
//         value={value}
//         className="custom-radio"
//         onChange={handleRadioClick}
//         checked={selected}
//       />
//       <label htmlFor={htmlFor}>{label}</label>
//       <br />
//     </div>
//   );
// }

// const Toss = ({ isTossSelected, setIsTossSelected }) => {
//   const [selectedToss, setSelectedToss] = useState(null);

//   const handleTossSelect = (value) => {
//     setSelectedToss(value);
//     setIsTossSelected(true);
//   };

//   return (
//     <div className="buttons-col">
//       <div className="radio-button sec">
//         {tosses.map((c) => (
//           <RadioItem
//             name="toss-option"
//             htmlFor={c.htmlFor}
//             id={c.id}
//             label={c.label}
//             value={c.value}
//             key={c.id}
//             onSelect={handleTossSelect}
//             selected={selectedToss === c.value && isTossSelected}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Toss;

import React, { useState } from "react";

const tosses = [
  {
    htmlFor: "AstroMan",
    id: "AstroMan",
    label: "AstroMan",
    value: "AstroMan",
  },
  {
    htmlFor: "Alien",
    id: "Alien",
    label: "Alien",
    value: "Alien",
  },
];

function RadioItem({
  htmlFor,
  id,
  label,
  value,
  onSelect,
  selected,
  onTossSelect,
}) {
  const handleRadioClick = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    onSelect(value);
    onTossSelect(selectedValue);
  };

  return (
    <div>
      <input
        type="radio"
        id={id}
        name="toss-option"
        value={value}
        className="custom-radio"
        onChange={handleRadioClick}
        checked={selected}
      />
      <label htmlFor={htmlFor}>{label}</label>
      <br />
    </div>
  );
}

const Toss = ({ isTossSelected, setIsTossSelected, onTossSelect }) => {
  const [selectedToss, setSelectedToss] = useState(null);

  const handleTossSelect = (value) => {
    setSelectedToss(value);
    setIsTossSelected(true);
  };

  return (
    <div className="buttons-col">
      <div className="radio-button sec">
        {tosses.map((c) => (
          <RadioItem
            name="toss-option"
            htmlFor={c.htmlFor}
            id={c.id}
            label={c.label}
            value={c.value}
            key={c.id}
            onSelect={handleTossSelect}
            selected={selectedToss === c.value && isTossSelected}
            onTossSelect={onTossSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Toss;
