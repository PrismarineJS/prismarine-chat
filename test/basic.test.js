/* eslint-env mocha */
const expect = require('expect').default
const assert = require('assert')

describe('Parsing chat on 1.16', function () {
  const ChatMessage = require('prismarine-chat')('1.16')
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

  it('Parsing a message with a translation key that does not exist in the language', () => {
    const msg = new ChatMessage({ translate: 'Hello, %s!', with: ['world'] })
    expect(msg.toString()).toBe('Hello, world!')
  })

  it('Parsing a message with an invalid translation', () => {
    const msg = new ChatMessage({ translate: 'translation.test.invalid', with: ['something'] })
    expect(msg.toString()).toBe('hi %')
  })

  it('Parsing a translate message with missing elements in with', () => {
    const msg = new ChatMessage({ translate: '%2$s %1$s', with: ['a'] })
    expect(msg.toString()).toBe(' a')
  })

  it('Parsing a translate message without with', () => {
    const msg = new ChatMessage({ translate: '%2$s %1$s' })
    expect(msg.toString()).toBe(' ')
  })

  it('can format to HTML', () => {
    const msg = new ChatMessage({ color: 'blue', translate: 'chat.type.text', with: [{ text: 'IM_U9G', color: 'aqua' }, { text: 'yo sup', color: 'green' }], extra: [{ text: 'test', color: '#ff0000', strikethrough: true }] })
    assert.strictEqual(msg.toHTML(), '<span style="color:#5555FF">&lt;<span style="color:#55FFFF">IM_U9G</span>&gt; <span style="color:#55FF55">yo sup</span><span style="color:rgb(255,0,0);text-decoration:line-through">test</span></span>')
    assert.strictEqual(msg.toHTML(undefined, undefined, ['color']), '<span style="color:#5555FF">&lt;<span style="color:#55FFFF">IM_U9G</span>&gt; <span style="color:#55FF55">yo sup</span><span style="color:rgb(255,0,0)">test</span></span>')
  })

  it('Parsing a translate message with fallback when translation exists', () => {
    const msg = new ChatMessage({ translate: 'chat.type.text', fallback: 'fallback text', with: ['Player', 'Hello'] })
    expect(msg.toString()).toBe('<Player> Hello')
  })

  it('Parsing a translate message with fallback when translation does not exist', () => {
    const msg = new ChatMessage({ translate: 'non.existent.key', fallback: 'fallback text' })
    expect(msg.toString()).toBe('fallback text')
  })

  it('Parsing a translate message with fallback and with parameters when translation does not exist', () => {
    const msg = new ChatMessage({ translate: 'non.existent.key', fallback: 'Hello %s!', with: ['World'] })
    expect(msg.toString()).toBe('Hello World!')
  })

  it('Fallback works with different output formats', () => {
    const msg = new ChatMessage({ translate: 'non.existent.key', fallback: 'fallback text', color: 'red' })
    expect(msg.toString()).toBe('fallback text')
    expect(msg.toMotd()).toBe('§cfallback text')
    expect(msg.toAnsi()).toBe('\u001b[0m\u001b[91mfallback text\u001b[0m')
    expect(msg.toHTML()).toBe('<span style="color:#FF5555">fallback text</span>')
  })

  it('Fallback is ignored when text property is present', () => {
    const msg = new ChatMessage({ text: 'main text', fallback: 'fallback text' })
    expect(msg.toString()).toBe('main text')
  })
})

describe('Client-side chat formatting', function () {
  const sender = { insertion: 'Player', clickEvent: { action: 'suggest_command', value: '/tell Player ' }, hoverEvent: { action: 'show_entity', contents: { type: 'minecraft:player', id: '00000000-00000000-00000000-00000000', name: { text: 'Player' } } }, text: 'Player' }
  it('loads on 1.19', function () {
    const registry = require('prismarine-registry')('1.19')
    const ChatMessage = require('prismarine-chat')(registry)
    registry.loadDimensionCodec(registry.loginPacket.dimensionCodec)
    const msg = ChatMessage.fromNetwork(registry.chatFormattingByName['minecraft:emote_command'].id, {
      sender,
      content: { text: 'says hi' }
    })
    assert.strictEqual(msg.toString(), '* Player says hi')
  })

  it('loads exotic formatting', function () {
    const registry = require('prismarine-registry')('1.19')
    const ChatMessage = require('prismarine-chat')(registry)
    registry.chatFormattingById = {
      0: { formatString: '💬 [%s] %s » %s ⏎', parameters: ['rank', 'sender', 'content'] }
    }
    const msg = ChatMessage.fromNetwork(0, { sender, content: { text: 'hello world !' }, rank: 'Admin' })
    assert.strictEqual(msg.toString(), '💬 [Admin] Player » hello world ! ⏎')
  })
})

describe('Big message parsing', function () {
  const ChatMessage = require('prismarine-chat')('1.16')
  const translate = '%1$s'.repeat(32)
  const format = {
    text: 'a',
    color: 'dark_red',
    bold: true,
    italic: true,
    strikethrough: true,
    underlined: true,
    obfuscated: true
  }
  it('handles big messages', function () {
    const _with = [format]
    const big = { translate, with: _with }
    for (let i = 0; i < 7; i++) _with[0] = structuredClone(big)
    const message = new ChatMessage(big)
    assert.strictEqual(message.toString().length, 4096)
  })
  it('handles too deep messages', function () {
    const _with = [format]
    const big = { translate, with: _with }
    for (let i = 0; i < 10; i++) _with[0] = structuredClone(big)
    const message = new ChatMessage(big)
    assert.strictEqual(message.toString().length, 0)
  })
})

describe('NBT chat messages with empty string keys', function () {
  const ChatMessage = require('prismarine-chat')('1.16')

  it('should parse message parts with empty string keys correctly', function () {
    const nbtMessage = {
      extra: [
        {
          color: '#ff471a',
          text: 'Ⓖ '
        },
        { '': '[' },
        {
          color: '#5cff62',
          text: 'Игрок'
        },
        { '': '] ' },
        { '': '6055_42 ' },
        {
          color: 'gray',
          text: ' ⇨'
        },
        {
          color: '#d8d8d8',
          text: ' Test message',
          italic: true
        }
      ],
      text: ''
    }
    const msg = new ChatMessage(nbtMessage)
    const result = msg.toString()
    expect(result).toBe('Ⓖ [Игрок] 6055_42  ⇨ Test message')
  })
})

describe('Chat parser edge cases', function () {
  const ChatMessage = require('prismarine-chat')('1.20.4')

  it('should handle emojis outside BMP', () => {
    // Emoji: U+1F32B (🌫)
    const msg = new ChatMessage({ text: '🌫' })
    expect(msg.toString()).toBe('🌫')
  })

  it('should handle spawnpoint angle float precision', () => {
    // Simulate NBT message with empty string key and float value
    const msg = new ChatMessage({ '': 0.10000000149011612 })
    expect(msg.toString()).toBe('0.1')
    const msg2 = new ChatMessage({ '': 0.0 })
    expect(msg2.toString()).toBe('0')
  })

  it('should not create empty string keys for empty text', () => {
    const msg = new ChatMessage({ translate: '', with: [0.1, 1] })
    // Should not have {"":{"type":"double","value":0.1}} structure
    expect(msg.toString()).toBe('')
  })
})
