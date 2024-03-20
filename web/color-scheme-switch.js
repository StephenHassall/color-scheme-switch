/**
 * Color scheme switch web component
 * 
 * @author Stephen Paul Hassall
 * @license https://github.com/StephenHassall/color-scheme-switch/blob/main/LICENSE
 * @web https://github.com/StephenHassall/color-scheme-switch
 */

class ColorSchemeSwitch extends HTMLElement {
    /**
     * Load the saved color scheme last selected.
     */
    static load() {
        // Get color scheme setting
        const colorScheme = window.localStorage.getItem('color-scheme');

        // If there is nothing saved
        if (!colorScheme) return;

        // Set the body's color scheme attribute
        document.body.setAttribute('color-scheme', colorScheme);
    }

    /**
     * Static CSS constant.
     * @return {string} The CSS constant.
     */
    static get CSS() {
        return /*css*/`
            :host {
                display: block;
                min-width: 2rem;
                min-height: 2rem;
                height: 2rem;
                width: 2rem;
            }

            #mode {
                height: 100%;
                width: 100%;
                box-sizing: border-box;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                border: 2px solid transparent;
                transition: border 0.5s ease-out;
            }

            #mode:hover {
                border: 2px solid var(--color-text);
            }
            
            #mode:focus-within {
                border: 2px solid var(--color-text);
            }

            .options {
                height: 100%;
                width: 100%;
                background-color: var(--color-background);
                transition: background-color 0.5s ease-out;
            }

            button {
                position: absolute;
                inset: 0;
                padding: 0;
                margin: 0;
                cursor: pointer;
                border: none;
                border-radius: 50%;
                -webkit-tap-highlight-color: transparent;
            }

            button:focus-visible {
                outline: none;
            }

            .switch-in {
                animation-name: move-in;
                animation-duration: 0.5s;
                animation-timing-function: ease-out;
            }

            .switch-out {
                animation-name: move-out;
                animation-duration: 0.5s;
                animation-timing-function: ease-out;
            }

            svg {
                position: absolute;
                inset: 20%;
                width: 60%;
                height: 60%;
                stroke-width: 1px;
                stroke-opacity: 1;
                stroke-linecap: round;
                stroke-linejoin: round;
                fill: none;
            }

            #light svg {
                stroke: var(--light-color-text);
            }

            #dark svg {
                stroke: var(--dark-color-text);
            }

            @media (prefers-color-scheme: light) {
                #light {
                    background-color: var(--light-color-background);
                    opacity: 1.0;
                    z-index: 2;
                    pointer-events: auto;
                }
                #dark {
                    background-color: var(--dark-color-background);
                    opacity: 0.0;
                    z-index: 1;
                    pointer-events: none;
                }
            }

            @media (prefers-color-scheme: dark) {
                #light {
                    background-color: var(--light-color-background);
                    opacity: 0.0;
                    z-index: 1;
                    pointer-events: none;
                }
                #dark {
                    background-color: var(--dark-color-background);
                    opacity: 1.0;
                    z-index: 2;
                    pointer-events: auto;
                }    
            }
            
            #mode[color-scheme="light"] #light {
                background-color: var(--light-color-background);
                opacity: 1.0;
                z-index: 2;
                pointer-events: auto;
            }

            #mode[color-scheme="light"] #dark {
                background-color: var(--dark-color-background);
                opacity: 0.0;
                z-index: 1;
                pointer-events: none;
            }

            #mode[color-scheme="dark"] #light {
                background-color: var(--light-color-background);
                opacity: 0.0;
                z-index: 1;
                pointer-events: none;
            }

            #mode[color-scheme="dark"] #dark {
                background-color: var(--dark-color-background);
                opacity: 1.0;
                z-index: 2;
                pointer-events: auto;
            }

            @keyframes move-in {
                0% {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                100% {
                    transform: translateX(0%);
                    opacity: 1;
                }
            }

            @keyframes move-out {
                0% {
                    transform: translateY(0%);
                    opacity: 1;
                }
                100% {
                    transform: translateY(50%);
                    opacity: 0.5;
                }
            }

            @keyframes fade-in {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }

            @keyframes fade-out {
                0% { opacity: 1; }
                100% { opacity: 0.5; }
            }

            @media (prefers-reduced-motion) {
                #mode {
                    transition: none;
                }
    
                .options {
                    transition: none;
                }
    
                .switch-in {
                    animation-name: fade-in;
                    animation-duration: 0.2s;
                    animation-timing-function: ease-out;
                }
    
                .switch-out {
                    animation-name: fade-out;
                    animation-duration: 0.2s;
                    animation-timing-function: ease-out;
                }
            }
            `;
    }

    /**
     * Static HTML constant.
     * @return {string} The HTML constant.
     */
    static get HTML() {
        return /*html*/`
            <div id="mode">
                <div class="options">
                    <button id="light">
                        <svg viewBox="0 0 18 18" style="display: block; height: inherit;">
                            <circle cx="9" cy="9" r="3"></circle>
                            <path d="m 14,9 h 3"></path>
                            <path d="M 1,9 H 4"></path>
                            <path d="m 9,14 v 3"></path>
                            <path d="M 9,1 V 4"></path>
                            <path d="m 12.535534,5.4644661 2.12132,-2.1213203"></path>
                            <path d="m 3.3431458,14.656854 2.1213203,-2.12132"></path>
                            <path d="m 12.535534,12.535534 2.12132,2.12132"></path>
                            <path d="M 3.3431458,3.3431458 5.4644661,5.4644661"></path>
                        </svg>
                    </button>
                    <button id="dark">
                        <svg viewBox="0 0 18 18" style="display: block; height: inherit;">
                            <path d="M 8.5253906,1.0290438 A 8,8 0 0 0 1,9 8,8 0 0 0 9,17 8,8 0 0 0 17,9.4743563 6,6 0 0 1 13,11 6,6 0 0 1 7,5 6,6 0 0 1 8.5253906,1.0290438 Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            `;
    }

