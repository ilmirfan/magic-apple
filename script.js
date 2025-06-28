// Language translations
const translations = {
    en: {
        mainTitle: '🍎 Magic Apple Colors! 🍎',
        instructions: 'Click on any color below to change the apple!',
        funMessage: 'Have fun exploring all the colorful apples!',
        langBtn: 'தமிழ்',
        tooltips: {
            red: 'Red Apple',
            turquoise: 'Turquoise Apple',
            blue: 'Blue Apple',
            peach: 'Peach Apple',
            mint: 'Mint Apple',
            yellow: 'Yellow Apple',
            green: 'Green Apple',
            purple: 'Purple Apple',
            pink: 'Pink Apple',
            coral: 'Coral Apple',
            lavender: 'Lavender Apple',
            magenta: 'Magenta Apple',
            brown: 'Brown Apple',
            black: 'Black Apple'
        }
    },
    ta: {
        mainTitle: '🍎 மாயா ஆப்பிள் நிறங்கள்! 🍎',
        instructions: 'ஆப்பிள் நிறத்தை மாற்ற கீழே உள்ள நிறத்தை கிளிக் செய்யவும்!',
        funMessage: 'வண்ண ஆப்பிள்களை அனுபவிக்கவும்!',
        langBtn: 'English',
        tooltips: {
            red: 'சிவப்பு ஆப்பிள்',
            turquoise: 'நீலப்பச்சை ஆப்பிள்',
            blue: 'நீல ஆப்பிள்',
            peach: 'பீச் ஆப்பிள்',
            mint: 'புதினா ஆப்பிள்',
            yellow: 'மஞ்சள் ஆப்பிள்',
            green: 'பச்சை ஆப்பிள்',
            purple: 'ஊதா ஆப்பிள்',
            pink: 'இளஞ்சிவப்பு ஆப்பிள்',
            coral: 'பவளம் ஆப்பிள்',
            lavender: 'லாவண்டர் ஆப்பிள்',
            magenta: 'மெஜெண்டா ஆப்பிள்',
            brown: 'பழுப்பு ஆப்பிள்',
            black: 'கருப்பு ஆப்பிள்'
        }
    }
};

let currentLang = 'en';

// Function to change apple color
function changeAppleColor(color) {
    const apple = document.getElementById('apple');
    apple.style.setProperty('--apple-color', color);

    // Add a fun animation when color changes
    apple.style.transform = 'rotate(-2deg) scale(1.1)';
    setTimeout(() => {
        apple.style.transform = 'rotate(-2deg) scale(1)';
    }, 200);

    // Play a sound effect (optional - browsers may block autoplay)
    playColorChangeSound();
}

// Function to play sound effect
function playColorChangeSound() {
    // Create a simple audio context for a fun sound effect
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Ignore audio errors - not all browsers support this
    }
}

// Function to update tooltips
function updateTooltips() {
    const colorElements = document.querySelectorAll('.color-option');
    const tooltipKeys = ['red', 'turquoise', 'blue', 'peach', 'mint', 'yellow', 'green', 'purple', 'pink', 'coral', 'lavender', 'magenta', 'brown', 'black'];

    colorElements.forEach((element, index) => {
        if (tooltipKeys[index]) {
            element.title = translations[currentLang].tooltips[tooltipKeys[index]];
        }
    });
}

// Function to toggle language
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    document.getElementById('mainTitle').textContent = translations[currentLang].mainTitle;
    document.getElementById('instructions').textContent = translations[currentLang].instructions;
    document.getElementById('funMessage').textContent = translations[currentLang].funMessage;
    document.getElementById('langToggle').textContent = translations[currentLang].langBtn;
    updateTooltips();
}

// Add keyboard support for accessibility
document.addEventListener('keydown', function (event) {
    if (event.key === ' ' || event.key === 'Enter') {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D', '#6BCF7F', '#4834D4', '#FF9FF3', '#FF7675', '#A29BFE', '#FD79A8', '#8B4513', '#2C2C2C'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        changeAppleColor(randomColor);
    }
});

// Initialize tooltips on page load
document.addEventListener('DOMContentLoaded', function () {
    updateTooltips();
});
