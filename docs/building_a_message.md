# Building a message using `MessageBuilder`

## 1. Pick a format to follow
### a. Using a translation format.
With this option, you are picking a format from [here](https://github.com/PrismarineJS/minecraft-data/blob/master/data/pc/1.16.1/language.json) and just substituting values in for the blanks.
### b. Making a completely new format. (this will be the option covered by the guide)
With this option, you are usually making custom messages, that have colors, bold, whatever, but that don't follow a strict format from a translation.

## 2. Decide the structure
Read [this](https://wiki.vg/Chat#Inheritance) to understand how chat is formatted.
Next, make a basic outline using [these](https://wiki.vg/Chat#Shared_between_all_components) modifiers for style.

For this example, I want my message to look like this:
![text wanted](https://stolen.piracy.lol/images/2021/02/16/javaw_eJWsI2mRoL.png)

I will first lay it out using minecraft classic's color codes: `&7[&c&lYou&fTube&r&7]`. We do this because minecraft classic's color codes have the same inheritance rules as the json ones. So now, let's get into the code.

## 3. Make sure you import the MessageBuilder Class:
```js
const { MessageBuilder } = require('prismarine-chat')('1.16')
```

## 4. Make a rough outline
Keep in mind that even if you are just making a component for styling inner components, it still has to have a text field, so just add an empty string.
```js
// color gray
  // text: [
      //font: bold
        //color: red
        //text: You
        // -----------
        // color: white
        // text: Tube
  // text: [
```

## 5. Make it in code
For this part I suggest checking the examples folder, and the api doc.
```js
const myMessage = new MessageBuilder().setColor('gray').setText('')
  .addComponent(new MessageBuilder().setBold(true).setText('')
    .addComponent([
      new MessageBuilder().setColor('red').setText('You'),
      new MessageBuilder().setColor('white').setText('Tube')
    ]))
```

## 6. Now that you have the code:
Just stringify it then try it out in minecraft.
```js
console.log(JSON.stringify(myMessage)) // => {"color":"gray","text":"","extra":[{"text":"["},{"bold":true,"text":"","extra":[[{"color":"red","text":"You"},{"color":"white","text":"Tube"}]]},{"text":"]"}]}
```

![me using /tellraw in game](https://stolen.piracy.lol/images/2021/02/17/ckKboRjmWp.gif)
