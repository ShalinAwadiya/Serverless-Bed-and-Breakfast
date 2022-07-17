import React from "react";
import TourCard from "./TourCard";

const DisplayTour =()=>{
    const data = [
        {
            tourName:'dolphin show',
            price:200
        },
        {
            tourName:'city tour',
            price:300
        },
        {
            tourName:'Theme park',
            price:150   
        },
    ]
    return (
        <div style={{"display":"flex","justifyContent":"space-evenly","flexWrap":"wrap"}}>
        {data.map((dish,index) => {
            return <TourCard key={index} data={dish}/>;
        })}
    </div>
    )
}

export default DisplayTour;