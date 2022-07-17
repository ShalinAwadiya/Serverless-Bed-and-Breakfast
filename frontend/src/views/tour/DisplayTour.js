import React from "react";
import TourCard from "./TourCard";

const DisplayTour =()=>{
    const data = [
        {
            tourName:'dolphin show',
            price:200,
            url:'https://images.unsplash.com/photo-1532639766504-227d1fd0f2ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9scGhpbiUyMHNob3d8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
        },
        {
            tourName:'city tour',
            price:300,
            url:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eSUyMHRvdXJ8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60'
        },
        {
            tourName:'Theme park',
            price:150,
            url:'https://images.unsplash.com/photo-1611745179863-e123a89795fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'   
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