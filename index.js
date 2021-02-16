function loader (version) {
  const ChatMessage = require('./ChatMessage.js')(version)
  const { Message, convertColorCodes } = require('./builder.js')(version)
  return { ChatMessage, Message, convertColorCodes }
}

module.exports = loader
