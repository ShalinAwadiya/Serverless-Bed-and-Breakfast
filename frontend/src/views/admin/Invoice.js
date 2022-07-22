import React,{useEffect,useState} from "react";
import { useLocation } from "react-router-dom";
const Invoice = () => {
  const location = useLocation();
  const item = location.state.invoice;
  const index = location.state.index;
  const [total,setTotal] = useState(0);
  useEffect(()=>{
    console.log(location.state)
    item.food.forEach(element => {
        setTotal(old => old+(element.quantity * element.price))
    });
  },[])
  return (
    <div class="card">
      <div class="card-body mx-4">
        <div class="container">
          <p class="my-5 mx-5" style={{ "font-size": "30px" }}>
            Thank for your purchase
          </p>
          <div class="row">
            <ul class="list-unstyled">
              <li class="text-black">{item.email}</li>
              <li class="text-muted mt-1">
                <span class="text-black">Invoice</span> #{index+1}
              </li>
              <li class="text-black mt-1">{item.date}</li>
            </ul>
            <hr />
            {item.food.map((element) => {
              return (
                <>
                  <div class="col-xl-10">
                    <p>{element.name}</p>
                  </div>
                  <div class="col-xl-2">
                    <p class="float-end">{element.price}</p>
                  </div>
                </>
              );
            })}

            
            <hr />
          
             <hr style={{ border: "2px solid black" }} />
          </div>
          <div class="row text-black">
            <div class="col-xl-12">
              <p class="float-end fw-bold">{total}</p>
            </div>
            <hr style={{ border: "2px solid black" }} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Invoice;
