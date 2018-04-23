var agent = document.querySelector('[data-agent-base]');

/**
 *
 * @param {function} checkForError A function that tests something on the page and returns false if everything checks out and a message if there was an error
 */
module.exports = window.__AUNTY_HELPER__ = function(checkForError, moreInfoLink) {
  var message = typeof checkForError === 'function' ? checkForError() : checkForError;

  if (typeof moreInfoLink !== 'undefined') {
    message +=
      "<br /><br /><a style='color:black;text-decoration:underline' href='" + moreInfoLink + '">More info...</a>';
  }

  if (message) {
    if (!agent) {
      // create a new agent element
      agent = document.createElement('div');
      agent.setAttribute('data-agent-base', true);
      applyStyles(agent, {
        position: 'fixed',
        zIndex: '1000',
        bottom: '20px',
        left: '20px',
        width: '300px',
        maxWidth: '100%'
      });

      // Balloon
      var balloon = document.createElement('div');
      balloon.setAttribute('data-agent-message', true);
      applyStyles(balloon, {
        width: '100%',
        background: '#FFFBEA',
        border: '4px solid #C1BF6F',
        borderRadius: '10px',
        padding: '10px',
        fontFamily: 'Comic Sans MS',
        fontSize: '15px',
        position: 'relative',
        zIndex: '2'
      });
      agent.appendChild(balloon);

      var stem = document.createElement('div');
      applyStyles(stem, {
        display: 'block',
        marginLeft: '40px',
        width: '30px',
        height: '30px',
        background: '#C1BF6F',
        transform: 'rotate(45deg) translate(0, -90%)',
        zIndex: '1'
      });
      agent.appendChild(stem);

      // Image
      var image = document.createElement('img');
      image.src = 'https://i.imgur.com/kc40BoX.png';
      applyStyles(image, {
        maxWidth: '150px',
        marginTop: '10px'
      });
      agent.appendChild(image);
      window.__AUNTY_HELPER__.image = image;

      // Declare animation
      var styles = document.createElement('style');
      styles.innerText =
        '@keyframes attention { 0% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); 100% { transform: rotate(0); } }';
      document.head.appendChild(styles);

      document.querySelector('body').appendChild(agent);
    }

    document.querySelector('[data-agent-message]').innerHTML = message;

    // Apply animation
    if (!window.__AUNTY_HELPER__.interval) {
      attention();
      window.__AUNTY_HELPER__.interval = setInterval(attention, 3500);
    }
  }
};

/**
 * Apply a bunch of CSS styles to an element
 * @param {DOMElement} element The target element
 * @param {object} styles The property/value pairs to apply
 */
function applyStyles(element, styles) {
  Object.keys(styles).forEach(function(key) {
    element.style[key] = styles[key];
  });
}

/**
 * Jiggle the character
 */
function attention() {
  var img = window.__AUNTY_HELPER__.image;
  img.style.animationName = 'attention';
  img.style.animationDuration = '0.5s';

  setTimeout(function() {
    img.style.animationName = '';
  }, 500);
}
