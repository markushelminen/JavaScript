const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display')

keys.addEventListener ('click' , e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            console.log("number key!")
            if (displayNum == '0') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayNum + keyContent;
            }
        }

        if (action == 'add' ||
            action == 'substract' ||
            action == 'multiply' ||
            action == 'divide') {
            console.log("operator key!");
            key.classList.add('is-depressed')
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
        }

        if (action === 'decimal') {
            console.log('decimal key!')
            display.textContent = displayedNum + '.'
        }
        if (action === 'clear') {
            console.log('clear key!')
        }
        if (action === 'calculate') {
            console.log('equal key!')
        }

    }
})