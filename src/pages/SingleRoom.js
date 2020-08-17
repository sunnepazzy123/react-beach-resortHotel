import React, { Component } from 'react'
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import {Link} from "react-router-dom";
import {RoomContext} from "../context";
import StyledHero from "../components/StyleHero";
//React router gives us a nicer way to access a prop
//We are accessing the props here through the Link tag from react router.
//the props here is been passed by react router not from the App component
//the way to access the props should be different
export default class SingleRoom extends Component {
    //To Access the context we use
    static contextType = RoomContext;
    constructor(props){
        super(props);
        // console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg

        }
    }
    //we can also use this
    // componentDidMount(){
    //     console.log(this.props)     
    // }


    render() {

        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        // console.log(room)
        if(!room){
            return <div className="error">
                <h3>No such room cound be found...</h3>
                <Link to="/rooms" className="btn-primary">Back to room</Link>
            </div>
        }

        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        //i destruct the array images, so i target and set the first element in the array as mainImg
        //while i have the rest images as ...defaultImg
        //i can also choose to map images array but i chose destruct the array
        const [mainImg, ...defaultImg] = images;
        // console.log(mainImg)

        return (
         <>
           <StyledHero img={mainImg || this.state.defaultBcg} >
               <Banner title={`${name} room`}>
                   <Link to="/rooms" className="btn-primary">
                       back to rooms
                   </Link>
               </Banner>
           </StyledHero>

            <section className="single-room">
                <div className="single-room-images">
                    {defaultImg.map((item, index)=>{
                      return <img key={index} src={item} alt={name} />
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price : ${price}</h6>
                        <h6>size : ${size} SQFT</h6>
                        <h6>
                            max capacity : {
                                capacity > 1 ? `${capacity} people` : `${capacity} person`
                            }
                        </h6>
                        <h6> {pets ? "pets" : "no pet allowed"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    {extras.map((item, index)=>{
                        return <li key={index}>-{item}</li>
                    })}
                </ul>
            </section>






        </>
        )
    }
}
