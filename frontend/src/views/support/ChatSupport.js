import { Grid, Table, TableContainer, TableRow } from "@mui/material";
import React,{useState, useRef, useEffect} from "react";
import './support.css';

import { TableCell } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableHead } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { getEmail } from "../../localStorage";

function MessageBox (props){
    const [messages, updateMessages] = useState([{message: "WELCOME"}]);
    const [currentMsg,setCurrentMsg] = useState("");
    const [currentBot, setCurrentBot] = useState("None")
    
    // 
    const messageRef = useRef(null);
    useEffect(()=>{
        messageRef.current?.scrollIntoView()
    },[messages])
    //

    function getBotResponse(){
        console.log(currentBot)
        return axios.get("https://qrwib4asrm354mgmiaofbjxqyq0jifzu.lambda-url.us-east-1.on.aws/", 
            {
                params: {
                    message: currentMsg,
                    CurrentBot: currentBot,
                    UserId: getEmail()
                }
            }
        )
    }
    const  updateMessageRow = async (newMessage) => {
        await updateMessages([...messages, newMessage]);
        return true;
    }
    const sendMessageToBot = () =>
    {
            const newMessage = { message: currentMsg } ;
            console.log(currentMsg);
            
            Promise.all([getBotResponse()])
            .then( async function(data) {
                console.log(data[0].data[0]);
                const botMessage ={ message:  currentMsg +  " | " + data[0].data[0].NextMessage.nextMessage};
                console.log(data[0].data[0]);
                if(data[0].data[0].CurrentBot != "None"){
                    setCurrentBot(data[0].data[0].CurrentBot)
                }
                await updateMessageRow(botMessage);
                
                test()
            })

    }

    const test =()=>{
    console.log("MSG", messages);
    }
    return (
            <>
            <Grid>
                <TableContainer>
                    <Table sx={{ minWidth : 65 }} aria-label="simple table"></Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Message</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            { messages.map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell component="th" scope="row">
                                    {row.message}
                                </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </TableContainer>
            </Grid>
            <div ref={messageRef}/>
            <Grid>
                <form style={{'position':'relative','bottom':'0'}}>
                    <TextField id="userMessage" label="Message" variant="outlined"  onChange={(e)=>setCurrentMsg(e.target.value)}/>
                    <Button variant="outlined" onClick={sendMessageToBot}>Send Message</Button>
                </form>
            </Grid>
            </>
    )
}


const ChatSupport = ()=>{
    const [botName,setbotName] = useState("");
    return(
        <div>
            <MessageBox></MessageBox>
        </div>
    )
}

export default ChatSupport;