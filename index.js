function loader (version) {
  const ChatMessage = require('./ChatMessage.js')(version)
  const { MessageBuilder, convertColorCodes } = require('./MessageBuilder.js')(version)
  return { ChatMessage, MessageBuilder, convertColorCodes }
}

module.exports = loader
