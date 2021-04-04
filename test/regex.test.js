/* eslint-env jest */
const ChatMessage = require('../')('1.16.5')

const { ALL_CHAT, ESSENTIALS_WHISPER, VANILLA_WHISPER } = ChatMessage.REGEX_PATTERNS()

function testRunner (patternName, pattern, tests) {
  tests.forEach((o, ix) => {
    test(`${patternName} Test ${ix + 1}`, () => {
      expect(pattern.test(o)).toStrictEqual(true)
    })
  })
}

describe('ALL_CHAT Test', () => {
  const tests = [
    '<U9G> Hello',
    '<Person_With_A_1ong_Name> hello team hows it going'
  ]
  testRunner('ALL_CHAT', ALL_CHAT, tests)
})

describe('ESSENTIALS_WHISPER Test', () => {
  const tests = [
    '[U9G -> you] Hello!',
    '[~Nicked9G -> you] Hello how is it going?'
  ]
  testRunner('ALL_CHAT', ESSENTIALS_WHISPER, tests)
})

describe('VANILLA_WHISPER Test', () => {
  const tests = [
    'U9G whispers to you: Hello!',
    'my_nickname whispers: my_ very long! msg'
  ]
  testRunner('ALL_CHAT', VANILLA_WHISPER, tests)
})
