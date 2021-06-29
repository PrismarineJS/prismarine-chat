const mojangson = require('mojangson')

const nbt = require('./nbt')

function loader (version) {
  class MessageBuilder {
    constructor () {
      this.with = []
      this.extra = []
    }

    /** @param {boolean} val */
    setBold (val) { this.bold = val; return this }
    /** @param {boolean} val */
    setItalic (val) { this.italic = val; return this }
    /** @param {boolean} val */
    setUnderlined (val) { this.underlined = val; return this }
    /** @param {boolean} val */
    setStrikethrough (val) { this.strikethrough = val; return this }
    /** @param {boolean} val */
    setObfuscated (val) { this.obfuscated = val; return this }
    /** @param {string} val */
    setColor (val) { this.color = val; return this }
    /** @param {string} val */
    setText (val) { this.text = val; return this }
    /**
     * The resource location of the font for this component in the resource pack within `assets/<namespace>/font`.
     * @param {string} val Defaults to `minecraft:default`
     * @returns
     */
    setFont (val) { this.font = val; return this }
    /**
     * When used, it's expected that all slots for text will be filled using .addWith()
     * @param {string} val
     * @returns
     */
    setTranslate (val) { this.translate = val; return this }
    /**
     * text shown when shift clicked on message
     * @param {string} val
     */
    setInsertion (val) { this.insertion = val; return this }
    /**
     * Overrode by .setText()
     * @param {string} val
     * @example
     * builder.setKeybind('key.inventory')
     */
    setKeybind (val) { this.keybind = val; return this }
    /**
     * Displays a score holder's current score in an objective.
     * Displays nothing if the given score holder or the given objective do not exist, or if the score holder is not tracked in the objective.
     * @param {string} name if '*', show reader their own score. Otherwise, this is the player's score shown. Can be a selector string, but must never select more than one entity.
     * @param {string} objective The internal name of the objective to display the player's score in.
     */
    setScore (name, objective) { this.score = { name, objective }; return this }
    /**
     * @param {'open_url'|'run_command'|'suggest_command'|'change_page'|'copy_to_clipboard'} action
     * @param {string|number} value
     * @example
     * builder.setClickEvent('open_url', 'https://google.com')
     * builder.setClickEvent('run_command', '/say Hi!') // for signs, the slash doesn't need to be there
     * builder.setClickEvent('suggest_command', '/say ')
     * builder.setClickEvent('change_page', '/say Hi!') // Can only be used in written books
     * builder.setClickEvent('copy_to_clipboard', 'welcome to your clipboard')
     */
    setClickEvent (action, value) { this.clickEvent = { action, value }; return this }
    /**
     * if you want to use `contents`, leave `value` undefined.
     * if you want to use `value`, leave `contesnt` undefined.
     * @param {'show_text'|'show_entity'|'show_item'} action
     * @param {import('prismarine-item').Item|import('prismarine-entity').Entity|MessageBuilder} value
     * @param {'contents'|'value'} type [type='contents']
     */
    setHoverEvent (action, value, type = 'contents') {
      const hoverEvent = { action }
      if (type === 'contents') {
        switch (action) {
          case 'show_item':
            hoverEvent.contents = {
              id: `minecraft:${value.name}`,
              count: value.count,
              tag: mojangson.stringify(value.nbt)
            }
            break
          case 'show_entity':
            hoverEvent.contents = {
              name: value.displayName,
              type: `minecraft:${value.name}`,
              id: value.uuid
            }
            break
          case 'show_text':
            hoverEvent.contents = value
            break
          default:
            throw Error('Not implemented')
        }
      } else if (type === 'value') {
        switch (action) {
          case 'show_item':
            // works for 1.12.2 & 1.17
            hoverEvent.value = mojangson.stringify(nbt.comp({
              id: nbt.string(`minecraft:${value.name}`),
              Count: nbt.byte(value.count),
              tag: value.nbt,
              Damage: nbt.int(0)
            }))
            break
          case 'show_text':
            hoverEvent.value = value.toString()
            break
          case 'show_entity':
          default:
            throw Error('Not implemented')
        }
      }
      this.hoverEvent = hoverEvent
      return this
    }

    /**
     * appended to the end of this message object with the existing formatting.
     * formatting can be overrode in child messagebuilder
     * @param {MessageBuilder} val
     * @returns
     */
    addExtra (val) { this.extra.push(val.toString()); return this }
    /**
     * requires .translate to be set for this to be used
     * @param {MessageBuilder} val
     * @returns
     */
    addWith (val) { this.with.push(val.toString()); return this }

    toJSON () {
      const isDef = x => x !== undefined
      const obj = {}
      if (isDef(this.strikethrough)) obj.strikethrough = this.strikethrough
      if (isDef(this.obfuscated)) obj.obfuscated = this.obfuscated
      if (isDef(this.underlined)) obj.underlined = this.underlined
      if (isDef(this.clickEvent)) obj.clickEvent = this.clickEvent
      if (isDef(this.hoverEvent)) obj.hoverEvent = this.hoverEvent
      if (isDef(this.translate)) obj.translate = this.translate
      if (isDef(this.insertion)) obj.insertion = this.insertion
      if (isDef(this.italic)) obj.italic = this.italic
      if (isDef(this.bold)) obj.bold = this.bold
      if (isDef(this.font)) obj.font = this.font
      if (isDef(this.text)) { // text > keybind > score
        obj.text = this.text
      } else if (isDef(this.keybind)) {
        obj.keybind = this.keybind
      } else if (isDef(this.score)) {
        obj.score = this.score
      }
      if (this.with.length > 0) {
        obj.with = this.with
      }
      if (this.extra.length > 0) {
        obj.extra = this.extra
      }
      return obj
    }

    toString () {
      return JSON.stringify(this)
    }
  }
  return { MessageBuilder }
}

module.exports = loader
