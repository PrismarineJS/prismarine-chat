/* eslint-env jest */
// this test file implements the tests that bungee uses
// https://github.com/SpigotMC/BungeeCord/blob/4f23b49fef8d30e0f1bdc045575e757ee0d2506f/chat/src/test/java/net/md_5/bungee/api/chat/ComponentsTest.java
const {
  ChatMessage,
  MessageBuilder
  // convertColorCodes
} = require('../')('1.16')

function testDissembleReassembleComponents (components) {
  expect(components).toBeInstanceOf(MessageBuilder)
  // TODO: Add support for parsing MessageBuilder directly to motd
}

function testDissembleReassembleJSON (json) {
  expect(typeof json).toEqual('string')
  const asMessage = new ChatMessage(JSON.parse(json))
  const messageAsJson = JSON.stringify(asMessage.json)
  expect(messageAsJson).toStrictEqual(json)
}

describe('bungee tests', () => {
  describe.skip('TranslatableComponentTest', () => {
    // todo: add support for custom translatable strings
    // https://github.com/SpigotMC/BungeeCord/blob/master/chat/src/test/java/net/md_5/bungee/api/chat/TranslatableComponentTest.java
  })
  describe('test item parsing', () => {
    test('test item parsing from messagebuilder', () => {
      const message = new MessageBuilder().setText('Test')
      message.setHoverEvent('show_item', { id: 'minecraft:netherrack', count: 47 })
      testDissembleReassembleComponents(message)
    })
    test('test item parsing from json', () => {
      const json = { hoverEvent: { action: 'show_item', value: [{ text: { id: 'minecraft:netherrack', count: 47 } }] }, text: 'Test' }
      testDissembleReassembleJSON(JSON.stringify(json))
    })
  })
})
