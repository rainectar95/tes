
function initializeCardValue() {
    document.addEventListener('DOMContentLoaded', CardValueClicks);
    cardValue();
}

const filterElements = {
    'lexans': 'filter1',
    'caps': 'filter2',
    'boxes': 'filter3',
    'trays': 'filter4',
    'other': 'filter5',
};

    const cardValue = async () => {
    
        const data = getCalcLexData(); // Fetch the data
    
        // Clear the container before adding new content
        for (const filterId in filterElements) {
        const filterElement = document.getElementById(filterElements[filterId]);
        filterElement.innerHTML = ''; // Clear previous content
        }
    
        // Iterate over all categories in the data
        for (const category in data[0]) {
        const cardGroup = data[0][category];
    
        // Only handle arrays of cards (ignoring other properties)
        if (Array.isArray(cardGroup)) {
            cardGroup.forEach(card => {
            const clonedCard = document.createElement('label');
            clonedCard.classList.add('card-value');
    
            const image = card.image;
            const title = card.title;
            const size = card.sizecard;
            const value = card.value;
            const height = card.info.height;
            const materials = card.info.materials;
            clonedCard.setAttribute('cardname', size);
            const imageArea = document.createElement('div');
            imageArea.classList.add('image-area');
            const imageBlock = document.createElement('div');
            imageBlock.classList.add('image-block');
            const imageValue = document.createElement('img');
            imageValue.classList.add('image-value');
            imageValue.src = image;
            imageBlock.appendChild(imageValue);
            imageArea.appendChild(imageBlock);
            clonedCard.appendChild(imageArea);
            
    
            const sizeValue = document.createElement('p');
            sizeValue.classList.add('text-card', 'lexan');
            sizeValue.textContent = size;
    
            const tareWeight = document.createElement('input');
            tareWeight.setAttribute('id', 'tareWeight');
            tareWeight.setAttribute('onchange', 'updateSum()');
            tareWeight.setAttribute('link', `cards ${card.index}`);
            tareWeight.type = 'radio';
            tareWeight.name = 'radioValue';
            tareWeight.value = value;
            clonedCard.appendChild(tareWeight);
    
            const textBlock = document.createElement('div');
            textBlock.classList.add('text-block');
    
            const lBlockValue = document.createElement('div');
            lBlockValue.classList.add('text-block-left');
    
            const titleValue = document.createElement('p');
            titleValue.classList.add('text-card');
            titleValue.textContent = title;
            const rBlockValue = document.createElement('div');
            rBlockValue.classList.add('chips', 'alt');
    
            const heightValue = document.createElement('p');
            heightValue.classList.add('chip', 'size', 'alt');
            heightValue.textContent = height;
            const materialsValue = document.createElement('p');
            materialsValue.classList.add('chip','alt');
            if (materials === 'металл') {
            materialsValue.classList.add('metal');
            } else if (materials === 'пластик') {
            materialsValue.classList.add('plastic');
            }
            materialsValue.textContent = materials;
    
            lBlockValue.appendChild(titleValue);
            lBlockValue.appendChild(sizeValue);
    
            rBlockValue.appendChild(heightValue);
            rBlockValue.appendChild(materialsValue);
    
            textBlock.appendChild(lBlockValue);
            textBlock.appendChild(rBlockValue);
    
            clonedCard.appendChild(textBlock);
    
          // Determine the filter element based on category
            const filterElementId = filterElements[category.toLowerCase()];
            if (filterElementId) {
                const filterElement = document.getElementById(filterElementId);
                filterElement.appendChild(clonedCard);
            } else {
                console.warn(`No filter element found for category: ${category}`);
            }
            });
        }
        }
    };


const radioButtons = document.querySelectorAll('input[name="filter"]');
const filterContents = document.querySelectorAll('.filter-content');
    function showCurrentPanel() {
    filterContents.forEach(filter => {
        filter.style.display = 'none';
    });
    const selectedValue = document.querySelector('input[name="filter"]:checked').value; // Get the selected value
    const filterId = `filter${selectedValue.slice(-1)}`; // Extract the last character from selectedValue
    const currentPanel = document.getElementById(filterId);
        if (currentPanel) {
            currentPanel.style.display = 'grid';
        }
    }
showCurrentPanel();
radioButtons.forEach(tab => {
tab.addEventListener('change', showCurrentPanel);
});

