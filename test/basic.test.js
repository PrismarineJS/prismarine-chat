/* eslint-env mocha */

const ChatMessage = require('prismarine-chat')('1.16')
const expect = require('expect').default

it('Parsing a chat message', () => {
  const msg = new ChatMessage({ text: 'Example chat message' })
  expect(msg.toString()).toBe('Example chat message')
})
it('Parsing message that uses language file & numbers', () => {
  const msg = new ChatMessage({
    italic: true,
    color: 'gray',
    translate: 'chat.type.admin',
    with: [{
      insertion: 'ripwhitescrolls',
      clickEvent: {
        action: 'suggest_command',
        value: '/tell ripwhitescrolls '
      },
      hoverEvent: {
        action: 'show_entity',
        contents: {
          type: 'minecraft:player',
          id: '9d9e9257-b812-4332-8426-5e9a0d707392',
          name: {
            text: 'ripwhitescrolls'
          }
        }
      },
      text: 'ripwhitescrolls'
    }, {
      translate: 'commands.clear.success.multiple',
      with: [256, 2]
    }]
  })
  // test as a string
  expect(msg.toString()).toBe('[ripwhitescrolls: Removed 256 items from 2 players]')
  // test as motd
  expect(msg.toMotd()).toBe('§7§o[§7§oripwhitescrolls§r§7§o: §7§oRemoved §7§o256§r§7§o items from §7§o2§r§7§o players§r§7§o]')
  // test as ansi
  expect(msg.toAnsi()).toBe('\u001b[0m\u001b[37m\u001b[3m[\u001b[37m\u001b[3mripwhitescrolls\u001b[0m\u001b[37m\u001b[3m: \u001b[37m\u001b[3mRemoved \u001b[37m\u001b[3m256\u001b[0m\u001b[37m\u001b[3m items from \u001b[37m\u001b[3m2\u001b[0m\u001b[37m\u001b[3m players\u001b[0m\u001b[37m\u001b[3m]\u001b[0m')
  // test clickEvent
  expect(msg.with[0].clickEvent.action).toBe('suggest_command')
  expect(msg.with[0].clickEvent.value).toBe('/tell ripwhitescrolls ')
  // test numbers
  expect(msg.with[1].with[0].text).toBe(256)
  expect(msg.with[1].with[1].text).toBe(2)
})
it('Parsing a chat message which is an array', () => {
  const msg = new ChatMessage([{ text: 'Example chat ' }, { text: 'message' }])
  expect(msg.toString()).toBe('Example chat message')
})
it('Chat Message with a single hex color', () => {
  const msg = new ChatMessage({ text: 'uwu', color: '#FF0000' })
  expect(msg.toMotd()).toBe('§#FF0000uwu')
  expect(msg.toAnsi()).toBe('\u001b[0m\u001b[38;2;255;0;0muwu\u001b[0m')
})
it('Chat Message with multiple hex colors', () => {
  const msg = new ChatMessage(['', { text: 'uwu ', color: '#FF0000' }, { text: 'owo ', color: '#0000FF' }, { text: 'uwu', color: '#FF0000' }])
  expect(msg.toMotd()).toBe('§#FF0000uwu §#0000FFowo §#FF0000uwu')
  expect(msg.toAnsi()).toBe('\u001b[0m\u001b[38;2;255;0;0muwu \u001b[38;2;0;0;255mowo \u001b[38;2;255;0;0muwu\u001b[0m')
})
it('parse1', () => {
  const msg = new ChatMessage({ translate: 'chat.type.text', with: [{ text: 'IM_U9G', color: 'aqua' }, { text: 'yo sup', color: 'green' }] })
  expect(msg.toMotd()).toBe('<§bIM_U9G§r> §ayo sup§r')
  console.log(msg.toAnsi())
  expect(msg.toAnsi()).toBe('\u001b[0m<\u001b[96mIM_U9G\u001b[0m> \u001b[92myo sup\u001b[0m\u001b[0m')
})

it('parse2', () => {
  const msg = new ChatMessage({ color: 'blue', translate: 'chat.type.text', with: [{ text: 'IM_U9G', color: 'aqua' }, { text: 'yo sup', color: 'green' }] })
  expect(msg.toMotd()).toBe('§9<§bIM_U9G§r§9> §ayo sup§r§9')
  console.log(msg.toAnsi())
  expect(msg.toAnsi()).toBe('\u001b[0m\u001b[94m<\u001b[96mIM_U9G\u001b[0m\u001b[94m> \u001b[92myo sup\u001b[0m\u001b[94m\u001b[0m')
})
