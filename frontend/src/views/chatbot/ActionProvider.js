class ActionProvider {
   constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  greet = () =>{
    const message = this.createChatBotMessage("Hello there!");
    this.addToState(message);
  }

  addToState = (message)=>{
    this.setState((prevState) =>({
      ...prevState,
      messages:[...prevState.messages,message]
    }))
  }
}

export default ActionProvider;