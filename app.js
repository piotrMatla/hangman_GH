"use strict";

let phrase;
let categories = ["urządzenia", "astronomia", "znane osoby"];
let wordsBank = {
	urządzenia: [
		"Komputer",
		"Aparat cyfrowy",
		"Smartfon",
		"Tablet",
		"Laptop",
		"Konsola do gier",
		"Telewizor",
		"Pralka",
		"Lodówka",
		"Zmywarka",
		"Odkurzacz",
		"Suszarka do włosów",
		"Prostownica",
		"Czajnik elektryczny",
		"Mikrofalówka",
		"Toster",
		"Kuchenka mikrofalowa",
		"Klimatyzator",
		"Piekarnik",
		"Zamrażarka",
	],
	astronomia: [
		"Galaktyka",
		"Słońce",
		"Księżyc",
		"Układ Słoneczny",
		"Gwiazda",
		"Planeta",
		"Kometa",
		"Meteor",
		"Asteroida",
		"Układ Planetarny",
		"Hipergromada",
		"Ciemna materia",
		"Ciemna energia",
		"Wielka Implozja",
		"Oddziaływanie grawitacyjne",
		"Zjawisko Hawkinga",
		"Czarna dziura",
		"Układ Binarny",
		"Supernowa",
		"Wszechświat expandujący się",
	],
	"znane osoby": [
		"William Shakespeare",
		"Leonardo da Vinci",
		"Albert Einstein",
		"Juliusz Cezar",
		"Napoleón Bonaparte",
		"Abraham Lincoln",
		"Martin Luther King Jr",
		"Mahatma Gandhi",
		"Jan Paweł II",
		"Charles Darwin",
		"Isaac Newton",
		"Christopher Columbus",
		"Queen Elizabeth II",
		"Marie Curie",
		"Pablo Picasso",
		"Steve Jobs",
		"Michael Jackson",
		"Elvis Presley",
		"Martin Luther",
		"Nikola Tesla",
	],
};

let imageContainer = document.querySelector('.hangman__image')

//Draw and write a sentence on the game board
let phraseToGuess = "";
let category;
let mistakeNumb = 0;

function drawThePhrase() {
	category = categories[Math.floor(Math.random() * categories.length)];
	let phraseIndex = Math.floor(Math.random() * wordsBank[category].length);
	phrase = wordsBank[category][phraseIndex].toUpperCase();
}

drawThePhrase();

for (let i = 0; i < phrase.length; i++) {
	if (phrase.charAt(i) == " ") phraseToGuess = phraseToGuess + " ";
	else phraseToGuess = phraseToGuess + "_";
}

function writePhrase() {
	document.querySelector(".board").innerHTML = phraseToGuess;
	document.querySelector(".category").innerHTML = category;
}

writePhrase();

function generateButtons() {
	let buttonsHTML = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"
		.split("")
		.map(
			letter =>
				`<button class="char" id="` +
				letter +
				`" onClick="handleGuess(` +
				letter +
				`)" >` +
				letter +
				`</button>`
		)
		.join("");

	document.querySelector(".keyboard").innerHTML = buttonsHTML;
}

generateButtons();

let attempts = 0;
let usedLetters = [];

console.log(phrase);

function handleGuess(letter) {
	let hit = false;
	let letterUpperCase = letter.innerHTML.toUpperCase();

	for (let i = 0; i < phrase.length; i++) {
		if (phrase.charAt(i) == letterUpperCase) {
			phraseToGuess =
				phraseToGuess.substring(0, i) +
				letterUpperCase +
				phraseToGuess.substring(i + 1);
			hit = true;
		}
	}

	if (hit) {
		letter.classList.add("hit");
	} else {
		letter.classList.add("missed");
		mistakeNumb++;
        imageContainer.src = `img/s${mistakeNumb}.png`
	}

	usedLetters.push(letterUpperCase);
	letter.disabled = true;

	writePhrase();

    const modalHeadline = document.querySelector('.modal__content--headline');
    const modalButton = document.querySelector('.modal__content--btn');
    const modal = document.querySelector('.modal');
// Lose the game
	if (mistakeNumb >= 9) {
        imageContainer.src = `img/s${mistakeNumb}.png`;
        document.querySelectorAll('.char').forEach(btn => btn.disabled = true);
        modal.style.display = "block";
        modal.style.borderColor = "#620000";
        modalHeadline.innerHTML = "Przegrałeś!";
        modalHeadline.style.color = "#C00000";
        modalButton.style.backgroundColor = "#C00000";
        modalButton.style.boxShadow = "0 3px 0 #620000";
        modalButton.style.border = "2px solid #620000";
	}

// Win the game
	if (phraseToGuess == phrase) {
		imageContainer.src = `img/s${mistakeNumb}.png`;
        document.querySelectorAll('.char').forEach(btn => btn.disabled = true);
        modal.style.display = "block";
        modalHeadline.innerHTML = "Wygrałeś!"
        modal.style.borderColor = "#006700";
        modalHeadline.style.color = "#00C000";
        modalButton.style.backgroundColor = "#00C000";
        modalButton.style.boxShadow = "0 3px 0 #006700";
        modalButton.style.border = "2px solid #006700";
	}
}
