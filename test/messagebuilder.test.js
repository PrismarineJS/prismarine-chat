/* eslint-env jest */

describe('MessageBuilder', () => {
  describe('1.16.5', () => {
    const { MessageBuilder } = require('prismarine-chat')('1.16.5')
    const ChatMessage = require('prismarine-chat')('1.16.5')
    describe('setX', () => {
      const properties = [
        ['Bold', true],
        ['Italic', true],
        ['Underlined', true],
        ['Strikethrough', true],
        ['Obfuscated', true],
        ['Color', 'red'],
        ['Text', 'this is a chat message'],
        ['Font', 'minecraft:not_default'],
        ['Translate', 'chat.type.text'],
        ['Insertion', "Hi I'm inserted!"]
      ]
      for (const [prop, val] of properties) {
        test(`builder#set${prop}`, () => { // ex: builder#setBold
          const msg = new MessageBuilder()[`set${prop}`](val) // ex: .setBold(true)
          const json = msg.toJSON() // ex: { bold: true}
          const propName = prop.toLowerCase() // ex: 'bold'
          expect(json[propName]).toStrictEqual(val) // ex: json[bold] === true
        })
      }
    })

    describe('with/extra', () => {
      test('no translate w/ .with', () => {
        const msg = new MessageBuilder()
          .addWith('Hello,')
          .addWith('World.')
        expect(msg.toJSON()).toStrictEqual({})
      })
      test('translate w/ .with', () => {
        const msg = new MessageBuilder()
          .setTranslate('chat.type.text')
          .addWith(new MessageBuilder().setText('U9G'))
          .addWith(new MessageBuilder().setText('Hello world'))
        const expected = { translate: 'chat.type.text', with: [{ text: 'U9G' }, { text: 'Hello world' }] }
        expect(msg.toJSON()).toStrictEqual(expected)
        // as text:
        const text = new ChatMessage(msg.toJSON()).toString()
        expect(text).toStrictEqual('<U9G> Hello world')
      })

      test('w/ .addExtra add split hello & world', () => {
        const msg = new MessageBuilder()
          .addExtra(new MessageBuilder().setText('Hello'))
          .addExtra(new MessageBuilder().setText(' ').setColor('reset'))
          .addExtra(new MessageBuilder().setText('world'))
          .setText('')
        expect(msg.toJSON()).toStrictEqual({ extra: [{ text: 'Hello' }, { text: ' ', color: 'reset' }, { text: 'world' }], text: '' })
        // as text:
        const text = new ChatMessage(msg.toJSON()).toString()
        expect(text).toStrictEqual('Hello world')
      })
    })
  })
})
