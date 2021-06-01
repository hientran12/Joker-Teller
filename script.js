function tellJoke(jokeStr) {
    // console.log(jokeStr);
    VoiceRSS.speech({
        key: '2bba50f783e74c57826b3815d8c7b898',
        src: jokeStr,
        hl: 'de-de',
        v: 'Jonas',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get Joke from API
async function getJokes() {
    let joke = '';
    const jokeAPIUrl = 'https://v2.jokeapi.dev/joke/Any?lang=de&blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(jokeAPIUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text to Speech
        tellJoke(joke);
        // Disable Btn
        toggleButton();
    } catch (error) {
        console.log('oopsi we have an error: ' + error)
    }
}

// Disable/Enable Btn
function toggleButton() {
    tellJokeButton.disabled = !tellJokeButton.disabled;
}

// Add Event Listener
tellJokeButton.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);