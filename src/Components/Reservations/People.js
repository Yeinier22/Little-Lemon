import React from "react";

const people=["1 person", "2 people","3 people","4 people","5 people","6 people","7 people","8 people","9 people","10 people"]

const People=({onChange, selectedValue})=>{

const handlechange=(e)=>{
    const newValue=e.target.value;
    onChange(newValue);
}

    return (
   <div className="selector-container">
            <select className="selector people" value={selectedValue} onChange={handlechange}>
                {people.map((option, index)=>(
                    <option key={index} value={option} label={option}/>
                ))}
            </select>
   </div>
    )
}


export default People;