    /**
     * Light dark mode web component constructor.
     * @constructor
     */
    constructor() {
        // Must call super first
        super();

        // Attach shadow DOM root
        this._shadowRoot = this.attachShadow({mode: 'open'});

        // Set shadow DOM's inner HTML
        this._shadowRoot.innerHTML = ColorSchemeSwitch.HTML;

        // Create the CSS parts for the shadow DOM
        const style = document.createElement('style');

        // Set styles
        style.textContent = ColorSchemeSwitch.CSS;
        
        // Insert shadow DOM's styles
        this._shadowRoot.prepend(style);

        // Get elements
        this._modeElement = this.shadowRoot.getElementById('mode');
        this._lightElement = this.shadowRoot.getElementById('light');
        this._darkElement = this.shadowRoot.getElementById('dark');

        // Set events function bindings
        this._lightClickEvent = this._lightClickEvent.bind(this);
        this._darkClickEvent = this._darkClickEvent.bind(this);
        this._animationEndEvent = this._animationEndEvent.bind(this);
    }

    /**
    * Override connectedCallback function to handle when component is attached into the DOM.
    * @override
    */
    connectedCallback() {
        // Match the body color scheme attribute (if it is set)
        if (document.body.hasAttribute('color-scheme') === true) {
            // Get color scheme
            const colorScheme = document.body.getAttribute('color-scheme');

            // Add attribute with the same value
            this._modeElement.setAttribute('color-scheme', colorScheme);

            // Make sure only the one button can be tabbed
            if (colorScheme === 'light') this._darkElement.setAttribute('tabIndex', -1);
            if (colorScheme === 'dark') this._lightElement.setAttribute('tabIndex', -1);
        }

        // Set working
        this.working = false;

        // Add click event
        this._lightElement.addEventListener('click', this._lightClickEvent);
        this._darkElement.addEventListener('click', this._darkClickEvent);

        // Add animation end event
        this._lightElement.addEventListener('animationend', this._animationEndEvent);
        this._darkElement.addEventListener('animationend', this._animationEndEvent);
    }

    /**
     * Override disconnectedCallback function to handle when component is detached from the DOM.
     * @override
     */
    disconnectedCallback() {
        // Remove click event
        this._lightElement.removeEventListener('click', this._lightClickEvent);
        this._darkElement.removeEventListener('click', this._darkClickEvent);

        // Remove animation end event
        this._lightElement.removeEventListener('animationend', this._animationEndEvent);
        this._darkElement.removeEventListener('animationend', this._animationEndEvent);
    }

    /**
     * Light click event.
     * @param {Object} event The click event information.
     */
    _lightClickEvent(event) {
        // If already working
        if (this.working === true) return;

        // Switch to dark mode

        // Save setting
        window.localStorage.setItem('color-scheme', 'dark');

        // Reset body's color-scheme value to dark
        document.body.setAttribute('color-scheme', 'dark');

        // Reset mode element to match
        this._modeElement.setAttribute('color-scheme', 'dark');

        // Set working
        this.working = true;

        // Set animation classes
        this._lightElement.classList.add('switch-out');
        this._darkElement.classList.add('switch-in');

        // Remove the focus from the button
        this._lightElement.blur();

        // Make sure only the one button can be tabbed
        this._lightElement.setAttribute('tabIndex', -1);
        this._darkElement.removeAttribute('tabIndex');
    }

    /**
     * Dark click event.
     * @param {Object} event The click event information.
     */
    _darkClickEvent(event) {
        // If already working
        if (this.working === true) return;

        // Switch to light mode

        // Save setting
        window.localStorage.setItem('color-scheme', 'light');

        // Reset body's color-scheme value to dark
        document.body.setAttribute('color-scheme', 'light');

        // Reset mode element to match
        this._modeElement.setAttribute('color-scheme', 'light');

        // Set working
        this.working = true;

        // Set animation classes
        this._darkElement.classList.add('switch-out');
        this._lightElement.classList.add('switch-in');

        // Remove the focus from the button
        this._darkElement.blur();

        // Make sure only the one button can be tabbed
        this._darkElement.setAttribute('tabIndex', -1);
        this._lightElement.removeAttribute('tabIndex');
    }

    /**
     * Animation end event.
     */
    _animationEndEvent(event) {
        // Remove the animation, so we can rerun it in a bit
        this._lightElement.classList.remove('switch-in');
        this._lightElement.classList.remove('switch-out');
        this._darkElement.classList.remove('switch-in');
        this._darkElement.classList.remove('switch-out');

        // Reset working
        this.working = false;
    }
}

// Load the current color scheme setting
ColorSchemeSwitch.load();

// Define controller web component
customElements.define('color-scheme-switch', ColorSchemeSwitch);
