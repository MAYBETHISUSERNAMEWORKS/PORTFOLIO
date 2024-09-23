const pressed = [];
const secretCode = 'wesbos';

window.addEventListener('keyup', (event) => {
  console.log(event.key);
  pressed.push(event.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

  if (pressed.join('').includes(secretCode)) {
    console.log('Ding Ding');
    cornify_add();
  };

  console.log(pressed);
});
