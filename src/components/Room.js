import React from 'react'
import {Link} from"react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";

export default function Room({room}) {
    // console.log(room)
    const {name, slug, id, images, price} = room;
    return (
        <article className="room">
            <div className="img-container">
                <img src={ images[0] || defaultImg }  alt="single room" />
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>per night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">Features</Link>
            </div>
            <p className="room-info">{name}</p>
        </article>
    );
}
//Mechanism to check the prop type in react
Room.propTypes = {
    //Check if the object have a particular properties in it. using the Shape method to check the object.
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number.isRequired
    })
}