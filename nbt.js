const nbt = {
  short (value) { return { type: 'short', value } },
  byte (value) { return { type: 'byte', value } },
  string (value) { return { type: 'string', value } },
  int (value) { return { type: 'int', value } },
  comp (value) { return { type: 'compound', value } },
  list (...value) {
    const type = value[0].type != null ? value[0].type : 'end'
    return { type: 'list', value: { type, value: value.map(o => o.value) } }
  }
}

module.exports = nbt
