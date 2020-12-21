import React, {useState, useEffect} from 'react';



const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = c_Id => () => {
    const currentCategoryId = checked.indexOf(c_Id);
    const newCheckedCategoryId = [...checked];
    // if the cureently checked was not in the checked state -> push
    // else pull / take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c_Id)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
    // console.log(newCheckedCategoryId)
  }

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input onChange = { handleToggle(c._id) } type="checkbox" className="form-check-input"/>
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
