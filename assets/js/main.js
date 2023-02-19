function Calculadora() {
    const calc = document.querySelector('.calculadora');
    const display = document.querySelector('.display');
    const bttClear = document.querySelector('.btt-clear');
    const bttDel = document.querySelector('.btt-del');
    const bttEq = document.querySelector('.btt-eq');

    function init() {
        listenerBtts();
        listenerEnter();
        calc.focus();
    }
    init();

    function listenerBtts() {
        calc.addEventListener('click', (event) => includeNumber(event));
        bttClear.addEventListener('click', () => clear());
        bttDel.addEventListener('click', () => del());
        bttEq.addEventListener('click', () => eq());

    }

    function listenerEnter() {
        calc.addEventListener('keyup', event => {
            if (event.keyCode === 13) { 
                eq();
            }
        })
    }

    function includeNumber(event) {
        const element = event.target;

        if (element.classList.contains('btt-number')) {
            if (display.value == '0' || display.value == 'Syntax Error') display.value = '';
            if (display.value.includes('...')) display.value = display.value.replace('...', '');
            display.value += element.innerHTML;
        }

        display.focus();
    }

    function clear() {
        display.value = '0';
    }

    function del() {
        if (display.value == 'Syntax Error') display.value = '0';
        if (display.value != '0') display.value = display.value.slice(0, -1);
    }

    function eq() {
        let displayArray = [...`${display.value}`];
        let result;

        if (displayArray.filter(value => validateMath(value)).length > 0) {
            display.value = 'Syntax Error';
            calc.focus();
            return;
        }

        try {
            result = eval(display.value);
        } catch {
            display.value = 'Syntax Error';
            calc.focus();
            return;
        }

        if (result - Math.floor(result) === 0)
            display.value = eval(display.value);
        else
            display.value = eval(display.value).toFixed(5) + '...';

    }

    function validateMath(value) {
        return !(value == '+' || value == '-' || value == '*' || value == '/' || value == '.'
            || value == '0' || value == '1' || value == '2' || value == '3' || value == '4'
            || value == '5' || value == '6' || value == '7' || value == '8' || value == '8'
            || value == '9' || value == '(' || value == ')');
    }

}

const c1 = new Calculadora();



