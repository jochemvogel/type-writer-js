class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.wait = parseInt(wait, 10);
        this.type();
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;

        // Get full text of the current word
        const fullText = this.words[current];

        // Remove or add characters based on isDeleting state
        if(this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        // Insert the characters in the text element
        this.textElement.innerHTML = `<span class="typing-text--characters">${this.text}</span>`;

        // Init the typing speed
        let typeSpeed = 200;
        this.isDeleting ? typeSpeed /= 2 : typeSpeed;

        // If word is complete --> pause at the end & change isDeleting state
        if(!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        // If word is deleted --> move to next word & change isDeleting state
        } else if(this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    } 
}

// Init app
function init() {
    const textElement = document.querySelector('.typing-text');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');
    
    new TypeWriter(textElement, words, wait);
}

// Event listeners
document.addEventListener('DOMContentLoaded', init);