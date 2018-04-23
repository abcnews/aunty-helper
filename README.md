# Aunty Helper

A little on-screen helper to guide people using your plugin.

![Aunty](https://i.imgur.com/kc40BoX.png)

## Usage

```js
require('@abcnews/aunty-helper');

// Pass in a message
if (someErrorHappened()) {
  window.__AUNTY_HELPER('Some error message');
}

// or pass in a callback that returns the error message
window.__AUNTY_HELPER(function() {
  if (someErrorHappened()) {
    return 'Some error message';
  }
});
```

## Authors

* Nathan Hoad - [hoad.nathan@abc.net.au](mailto:hoad.nathan@abc.net.au)
