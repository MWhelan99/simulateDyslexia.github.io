setInterval(function() {
  $('.homework').toggleClass('shake-vertical');
  setTimeout(function() {
    $('.homework').toggleClass('shake-vertical');
  },2);
}, 8);


const input = document.querySelector('.input');
const backwards = document.querySelector('.backwards');
const rotated = document.querySelector('.rotated');

input.addEventListener('input', event => {
	const { value } = event.target;
	backwards.textContent = value.split('').reverse().join('');
	rotated.textContent = value;
})