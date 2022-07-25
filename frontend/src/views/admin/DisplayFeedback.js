import React,{ useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
const DisplayFeedback = ()=>{
    const [feedback,setFeedback] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`https://2dmzibtwugl5gv62xbeklj2fl40srrcq.lambda-url.us-east-1.on.aws/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        }).then(response=>response.json()).then(result=>setFeedback(result))
    })
    return (
        <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">USER ID</th>
          <th scope="col">FEEDBACK</th>
          <th scope="col">POLARITY</th>
        </tr>
      </thead>
      <tbody>
        {feedback.map((item,index) => {
            console.log("item")
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.userId}</td>
              <td>{item.feedback}</td>
              <td>{item.polarity}</td>     
            </tr>
          );
        })}
      </tbody>
    </table>
    )
}

export default DisplayFeedback;