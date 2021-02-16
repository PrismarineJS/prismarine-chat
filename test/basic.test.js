/* eslint-env jest */
const { ChatMessage, Message, convertColorCodes } = require('../')('1.16')

describe('ChatMessage class works', () => {
  test('Parsing a chat message', () => {
    const msg = new ChatMessage({ text: 'Example chat message' })
    expect(msg.toString()).toEqual('Example chat message')
  })
  test('Parsing message that uses language file & numbers', () => {
    const msg = new ChatMessage({ italic: true, color: 'gray', translate: 'chat.type.admin', with: [{ insertion: 'ripwhitescrolls', clickEvent: { action: 'suggest_command', value: '/tell ripwhitescrolls ' }, hoverEvent: { action: 'show_entity', contents: { type: 'minecraft:player', id: '9d9e9257-b812-4332-8426-5e9a0d707392', name: { text: 'ripwhitescrolls' } } }, text: 'ripwhitescrolls' }, { translate: 'commands.clear.success.multiple', with: [256, 2] }] })
    // test as a string
    expect(msg.toString()).toEqual('[ripwhitescrolls: Removed 256 items from 2 players]')
    // test as ansi
    expect(msg.toAnsi()).toEqual('\u001b[37m\u001b[3m[ripwhitescrolls\u001b[0m: Removed 256\u001b[0m items from 2\u001b[0m players]\u001b[0m')
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
    const exampleMessage = new Message()
      .setColor('red')
      .setBold(true)
      .setItalic(true)
      .setText('r')
    const correctMessage = { color: 'red', bold: true, italic: true }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
  test('basic message with component & translate', () => {
    // format ingame: "<U9G> Hello!"
    const exampleMessage = new Message()
      .setTranslate('chat.type.text')
      .addTranslateInsertion(new Message().setText('U9G'))
      .addTranslateInsertion(new Message().setText('Hello!'))
    const correctMessage = { translate: 'chat.type.text', with: [{ text: 'U9G' }, { text: 'Hello!' }] }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
})

describe('using ChatMessage to parse messages from builder', () => {
  test('having an array in a .with', () => {
    const exampleMessage = new Message()
      .setTranslate('chat.type.text')
      .addTranslateInsertion(new Message().setText('Notch'))
      .addTranslateInsertion([
        new Message().setColor('red').setBold(true).setText('Hello '),
        new Message().setColor('white').setItalic(true).setText('world!')
      ])
    const messageObj = new ChatMessage(exampleMessage)
    const expected = '<Notch\u001b[0m> \u001b[91m\u001b[1mHello \u001b[0m\u001b[97m\u001b[3mworld!\u001b[0m\u001b[0m'
    expect(messageObj.toAnsi()).toEqual(expected)
  })
})

describe('test using chat color converter', () => {
  test('youtube example', () => {
    const correctAnsi = '\u001b[37m[\u001b[0m\u001b[91m\u001b[0m\u001b[91m\u001b[1mYou\u001b[0m\u001b[97m\u001b[1mTube\u001b[0m\u001b[97m\u001b[1m\u001b[0m\u001b[97m\u001b[1m\u001b[0m\u001b[37m]\u001b[0m\u001b[0m'
    const generatedMessage = new ChatMessage(convertColorCodes('&7[&c&lYou&fTube&r&7]')).toAnsi()
    expect(generatedMessage).toEqual(correctAnsi)
  })
})
