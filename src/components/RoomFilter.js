import React from 'react'
//this is the useContext way to handle/access the context
import {useContext} from "react";
import {RoomContext} from "../context";
import Title from "../components//Title";

//get all unique values using this function
const getUnique = (items, value)=>{
    //The set class only accept the unique value
    return [...new Set(items.map(item => item[value]))]
}
export default function RoomFilter({rooms}) {
    // console.log(rooms, "rooms here")
    //this is the way to acces the context after import
    const context = useContext(RoomContext);
    // console.log(context)
    const {handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;
    //the getUniques will take the array of what u wanna check as well as the string value
    //get  uniques type
    let types = getUnique(rooms, "type");
    // console.log(types)
    //add all using spread operator
    types = ["all", ...types];
    // console.log(types)
    //map to jsx
    types = types.map((item, index)=>{
        return <option value={item} key={index}>{item}</option>
    });

    let people = getUnique(rooms, "capacity");
    people = people.map((item,index)=>{
        return <option key={index} value={item}>{item}</option>
    });



    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>

                </div>
                {/* end of select type */}
                {/* guest */}
                <div className="form-group">
                    <label htmlFor="capacity">Guest</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>

                </div>
                {/* end of guest */}
                {/* room price */}
                <div className="form-group">
                    <label html="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price}
                    onChange={handleChange} className="form-control" />
                </div>
                {/*end of room price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size-inputs">room size</label>
                  
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange}
                        className="size-input" />
                       
                         <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange}
                        className="size-input" />
                
                </div>
                {/* end of size */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extras">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="single-extras">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                        <label htmlFor="pets">pet</label>
                    </div>
                </div>
                {/* end of extras */}

            </form>
        </section>
    )
}
