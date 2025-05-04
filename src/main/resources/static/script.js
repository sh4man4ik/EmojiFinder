/* eslint-disable no-undef */

function githubRepoLocation() {
    window.location.href = "https://github.com/sh4man4ik/EmojiFinder";
}

let searchEmojis = document.getElementById("searchEmojis");

function outlineAdd() {
    searchEmojis.style.outline = "2px solid black";
}

function removeOutline() {
    searchEmojis.style.outline = "none";
}

function searchEmoji(inputRandom) {
    let inputText = document.getElementById("inputText").value.trim();

    inputRandom == "randomButton123456" ? inputText = "randomButton123456" : inputText;

    if (inputText != "") {
        $.ajax({
            type: 'POST',
            url: '/send',
            contentType: 'application/json',
            data: JSON.stringify({ message: inputText }),
            success: function(response) {
                workWithResponse(response);
                $('#serverResponse').text('Success: ' + response);
            },
            error: function(xhr, error) {
                console.error('Error: ', error);
                $('#serverResponse').text('Error: ' + xhr.responseText);
            }
        });
    }
}

let responseEmojis2 = document.getElementById("responseEmojis2");

function workWithResponse(response) {
    responseEmojis2.innerHTML = "";

    let parsedResponse = JSON.parse(response);
    let emojis = parsedResponse.results.map(item => item.emoji);

    const emojiRegex = /\p{Emoji}/u;
    const flagRegex = /^[\u{1F1E6}-\u{1F1FF}]{2}$/u;

    for (let emoji of emojis) {

        if (emojiRegex.test(emoji) && !flagRegex.test(emoji)) {
            let newP = document.createElement("p");
            newP.classList.add("display-3", "emojiBlock");
            newP.innerHTML = emoji;
    
            newP.addEventListener('click', () => {
                navigator.clipboard.writeText(newP.textContent)
                    .then(() => {
                        animationCopied();
                    });
            });
        
            responseEmojis2.appendChild(newP);
        }

    }
}

document.querySelectorAll('.emojiBlock').forEach(element => {
    element.addEventListener('click', () => {
        navigator.clipboard.writeText(element.textContent)
            .then(() => {
                animationCopied();
            });
    });
});

let copied = document.getElementById("copied");

function animationCopied() {
    copied.style.display = "block";
    setTimeout(() => {
        copied.classList.add("show");
    }, 10);

    setTimeout(() => {
        copied.classList.remove("show");

        setTimeout(() => {
            copied.style.display = "none";
        }, 250);
    }, 1000);
}