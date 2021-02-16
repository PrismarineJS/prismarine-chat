/* eslint-env jest */
const { ChatMessage, Message, MessageComponent } = require('../')('1.16')

describe('ChatMessage class works', () => {
  test('Parsing a chat message', () => {
    const msg = new ChatMessage({ text: 'Example chat message' })
    expect(msg.toString()).toBe('Example chat message')
  })
  test('Parsing message that uses language file & numbers', () => {
    const msg = new ChatMessage({ italic: true, color: 'gray', translate: 'chat.type.admin', with: [{ insertion: 'ripwhitescrolls', clickEvent: { action: 'suggest_command', value: '/tell ripwhitescrolls ' }, hoverEvent: { action: 'show_entity', contents: { type: 'minecraft:player', id: '9d9e9257-b812-4332-8426-5e9a0d707392', name: { text: 'ripwhitescrolls' } } }, text: 'ripwhitescrolls' }, { translate: 'commands.clear.success.multiple', with: [256, 2] }] })
    // test as a string
    expect(msg.toString()).toBe('[ripwhitescrolls: Removed 256 items from 2 players]')
    // test as ansi
    expect(msg.toAnsi()).toBe('\u001b[37m\u001b[3m[ripwhitescrolls\u001b[0m: Removed 256\u001b[0m items from 2\u001b[0m players]\u001b[0m')
    // test clickEvent
    expect(msg.with[0].clickEvent.action).toBe('suggest_command')
    expect(msg.with[0].clickEvent.value).toBe('/tell ripwhitescrolls ')
    // test numbers
    expect(msg.with[1].with[0].text).toBe(256)
    expect(msg.with[1].with[1].text).toBe(2)
  })
})

describe('Message builder works', () => {
  test('basic test message', () => {
    const exampleMessage = new Message()
      .setColor('red')
      .setBold(true)
      .setItalic(true)
    const correctMessage = { color: 'red', bold: true, italic: true }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
  test('basic message with component & translate', () => {
    const exampleMessage = new Message()
      .setTranslate('chat.type.text')
      .addComponent(new MessageComponent().setText('U9G'))
      .addComponent(new MessageComponent().setText('Hello!'))
    const correctMessage = { translate: 'chat.type.text', with: [{ text: 'U9G' }, { text: 'Hello!' }] }
    expect(exampleMessage).toMatchObject(correctMessage)
  })
})
