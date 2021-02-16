function loader (version) {
  const ChatMessage = require('./ChatMessage.js')(version)
  const { Message, MessageComponent } = require('./builder.js')(version)
  return { ChatMessage, Message, MessageComponent }
}

module.exports = loader
