
function showTab(index) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
    updateSum();
}

function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
    updateSum();
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
    updateSum();
}

function updateSum() {
    const display = document.getElementById('display');
    const result = document.getElementById('result');
    const radioValue = document.querySelector('input[name="radioValue"]:checked'); 
    const chipsValues = [];
    let chipsValueNumber = 0;
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 3; j++) {
            const chipsValue = document.querySelector(`input[name="chipsValue${i}-${j}"]:checked`);
            chipsValues.push(chipsValue);
            chipsValueNumber += chipsValue ? parseFloat(chipsValue.value) : 0;
        }
    }
    console.log(chipsValues);
    const displayValue = parseFloat(display.value) || 0;
    const radioValueNumber = radioValue ? parseFloat(radioValue.value) : 0;
    const sum = displayValue - radioValueNumber - chipsValueNumber;

    
    result.innerHTML = sum;
        if (sum <= 0) {
            result.style.opacity = '0';
            result.style.display = 'none';
        } else {
            result.style.opacity = '100';
            result.style.display = 'block';
    }
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Initialize the first tab as active
showTab(0);




