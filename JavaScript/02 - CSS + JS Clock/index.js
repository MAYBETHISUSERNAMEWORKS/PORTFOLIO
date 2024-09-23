
document.addEventListener('DOMContentLoaded', function() {
  const secondHand = document.querySelector('[data-seconds-hand]');
  const minuteHand = document.querySelector('[data-min-hand]');
  const hourHand = document.querySelector('[data-hour-hand]')

  const setDate = () => {
    const now = new Date();
    const seconds = (now.getSeconds() / 60);
    setRotation(secondHand, seconds);
    const minutes = (seconds + now.getMinutes()) / 60;
    setRotation(minuteHand, minutes);
    const hours = (minutes + now.getHours()) / 12;
    setRotation(hourHand, hours);
  }

  const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--rotation', rotationRatio * 360);
  }

  // every 1000ms, we are calling setDate
  setInterval(setDate, 1000);
  setDate();
});
