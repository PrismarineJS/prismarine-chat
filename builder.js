class BaseMessage {
  setBold (val) { this.bold = val; return this }
  setItalic (val) { this.italic = val; return this }
  setUnderlined (val) { this.underlined = val; return this }
  setStrikethrough (val) { this.strikethrough = val; return this }
  setObfuscated (val) { this.obfuscated = val; return this }
  setColor (val) { this.color = val; return this }
  setInsertion (val) { this.insertion = val; return this }
  setText (val) { this.text = val; return this }
  setClickEvent (action, value) { this.clickEvent = { action, value }; return this }
  setHoverEvent (action, type, id, name) {
    this.hoverEvent = { action, contents: { type, id, name: { text: name } } }
    return this
  }
}

class Message extends BaseMessage {
  addComponent (val) {
    if (!this.with) this.with = []
    this.with.push(val)
    return this
  }

  setTranslate (val) { this.translate = val; return this }
}

class MessageComponent extends BaseMessage {
  setTranslate (val) { this.translate = val; return this }
  // addComponent (val) {
  //   if (!this.with) this.with = []
  //   this.with.push(val)
  //   return this
  // }
}

module.exports = (version) => { return { Message, MessageComponent } }
