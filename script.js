
const Keyboard = window.SimpleKeyboard.default;

let userGuess = document.querySelector('.input');
let resetInput = false;
let currentIteration = 0;

const lineBar = new ProgressBar.Line("#progress-bar", {
    from: { color: "#76d484" },
    to: { color: "#00B6E7" },
    strokeWidth: 4,
    trailWidth: 1,
    trailColor: "#fff",
    easing: "easeInOut",
    step: function (state, bar, attachment) {
        bar.path.setAttribute('stroke', state.color);
    }
})

const myKeyboard = new Keyboard({
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    layout: {
        'default': [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            'z x c v b n m {bksp}',
            '{space} {enter}'
        ]
    },
    display: {
        '{bksp}': '<',
        '{enter}': 'enter',
        '{space}': 'space',
    },
    theme: "hg-theme-default myTheme1"
});

function onChange(input) {
    userGuess.value = input
    console.log("Input changed", input);
}

function onKeyPress(button) {
    if (button == '{enter}') {
        console.log("Button pressed", button);
        checkGuess();
    }
}

let score = 0;

const enter = myKeyboard.getButtonElement('{enter}')

function checkGuess() {
    console.log(userGuess.value)
    const guess = userGuess.value.toLowerCase();
    const correctAnswer = correctAnswers[currentIteration - 1].toLowerCase();

    const a = FuzzySet([correctAnswer]);
    const match = a.get(guess);
    // [[0.8461538461538461, 'Michael Axiak']]
    if (match != null) {
        if (match[0][0] >= 0.5) {
            score += 1
        }
    }

    console.log(score)

    userGuess.value = ''
    myKeyboard.clearInput();
    displayNext();
}

function displayScore() {
    document.getElementById('main').classList.add('hidden');
    const resultContainer = document.getElementById('results-container');
    resultContainer.classList.remove('hidden');

    const result = document.getElementById('results');
    result.innerHTML = `
                <h4 class="p-4 text-xl">You got <span class="font-extrabold text-4xl">${score}</span> out of 12 questions correctly</h4>`;


}


let imagesArray = [
    [
        'trump.jpg',
        'cat4.jpg',
        'jupiverse.jpg',
        'ebglish.jpg'
    ],

    [
        'catstanbul1.jpg',
        'catstanbul2.jpg',
        'catstanbul3.jpg',
        'catstanbul4.jpg'
    ],

    [
        '1burningcat.jpg',
        '2burningcat.jpg',
        '3burningcat.jpg',
        '4burningcat.jpg'
    ],
    [
        'memecoin1.jpg',
        'memecoin2.jpg',
        'memecoin3.jpg',
        'memecoin4.jpg'
    ],
    [
        '1community.jpg',
        '2community.jpg',
        '3community.jpg',
        '4community.jpg'
    ],
    [
        'community1.jpg',
        'community2.jpg',
        'community3.jpg',
        'community4.jpg'
    ],
    [
        'satchel1.jpg',
        'satchel2.jpg',
        'satchel3.jpg',
        'satchel4.jpg'
    ],
    [
        'Yastin1.jpg',
        'Yastin2.jpg',
        'Yastin3.jpg',
        'Yastin4.jpg'
    ],
    [
        'JupRally1.jpg',
        'JupRally2.jpg',
        'JupRally3.jpg',
        'JupRally4.jpg'
    ],
    [
        'Jupuary1.jpg',
        'Jupuary2.jpg',
        'Jupuary3.jpg',
        'Jupuary4.jpg'
    ],
    [
        'ApePro1.jpg',
        'ApePro2.jpg',
        'ApePro3.jpg',
        'ApePro4.jpg'
    ],
    [
        'JupJam1.jpg',
        'JupJam2.jpg',
        'JupJam3.jpg',
        'JupJam4.jpg'
    ]


]

const correctAnswers = ['meow', 'catstanbul', 'burning cat', 'memecoin', 'community', 'working group', 'satchel',
    'yastin', 'jup rally', 'jupuary', 'ape pro', 'DefiJupJam'];

const imageElement = document.getElementById('imageElement');

function displayNext() {
    if (currentIteration == imagesArray.length) {
        displayScore();
        return
    }
    imageElement.innerHTML = '';

    // Get the next set of images
    const nextImages = imagesArray[currentIteration];

    // Create and append new images
    nextImages.forEach(imageUrl => {
        const image = document.createElement('img');
        image.classList.add('sm:max-w-full', 'rounded-lg', 'place-self-end', 'sm:h-[95%]');
        image.src = 'images/' + imageUrl;
        image.alt = 'Image description';

        imageElement.appendChild(image);
    });

    currentIteration++;
    console.log(currentIteration)

    lineBar.animate((currentIteration) / 12, {
        duration: 50
    });
    lineBar.text = currentIteration
}

displayNext();


