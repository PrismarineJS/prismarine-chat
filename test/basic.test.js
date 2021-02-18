/* eslint-env jest */
const { ChatMessage, MessageBuilder, convertColorCodes } = require('../')('1.16')

describe('ChatMessage class works', () => {
  test('Parsing a chat message', () => {
    const msg = new ChatMessage({ text: 'Example chat message' })
    expect(msg.toString()).toEqual('Example chat message')
  })
  test('Parsing message that uses language file & numbers', () => {
    const msg = new ChatMessage({ italic: true, color: 'gray', translate: 'chat.type.admin', with: [{ insertion: 'ripwhitescrolls', clickEvent: { action: 'suggest_command', value: '/tell ripwhitescrolls ' }, hoverEvent: { action: 'show_entity', contents: { type: 'minecraft:player', id: '9d9e9257-b812-4332-8426-5e9a0d707392', name: { text: 'ripwhitescrolls' } } }, text: 'ripwhitescrolls' }, { translate: 'commands.clear.success.multiple', with: [256, 2] }] })
    // test as a string
    expect(msg.toString()).toEqual('[ripwhitescrolls: Removed 256 items from 2 players]')
    // test as motd
    expect(msg.toMotd()).toEqual('§7§o[§7§oripwhitescrolls§7§o: §7§oRemoved §7§o256§7§o items from §7§o2§7§o players§7§o]')
    // test as ansi
    expect(msg.toAnsi()).toEqual('\u001b[37m\u001b[3m[\u001b[37m\u001b[3mripwhitescrolls\u001b[37m\u001b[3m: \u001b[37m\u001b[3mRemoved \u001b[37m\u001b[3m256\u001b[37m\u001b[3m items from \u001b[37m\u001b[3m2\u001b[37m\u001b[3m players\u001b[37m\u001b[3m]\u001b[0m')
    // test clickEvent
    expect(msg.with[0].clickEvent.action).toEqual('suggest_command')
    expect(msg.with[0].clickEvent.value).toEqual('/tell ripwhitescrolls ')
    // test numbers
    expect(msg.with[1].with[0].text).toEqual(256)
    expect(msg.with[1].with[1].text).toEqual(2)
  })
})

describe('Message builder works', () => {
  test('basic test message', () => {
    // format ingame: "r"
    const exampleMessage = new MessageBuilder()
      .setColor('red')
      .setBold(true)
      .setItalic(true)
      .setText('r')
    const correctMessage = { color: 'red', bold: true, italic: true }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
  test('basic message with component & translate', () => {
    // format ingame: "<U9G> Hello!"
    const exampleMessage = new MessageBuilder()
      .setTranslate('chat.type.text')
      .addTranslateInsertion(new MessageBuilder().setText('U9G'))
      .addTranslateInsertion(new MessageBuilder().setText('Hello!'))
    const correctMessage = { translate: 'chat.type.text', with: [{ text: 'U9G' }, { text: 'Hello!' }] }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
})

describe('using ChatMessage to parse messages from builder', () => {
  test('having an array in a .with', () => {
    const exampleMessage = new MessageBuilder()
      .setTranslate('chat.type.text')
      .addTranslateInsertion(new MessageBuilder().setText('Notch'))
      .addTranslateInsertion([
        new MessageBuilder().setColor('red').setBold(true).setText('Hello '),
        new MessageBuilder().setColor('white').setItalic(true).setText('world!')
      ])
    const messageObj = new ChatMessage(exampleMessage)
    expect(messageObj.toMotd()).toEqual('<Notch> §c§lHello §f§oworld!')
    expect(messageObj.toAnsi()).toEqual('<Notch> \u001b[91m\u001b[1mHello \u001b[97m\u001b[3mworld!\u001b[0m')
  })
})

describe('test using chat color converter', () => {
  test('youtube example', () => {
    const generatedMessage = new ChatMessage(convertColorCodes('&7[&c&lYou&fTube&7]'))
    expect(generatedMessage.toMotd()).toEqual('§7[§c§lYou§fTube§7]')
    expect(generatedMessage.toAnsi()).toEqual('\u001b[37m[\u001b[91m\u001b[1mYou\u001b[97mTube\u001b[37m]\u001b[0m')
  })

  test('youtube example json', () => {
    const a = new ChatMessage(JSON.parse('{"color":"gray","text":"","extra":[{"text":"["},{"bold":true,"text":"","extra":[{"color":"red","text":"You"},{"color":"white","text":"Tube","bold":false}]},{"text":"]"}]}'))
    const b = new ChatMessage(convertColorCodes('&7[&c&lYou&fTube&7]'))
    expect(a.toMotd()).toEqual(b.toMotd())
  })
})
