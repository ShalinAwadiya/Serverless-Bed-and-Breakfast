import React, { useState } from "react";
import LexChat from "react-lex-plus";


const ChatSupport = () => {
    const [botName, setbotName] = useState("");
    return (
        <LexChat
            botName={botName}
            IdentityPoolId={"sb"}
            placeholder="Ask to support chat"
            backgroundColor="#ffffff"
            height="430px"
            region="us-east-1"
            headerText="B&B Support Bot"
            headerStyle={{ backgroundColor: "#ABD5D9", fontSize: "30px" }}
            greeting={
                "Hello, how can I help? You can say things like 'help' to get more info"
            }
        />
    )
}

export default ChatSupport;
