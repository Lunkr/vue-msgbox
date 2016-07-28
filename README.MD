# Overview

vue-msgbox is a message box (like Sweet Alert) for vue.js.

# Install

Get source from npm.

```bash
$ npm install vue-msgbox --save
```

```bash
./dist/
├── vue-msgbox.js
└── vue-msgbox.js.map
./src/
├── index.js
└── msgbox.vue
```

```JavaScript
// For ES6 module
import MessageBox from 'vue-msgbox';

// Import all-in-one file from dist
import MessageBox from 'vue-msgbox/dist/vue-msgbox.js';
```
# Usage

## Basic usage

```JavaScript
MessageBox("Good job!", "You clicked the button!", "success");// title, message, type
```

Or pass an object as options, and second parameter as callback:

```JavaScript
MessageBox({
  title: 'I\'m a title',
  message: 'I\'m a message',
  type: 'success',
  showCancelButton: true
}, function(result) {
  console.log('callback:', result);
  MessageBox('Clicked: ' + result);
});
```

## Promise based usage

### Basic usage

```JavaScript
MessageBox({
  title: 'I\'m a title',
  message: 'I\'m a message',
  type: 'success',
  showCancelButton: true
}).then(function(result) {
  console.log('callback:', result);
  MessageBox('Clicked: ' + result);
});
```

### alert

```JavaScript
MessageBox.alert(message, title, options);
```

```JavaScript
MessageBox.alert('message').then(function(result) {
  ...
});
```

### confirm

If user press cancel button, then this promise will be rejected.

```JavaScript
MessageBox.confirm(message, title, options);
```

```JavaScript
MessageBox.confirm('message').then(function(result) {
  ...
});
```

### prompt

If user press cancel button, then this promise will be rejected.

```JavaScript
MessageBox.prompt(message, title, options);
```

```JavaScript
MessageBox.prompt('message').then(function(value, result) {
  ...
});
```

# Options

| Option | Description |
| ----- | ----- |
| title | The title of MessageBox. |
| message | The content of MessageBox. |
| type | The status type of MessageBox: success, warning, error |
| showConfirmButton | Boolean(default true) visible of confirm button. |
| showCancelButton | Boolean(default false) visible of cancel button. |
| confirmButtonText | The text of confirm button. |
| confirmButtonPosition | (Default:right) The position of confirm button, default is right. |
| confirmButtonHighlight | (Default:false) Highlight confirm button if confirmButtonHighlight is true. |
| cancelButtonText | The text of cancel button. |
| cancelButtonHighlight | (Default:false) Highlight cancel button if cancelButtonHighlight is true. |
| confirmButtonClass | Extra className of confirm button. |
| cancelButtonClass | Extra className of cancel button. |
| showInput | Boolean(default false) visible of input. |
| inputValue | value of input. |
| inputPlaceholder | placeholder of input. |
| inputPattern | Regexp(default null). validation pattern of input. |
| inputValidator | validate function of input, if validator return a string, MessageBox will use it as inputErrorMessage. |
| inputErrorMessage | error message when inputPattern test inputValue failed. |

# Develop

Coding with watching and hot-reload.

```bash
$ npm run dev
```

# License
MIT
