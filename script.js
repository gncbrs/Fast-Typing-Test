const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Speed typing improves accuracy and efficiency.",
  "Typing fast requires practice and focus.",
  "JavaScript is essential for modern web apps.",
  "Frontend development can be fun and creative."
];

let quote = "";
let startTime;

function setNewQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quote = quotes[randomIndex];
  displayQuote(quote);
  document.getElementById("input").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("input").focus();
  startTime = new Date().getTime();
}

function displayQuote(text) {
  const quoteDisplay = document.getElementById("quote");
  quoteDisplay.innerHTML = "";
  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteDisplay.appendChild(span);
  });
}

function checkLiveTyping() {
  const inputText = document.getElementById("input").value;
  const quoteSpans = document.querySelectorAll("#quote span");
  let correct = true;

  inputText.split("").forEach((char, i) => {
    const span = quoteSpans[i];
    if (!span) return;

    if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      correct = false;
    }
  });

  // Remove classes from remaining spans
  for (let i = inputText.length; i < quoteSpans.length; i++) {
    quoteSpans[i].classList.remove("correct", "incorrect");
  }

  // Auto-check if full match
  if (inputText.length === quote.length) {
    checkResult();
  }
}

function checkResult() {
  const typed = document.getElementById("input").value;
  if (typed !== quote) return;

  const currentTime = new Date().getTime();
  const timeTaken = (currentTime - startTime) / 1000;
  const words = quote.split(" ").length;
  const wpm = ((words / timeTaken) * 60).toFixed(2);
  document.getElementById("result").innerText = `✅ Time: ${timeTaken.toFixed(2)}s | WPM: ${wpm}`;
  document.getElementById("result").style.color = "green";
}

function resetTest() {
  setNewQuote();
}

document.getElementById("input").addEventListener("input", checkLiveTyping);
document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") checkResult();
});

window.onload = setNewQuote;
