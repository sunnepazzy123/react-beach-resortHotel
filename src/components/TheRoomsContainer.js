
import React from 'react';
import RoomsFilter from "./RoomFilter";
import RoomsList from "./RoomList";
import {withRoomConsumer} from "../context";
//we are using the consumer context for this functional operation
import Loading from "./Loading";

//another way to accessing the context using high order component
function TheRoomsContainer({context}){
    const {loading, sortedRooms, rooms} = context;

    if(loading){ return <Loading />; }
        // console.log(rooms)
    return (
        <div>   
        <RoomsFilter rooms={rooms} />
        <RoomsList rooms={sortedRooms} />
        </div>
    );
   



}




export default withRoomConsumer(TheRoomsContainer)




//One of the methods to access the global bucket state




// import React from 'react';
// import RoomsFilter from "./RoomFilter";
// import RoomsList from "./RoomList";
// import {RoomConsumer} from "../context";
// //we are using the consumer context for this functional operation
// import Loading from "./Loading";


// export default function TheRoomsContainer() {
//     return (
//         //In other to access this information we need the perform the function here
//         <RoomConsumer>
//             {
//                 //we are accessing the store and the value here from the copntext.js file
//                 (value)=>{
//                     // console.log(value)
//                     const {loading, sortedRooms, rooms} = value;
//                         if(loading){ return <Loading />; }
//                     return (
//                         <div>
//                          hello from rooms container
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                         </div>
//                     );
//                 }
//             }
//         </RoomConsumer>
     
//     )
// }
