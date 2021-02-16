class Message {
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

  addTranslateInsertion (val) {
    if (!this.with) this.with = []
    this.with.push(val)
    return this
  }

  addComponent (val) {
    if (!this.extra) this.extra = []
    this.extra.push(val)
    return this
  }

  setTranslate (val) { this.translate = val; return this }
}

const supportedColors = {
  0: 'black',
  1: 'dark_blue',
  2: 'dark_green',
  3: 'dark_aqua',
  4: 'dark_red',
  5: 'dark_purple',
  6: 'gold',
  7: 'gray',
  8: 'dark_gray',
  9: 'blue',
  a: 'green',
  b: 'aqua',
  c: 'red',
  d: 'light_purple',
  e: 'yellow',
  f: 'white',
  k: 'obfuscated',
  l: 'bold',
  m: 'strikethrough',
  n: 'underlined',
  o: 'italic',
  r: 'reset'
}

// convert classic minecraft color strings to the message class
function convertColorCodes (str) {
  let lastObj = null
  let currString = ''
  for (let i = str.length - 1; i > -1; i--) {
    if (str[i] !== '&') currString += str[i]
    else if (str[i] === '&') {
      const text = currString.split('').reverse()
      const color = supportedColors[text.shift()]
      const newObj = new Message()
      if (color === 'obfuscated') {
        newObj.setObfuscated(true)
      } else if (color === 'bold') {
        newObj.setBold(true)
      } else if (color === 'strikethrough') {
        newObj.setStrikethrough(true)
      } else if (color === 'underlined') {
        newObj.setUnderlined(true)
      } else if (color === 'italic') {
        newObj.setItalic(true)
      } else if (color !== 'reset') {
        newObj.setColor(color)
      }
      newObj.setText(text.join(''))
      if (lastObj == null) { // if lastObject is null, this has to be the new lastObject
        lastObj = newObj
      } else if (color === 'reset') { // if the color is reset, start a new branch
        lastObj = new Message().setText('').addComponent([newObj, lastObj])
      } else { // otherwise extend the branch
        lastObj = newObj.addComponent(lastObj)
      }
      currString = ''
    }
  }
  return lastObj
}

module.exports = (version) => { return { Message, convertColorCodes } }
