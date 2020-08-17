import React, { Component } from 'react'
// import items from "./data";
import Client from "./contenful";



//setup your context 
const RoomContext = React.createContext();
//after creating the context, we now acces to the provider and the consumer


class RoomProvider extends Component {
    state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      type: "all",
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pet: false
    }

    //Get Data from contentful
   getData = async ()=>{
        try{

            let response = await Client.getEntries({
                content_type: "beachResortHotelRooms", 
                // order: "sys.createdAt",
                order: "fields.price"
            });

            let rooms = this.formatData(response.items);
            // console.log(rooms)
            let featuredRooms = rooms.filter(room=> room.featured === true);
            //check the maximum price from the rooms array using spread operator with Math max function
            let maxPrice = Math.max(...rooms.map(item=> item.price));
            // console.log(maxPrice);
            let maxSize = Math.max(...rooms.map(item=> item.size));


            
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
        });


        }catch(error){
            console.log(error)
        }
    }



    componentDidMount(){
        //get data from contentful
        this.getData();

        //get LOCAL DATA FROM MY APP
        // let rooms = this.formatData(items);
        // // console.log(rooms)
        // let featuredRooms = rooms.filter(room=> room.featured === true);
        // //check the maximum price from the rooms array using spread operator with Math max function
        // let maxPrice = Math.max(...rooms.map(item=> item.price));
        // // console.log(maxPrice);
        // let maxSize = Math.max(...rooms.map(item=> item.size));

        // this.setState({
        //     rooms,
        //     featuredRooms,
        //     sortedRooms: rooms,
        //     loading: false,
        //     price: maxPrice,
        //     maxPrice,
        //     maxSize
        // });

       

    }
    //get Room
    getRoom = (slug)=>{
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    formatData(items){
        let tempItems = items.map((item)=>{
            let id = item.sys.id
            let images = item.fields.images.map(image=> image.fields.file.url);
            let room = {...item.fields, images, id};
            return room;
        });
        return tempItems;
    }

    handleChange = event=>{
        const target = event.target;       
        const value = target.type === "checkbox" ? target.checked: target.value;
        const name = event.target.name;
        // console.log(name, value)
        //this setState runs async way with the callback function
        this.setState({
            [name]: value
        }, this.filterRooms)

    }

    filterRooms = ()=>{
       let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets} = this.state;

       //we use spread operator to get all properties in all the rooms
       let tempRooms = [...rooms];
       //transform value
       capacity = parseInt(capacity);
       price = parseInt(price);
       //filter by type
       if(type !== "all"){
           //return only the rooms that match the type dat we get now
           tempRooms = tempRooms.filter(room => room.type === type)
       }
       //filter by capacity
       if(capacity !== 1 ){
        //return only the rooms that match the type dat we get now
        tempRooms = tempRooms.filter(room => room.capacity >= capacity)
    }

    //filter by price
    if(price >= 0 ){
        //if ur price is less than the current price we have in the range, then the rooms will be display
        tempRooms = tempRooms.filter(room => room.price <= price)
    }
    //filter by room
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
    //filter by breakfast
    if(breakfast){
        tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if(pets){
        tempRooms = tempRooms.filter(room => room.pets === true);
    }




       //set the sortedRoom from the state to the tempR
       this.setState({
           sortedRooms: tempRooms
       })



    }






    render() {
        return (
            //Provider will wrap the component tree tobe connected
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//create a consumer component
const RoomConsumer = RoomContext.Consumer;

//Higher order component
//this function return anoda function that is hwy called higher order component
//we can nameit whatever we want
export function withRoomConsumer(Component){
        return  function  ComsumerWrapper(props) {
            //we still need to follow the rules of consumer wrapper in returning the value 
            //the props might what the component will have or might not have
            return<RoomConsumer>
                
                {value => <Component  {...props} context={value} /> }
                
            </RoomConsumer>
        } 
}







export {RoomProvider, RoomConsumer, RoomContext}