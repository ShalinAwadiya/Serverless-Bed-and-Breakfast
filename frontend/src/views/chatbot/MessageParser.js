class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message)
    if(message.toLowerCase().includes("hello")){
      this.actionProvider.greet();
    }
  }
}

export default MessageParser;