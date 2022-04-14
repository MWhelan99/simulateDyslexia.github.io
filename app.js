$(function(){

  
	var getTextNodesIn = function(el) { // Look at all the page elements and returns the text nodes
	    return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
	        return this.nodeType == 3; // Text node types are type 3
	    });
	};

	// var textNodes = getTextNodesIn($("p, h1, h2, h3","*"));
	var textNodes = getTextNodesIn($("p"));//excules the Titles and only focuses on the paragraph elements

	function isLetter(char) {
		return /^[\d]$/.test(char);
	}

	var wordsInTextNodes = [];
	for (var i = 0; i < textNodes.length; i++) {
		var node = textNodes[i];

		var words = []

		var re = /\w+/g;
		var match;
		while ((match = re.exec(node.nodeValue)) != null) {

			var word = match[0];
			var position = match.index;

			words.push({
				length: word.length,
				position: position
			});
		}

		wordsInTextNodes[i] = words;
	};

	function messUpWords () {

		for (var i = 0; i < textNodes.length; i++) {

			var node = textNodes[i];

			for (var j = 0; j < wordsInTextNodes[i].length; j++) {

				// Only change a tenth of the words each round.
				if (Math.random() > 1/10) {

					continue;
				}

				var wordMeta = wordsInTextNodes[i][j];

				var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
				var before = node.nodeValue.slice(0, wordMeta.position);
				var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);

				node.nodeValue = before + jumbleUpWord(word) + after;
			};
		};
	}

	function jumbleUpWord (word) {

		if (word.length < 3) {

			return word;
		}

		return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
	}

	function messUpMessyPart (messyPart) {

		if (messyPart.length < 2) {

			return messyPart;
		}

		var a, b;
		while (!(a < b)) {

			a = getRandomInt(0, messyPart.length - 1);
			b = getRandomInt(0, messyPart.length - 1);
		}

		return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
	}

	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	function getRandomInt(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1) + min);
	}


	setInterval(messUpWords, 90);
});

/**
 * Shuffle text.
 * @class
 * @param {object} element - dom element
 * @param {boolean} onload - true or false
 * @param {delay} delay - true or false
 * @param {number} iterationNumber - iteration
 * @param {number} iterationSpeed - speed
 * @param {number} displayedSpeed - speed
 * @param {number} index - index
 */
 function ShuffleText(element, onload, delay, iterationNumber, iterationSpeed, displayedSpeed, index) {
	this.element = element;
	this.onload = onload;
	this.index = delay === true ? index + 1 : 1;
	this.iterationNumber = iterationNumber;
	this.iterationSpeed = iterationSpeed;
	this.displayedSpeed = displayedSpeed;
	this.texts = this.element.textContent;
	this.startTexts = this.texts;
	this.textsArr = [];
	this.textsNewArr = [];
	this.newText = '';
	this.isRunning = false;
  
	this.setupEvents();
  }
  
  ShuffleText.prototype.setupEvents = function() {
	if (this.onload === true) {
	  this.iteration();
	}
	
	var that = this;
	this.element.addEventListener('mouseover', function() {
	  that.iteration(true);
	}, false);
  };
  
  ShuffleText.prototype.createNewArr = function() {
	for (var i = 0; i < this.texts.length; i++) {
	  this.textsArr.push(this.texts[i]);
	}
	
	while(this.textsArr.length > 0) {
	  var num = Math.floor(this.textsArr.length * Math.random());
	  this.textsNewArr.push(this.textsArr[num]);
	  this.textsArr.splice(num, 1);
	}
  };
  
  ShuffleText.prototype.createNewTexts = function() {
	for (var i = 0; i < this.textsNewArr.length; i++) {
	  this.newText += this.textsNewArr[i];
	}
	
	this.element.textContent = this.newText;
  };
  
  ShuffleText.prototype.reset = function() {
	this.newText = '';
	this.textsArr = [];
	this.textsNewArr = [];
  };
  
  ShuffleText.prototype.render = function() {
	this.createNewArr();
	this.createNewTexts();
	this.reset();
  };
  
  ShuffleText.prototype.iteration = function(ev) {
	if (this.isRunning !== false) return;
	if (ev === true) this.index = 1;
	
	this.isRunning = true;
	
	var that = this;
	for (var i = 0; i < this.iterationNumber; i++) {
	  (function(i) {
		setTimeout(function() {
		  that.render();
		  
		  if (i === that.iterationNumber - 1) {
			that.element.textContent = '';
			
			for (var j = 0; j < that.startTexts.length; j++) {
			  (function(j) {
				setTimeout(function() {
				  that.element.textContent += that.startTexts[j];
				  
				  if (j === that.startTexts.length - 1) {
					that.isRunning = false;
				  }
				}, j * that.displayedSpeed);
			  })(j);
			}
		  }
		}, i * that.index * that.iterationSpeed);
	  })(i);
	}
  };
  
  (function() {
	window.addEventListener('load', function() {
	  var classes = document.getElementsByClassName('shuffleText');
	  for (var i = 0; i < classes.length; i++) {
		new ShuffleText(classes[i], true, true, 10, 2, 80, i);
	  }
	}, false);
  })();


  function shuffle(str) {
	var str = document.getElementById('txt');
	var a = str.innerHTML;
	var newArr = [];
	var neww = '';
	var text = a.replace(/[\r\n]/g, '').split(' ');
	
	text.map(function(v) {
	  v.split('').map(function() {
		var hash = Math.floor(Math.random() * v.length);
		neww += v[hash];
		v = v.replace(v.charAt(hash), '');
	  });
	  newArr.push(neww);
	  neww = '';
	});
	var x = newArr.map(v => v.split('').join(' ')).join('\n');
	str.value = x.split('').map(v => v.toUpperCase()).join('');
  }

  setInterval(function() {
	$('.ritalin').toggleClass('shake-vertical');
	setTimeout(function() {
	  $('.ritalin').toggleClass('shake-vertical');
	}, 100);
  }, 100);
	
  //-----------------
// Menu Visual
var myText = document.getElementById('myText');
var tempText = "";

for(let x in myText.textContent){
  var rnd =  Math.floor(Math.random() * (2 - 0 +  1));
  var rndBounce =  Math.floor(Math.random() * (11 - 5) + 5) / 10;
  if(rnd === 0){
    tempText += "<span style='color: orange; animation-duration: " + rndBounce + "s'>" + myText.textContent[x] + "</span>";
  } else if (rnd === 1) {
    tempText += "<span style='color: silver; animation-duration: " + rndBounce + "s'>" + myText.textContent[x] + "</span>";
  } else {
    tempText += "<span style='color: turquoise; animation-duration: " + rndBounce + "s'>" + myText.textContent[x] + "</span>";
  }
}
myText.innerHTML = tempText;
	
	
  