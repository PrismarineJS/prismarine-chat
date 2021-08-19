const loader: (mcVersion: string) => typeof ChatMessage
export default loader

class ChatMessage {
  /**
   * @param message content of ChatMessage
   */
  constructor(
    message: string | object | object[] | number,
    displayWarning = false
  )

  /**
   * Append one or more ChatMessages
   */
  append(...messages: object[] | string[]): void

  /**
   * Returns a clone of the ChatMessage
   */
  clone(): ChatMessage

  /**
   * Flattens the message into plain-text, without style.
   */
  toString(language?: Language): string

  /**
   * Flattens the message into text containing `§x` style codes.
   */
  toMotd(language?: Language, parent = {}): string

  /**
   * Flattens the message into text styled with ANSI escape sequences.
   * Useful for printing to the console.
   * See also https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
   */
  toAnsi(language?: Language): string

  /**
   * Returns the count of text extras and child ChatMessages.
   * Does not count recursively in to the children.
   */
  length(): number

  /**
   * Returns a text part from the message.
   * @param idx Index of the part
   */
  getText(idx, language?: Language): string

  /**
   * Flattens the message into plain-text, without style.
   */
  valueOf(): string
}

type Language = { [key: string]: string }
