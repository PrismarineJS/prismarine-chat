/* eslint-env jest */
const ChatMessage = require('prismarine-chat')('1.16')
test('Parsing a chat message', () => {
  const msg = new ChatMessage({ text: 'Example chat message' })
  expect(msg.toString()).toBe('Example chat message')
})
test('Parsing message that uses language file & numbers', () => {
  const msg = new ChatMessage({ italic: true, color: 'gray', translate: 'chat.type.admin', with: [{ insertion: 'ripwhitescrolls', clickEvent: { action: 'suggest_command', value: '/tell ripwhitescrolls ' }, hoverEvent: { action: 'show_entity', contents: { type: 'minecraft:player', id: '9d9e9257-b812-4332-8426-5e9a0d707392', name: { text: 'ripwhitescrolls' } } }, text: 'ripwhitescrolls' }, { translate: 'commands.clear.success.multiple', with: [256, 2] }] })
  // test as a string
  expect(msg.toString()).toBe('[ripwhitescrolls: Removed 256 items from 2 players]')
  // test as ansi
  expect(msg.toAnsi()).toBe('\u001b[37m\u001b[3m[ripwhitescrolls: Removed 256 items from 2 players]\u001b[0m')
  // test as motd
  expect(msg.toMotd()).toBe('§7§o[ripwhitescrolls: Removed 256 items from 2 players]')
  // test clickEvent
  expect(msg.with[0].clickEvent.action).toBe('suggest_command')
  expect(msg.with[0].clickEvent.value).toBe('/tell ripwhitescrolls ')
  // test numbers
  expect(msg.with[1].with[0].text).toBe(256)
  expect(msg.with[1].with[1].text).toBe(2)
})
test('Parsing a chat message which is an array', () => {
  const msg = new ChatMessage([{ text: 'Example chat ' }, { text: 'message' }])
  expect(msg.toString()).toBe('Example chat message')
})
test('Chat Message with a single hex color', () => {
  const msg = new ChatMessage({ text: 'uwu', color: '#FF0000' })
  expect(msg.toMotd()).toBe('§#FF0000uwu')
  expect(msg.toAnsi()).toBe('\u001B[38;2;255;0;0muwu\u001B[0m')
})
test('Chat Message with multiple hex colors', () => {
  const msg = new ChatMessage(['', { text: 'uwu ', color: '#FF0000' }, { text: 'owo ', color: '#0000FF' }, { text: 'uwu', color: '#FF0000' }])
  expect(msg.toMotd()).toBe('§#FF0000uwu §#0000FFowo §#FF0000uwu')
  expect(msg.toAnsi()).toBe('\u001B[38;2;255;0;0muwu \u001B[38;2;0;0;255mowo \u001B[38;2;255;0;0muwu\u001B[0m')
})
