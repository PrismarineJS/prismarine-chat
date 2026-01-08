/* eslint-env mocha */
const expect = require('expect').default

describe('NBT chat messages on 1.21', function () {
  const ChatMessage = require('prismarine-chat')('1.21')

  it('should parse NBT message with selector field', function () {
    const nbtMessage = {
      type: 'compound',
      name: '',
      value: {
        text: { type: 'string', value: '' },
        extra: {
          type: 'list',
          value: {
            type: 'compound',
            value: [
              {
                text: { type: 'string', value: '<[M] ' }
              },
              {
                selector: { type: 'string', value: '@p' },
                color: { type: 'string', value: 'aqua' }
              },
              {
                text: { type: 'string', value: '> » hi' }
              }
            ]
          }
        }
      }
    }

    const msg = ChatMessage.fromNotch(nbtMessage)
    const result = msg.toString()
    // Selector should be rendered as the selector string
    expect(result).toBe('<[M] @p> » hi')
  })

  it('should parse NBT message with keybind field', function () {
    const nbtMessage = {
      type: 'compound',
      name: '',
      value: {
        text: { type: 'string', value: 'Press ' },
        extra: {
          type: 'list',
          value: {
            type: 'compound',
            value: [
              {
                keybind: { type: 'string', value: 'key.inventory' }
              },
              {
                text: { type: 'string', value: ' to open inventory' }
              }
            ]
          }
        }
      }
    }

    const msg = ChatMessage.fromNotch(nbtMessage)
    const result = msg.toString()
    // Keybind should be rendered as the keybind string
    expect(result).toBe('Press key.inventory to open inventory')
  })

  it('should parse NBT message with score field', function () {
    const nbtMessage = {
      type: 'compound',
      name: '',
      value: {
        text: { type: 'string', value: 'Your score: ' },
        extra: {
          type: 'list',
          value: {
            type: 'compound',
            value: [
              {
                score: {
                  type: 'compound',
                  value: {
                    name: { type: 'string', value: '*' },
                    objective: { type: 'string', value: 'kills' }
                  }
                }
              }
            ]
          }
        }
      }
    }

    const msg = ChatMessage.fromNotch(nbtMessage)
    const result = msg.toString()
    // Score should be rendered as a placeholder since we don't have access to actual scores
    expect(result).toBe('Your score: <score:*:kills>')
  })

  it('should handle complex NBT message with mixed content types', function () {
    const nbtMessage = {
      type: 'compound',
      name: '',
      value: {
        text: { type: 'string', value: '' },
        extra: {
          type: 'list',
          value: {
            type: 'compound',
            value: [
              {
                '': { type: 'string', value: '<[M] ' },
                color: { type: 'string', value: '#ff471a' }
              },
              {
                selector: { type: 'string', value: '@s' },
                color: { type: 'string', value: 'aqua' },
                clickEvent: {
                  type: 'compound',
                  value: {
                    action: { type: 'string', value: 'suggest_command' },
                    value: { type: 'string', value: '/msg PLAYER ' }
                  }
                }
              },
              {
                '': { type: 'string', value: '> » ' }
              },
              {
                text: { type: 'string', value: 'hello world' }
              }
            ]
          }
        }
      }
    }

    const msg = ChatMessage.fromNotch(nbtMessage)
    const result = msg.toString()
    expect(result).toBe('<[M] @s> » hello world')
  })

  it('should parse JSON message with selector (non-NBT)', function () {
    const jsonMessage = {
      text: '',
      extra: [
        { text: '<' },
        { selector: '@p', color: 'aqua' },
        { text: '> hello' }
      ]
    }

    const msg = new ChatMessage(jsonMessage)
    expect(msg.toString()).toBe('<@p> hello')
  })

  it('should parse JSON message with keybind (non-NBT)', function () {
    const jsonMessage = {
      text: 'Press ',
      extra: [
        { keybind: 'key.jump' },
        { text: ' to jump' }
      ]
    }

    const msg = new ChatMessage(jsonMessage)
    expect(msg.toString()).toBe('Press key.jump to jump')
  })

  it('should parse JSON message with score (non-NBT)', function () {
    const jsonMessage = {
      text: 'Player score: ',
      extra: [
        {
          score: {
            name: 'player1',
            objective: 'deaths'
          }
        }
      ]
    }

    const msg = new ChatMessage(jsonMessage)
    expect(msg.toString()).toBe('Player score: <score:player1:deaths>')
  })
})
