const { MessageBuilder, ChatMessage } = require('../')('1.16')

const exampleMessage = new MessageBuilder()
  .setTranslate('chat.type.text')
  .addTranslateInsertion(new MessageBuilder().setText('Notch'))
  .addTranslateInsertion([
    new MessageBuilder().setColor('red').setBold(true).setText('Hello '),
    new MessageBuilder().setColor('white').setItalic(true).setText('world!')
  ])

// json format for direct use in minecraft (ie: chat packet or /tellraw @a OUTPUT)
console.log(JSON.stringify(exampleMessage))

const message = new ChatMessage(exampleMessage)

console.log(message.toString()) // to string
console.log(message.toAnsi()) // to string (with console coloring)