const chipsValue = () => {
const dimensionContainer = document.getElementById('dimension-container');
const cards = getCalcLexData();          
cards.forEach((card, cardIndex) => {
    card.chips.forEach((chip, chipIndex) => {
    const clonedCard = document.createElement('div');
    clonedCard.classList.add('chip-weight');
    const title = chip.title;
    const size = chip.size;
    const value = chip.value;
    const seconds = chip.seconds;


    clonedCard.setAttribute('chipname', size);


    const sizeElement = document.createElement('div');
    sizeElement.classList.add('size-chip');
    sizeElement.textContent = size;

    const titleElement = document.createElement('label');
    titleElement.textContent = title;
    titleElement.appendChild(sizeElement);
    titleElement.setAttribute('for', `seconds${seconds}`);                
            
    const inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = `seconds${seconds}`;
    inputElement.value = value;
    inputElement.setAttribute('onchange', 'updateSum()');
    inputElement.setAttribute('name', `chipsValue${seconds}`);

    clonedCard.appendChild(inputElement);
    clonedCard.appendChild(titleElement);
    dimensionContainer.appendChild(clonedCard);
    });
});
};

const getCalcLexData = () => {
    // Example data, replace with actual data fetching logic
    return [
        {
            "lexans": 
            [
                {
                    "title": "лексан",
                    "sizecard": "1/1",
                    "image": "/assets/lexans/lexan-1-1-150-m.webp",
                    "value": "400",
                    "info": {"height": "150 мм", "materials": "металл"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/1",
                    "image": "/assets/trays.png",
                    "value": "400",
                    "info": {"height": "150 мм", "materials": "металл"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/2",
                    "image": "/assets/lexans/lexan-1-2-200-m.webp",
                    "value": "300",
                    "info": {"height": "200 мм", "materials": "пластик"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/3",
                    "image": "/assets/lexans/lexan-1-3-150-m.webp",
                    "value": "100",
                    "info": {"height": "150 мм", "materials": "металл"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/3",
                    "image": "/assets/lexans/lexan-1-3-100-m.webp",
                    "value": "200",
                    "info": {"height": "100 мм", "materials": "металл"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/6",
                    "image": "/assets/lexans/lexan-1-6-150-m.webp",
                    "value": "100",
                    "info": {"height": "150 мм", "materials": "металл"}
                },
                {
                    "title": "лексан",
                    "sizecard": "1/6",
                    "image": "/assets/lexans/lexan-1-6-100-m.webp",
                    "value": "100",
                    "info": {"height": "100 мм", "materials": "металл"}
                }

            ],          
            "caps": 
            [
                {
                    "title": "бутылка",
                    "sizecard": "1/1",
                    "image": "/assets/lexans/lexan-1-3-100-m.webp",
                    "value": "50",
                    "info": {"height": "50 мм", "materials": "металл"}
                },
            
            ],
            "boxes": 
            [
                {
                    "title": "ящик",
                    "sizecard": "1/1",
                    "image": "/assets/lexans/lexan-1-3-100-m.webp",
                    "value": "100",
                    "info": {
                        "height": "100 мм",
                        "materials": "металл"
                    }
                }
            ],
            "other": 
            [
                {
                    "title": "лоток",
                    "sizecard": "1/1",
                    "image": "/assets/lexans/lexan-1-3-100-m.webp",
                    "value": "100",
                    "info": {
                        "height": "100 мм",
                        "materials": "металл"
                        }
                }
            ],
            "trays":
            [
                {
                    "title": "лоток",
                    "sizecard": "",
                    "image": "/assets/lexans/lexan-1-3-100-m.webp",
                    "value": "100",
                    "info": {
                        "height": "100 мм",
                        "materials": "металл"
                        }
                }
            ],
            "chips": 
            [   
                
                {   
                    "size": "1/1",
                    "value": "50",
                    "title": "крышка металл",
                    "seconds": "1-1",
                },
                {
                    "value": "100",
                    "title": "крышка пластик",
                    "size": "1/1",
                    "seconds": "1-2",
                },
                {
                    "value": "200",
                    "title": "крышка",
                    "size": "1/2",
                    "seconds": "2-1",
                },
                {
                    "value": "150",
                    "title": "крышка",
                    "size": "1/3",
                    "seconds": "3-1",
                },
                {
                    "value": "200",
                    "title": "крышка",
                    "size": "1/3",
                    "seconds": "3-2",
                },
                {
                    "value": "250",
                    "title": "safa",
                    "size": "1/3",
                    "seconds": "3-3",
                },
                {
                    "value": "300",
                    "title": "крышка",
                    "size": "1/6",
                    "seconds": "6-1",
                },
                {
                    "value": "350",
                    "title": "дренаж",
                    "size": "1/6",
                    "seconds": "6-2",
                },
            ],
        }
    ];
};

chipsValue();

const CardValueClicks = () => {

    const dimensionContainer = document.getElementById('dimension-container');
    dimensionContainer.style.display = 'none';
    const sizeValues = document.querySelectorAll('.card-value[cardname]');
    const chipValues = document.querySelectorAll('.chip-weight[chipname]');

    sizeValues.forEach(sizeValue => {
        sizeValue.addEventListener('change', () => {
            const selectedSize = sizeValue.getAttribute('cardname');
            const selectedChip = sizeValue.getAttribute('chipname');
            
            chipValues.forEach(chip => {
                if (chip.getAttribute('chipname') === selectedSize) {
                    chip.style.display = 'block';
                    dimensionContainer.style.display = 'flex';
                } else {
                    chip.style.display = 'none'; // Hide other chip-weight elements
                }
            });
        });
    });
};


// Call this function to set up the event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', CardValueClicks);

cardValue();


// Call the function to place the cloning card in tab2

const setupCardValueClicks = () => {
    const sizeCards = document.querySelectorAll('.sizecard');
    sizeCards.forEach(card => {
        const size = card.textContent;
    });

    document.querySelectorAll('.card-value').forEach(cardValue => {
        cardValue.addEventListener('click', function(event) {
            const nameValue = cardValue.querySelector('.text-card');
            const sizeValue = cardValue.querySelector('.lexan');
            const sizeChipValue = cardValue.querySelector('.size');
            const materialsChipValue = cardValue.querySelector('.alt .metal, .alt .plastic');
            const chipType = materialsChipValue.classList;
            if (materialsChipValue.className.includes('.alt .metal')) {
                chipType.classList.add('.metal');
            } else if (materialsChipValue.className.includes('.alt .plastic')) {
                chipType.classList.add('plastic');
            }
            console.log(chipType);
            // Update the content of the cardLabel2 element
            document.querySelector('span.cardLabel2').innerHTML = `
                <div class="text-block-left">
                    <p class="text-card">${nameValue.textContent}</p>
                    <p class="text-card lexan">${sizeValue.textContent}</p>
                </div>
                <div class="chips">
                    <div class="chip size">${sizeChipValue.textContent}</div>
                    <div class="${chipType}">${materialsChipValue.textContent}</div>
                </div>
            `;
            // Update the src attribute of the image-value element
            const imageValue = cardValue.querySelector('.image-value');
            const imageIcon = document.getElementById('cardImage');
            const imageFit = document.querySelector('.image-fit');
            imageIcon.src = imageValue.getAttribute('src');
            imageIcon.style.width = '10rem';
            // imageFit.style.backgroundColor =  'var(--color-neutral-80)';            
            imageFit.style.padding = '14px 0';
            imageFit.style.height = '2rem';
            const calcButtons = document.querySelectorAll('.calc-buttons');
            calcButtons.forEach(button => {
                button.style.background = 'var(--color-neutral-90)';
            });
            // console.log(calcButtons);
        });
    });
};



function initializeCardValue() {
    document.addEventListener('DOMContentLoaded', CardValueClicks);
    cardValue();
}

document.addEventListener('DOMContentLoaded', setupCardValueClicks);


document.getElementById('tabCheckbox').addEventListener('click', function() {
    var tab1 = document.getElementById('tab1');
    var tab2 = document.getElementById('tab2');

    if (tab2.classList.contains('active')) {
        tab1.classList.add('active');
        tab2.classList.remove('active');
    } else {
        tab1.classList.remove('active');
        tab2.classList.add('active');
    }
});

document.querySelectorAll('.card-value input[name="radioValue"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.card-value').forEach(card => {
            card.classList.remove('active');
        });
        if (this.checked) {
            this.closest('.card-value').classList.add('active');
        }
    })
});
