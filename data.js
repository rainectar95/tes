fetch('./tare.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ой, ошибка в fetch: ' + response.statusText);
    }
    return response.json();
  })
  .then(jsonData => { 
    // console.log(jsonData);
    const tareData = jsonData;



    tareData.forEach(category => {
        category.lexans.forEach(data => {
            createCard(data, 'panel1');
        });
        category.cap.forEach(data => {
            createCard(data, 'panel2');
        });
        category.boxes.forEach(data => {
            createCard(data, 'panel3');
        });
        category.cap.forEach(data => {
            createCard(data, 'panel4');
        });
    });
    
    const tabs = document.querySelectorAll('nav input[type="radio"]');
    const tabPanels = document.querySelectorAll('.content');
    function showCurrentPanel() {
        tabPanels.forEach(panel => {
            panel.style.display = 'none';
        });

        const checkedRadio = document.querySelector('input[name="radio"]:checked');
        if (checkedRadio) {
            const panelId = `panel${checkedRadio.id.slice(-1)}`; // Correct panelId assignment
            const currentPanel = document.getElementById(panelId);
            if (currentPanel) {
                currentPanel.style.display = 'flex';
                currentPanel.style.flexDirection = 'column';

            }
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('change', showCurrentPanel);
    });

    showCurrentPanel();

})
  .catch(error => console.error('Ошибка при исполнении запроса: ', error));


const cardTemplate = document.getElementById('card-template').querySelector('.card');
function showBottomSheet(data, panelId) {
    const bottomSheet = document.getElementById(`bottom-sheet-${panelId}`);
    const overlay = document.getElementById(`overlay-${panelId}`);
    
    const extraInfo = bottomSheet.querySelector('#extra-info');
    const title = bottomSheet.querySelector('#title');
    const size = bottomSheet.querySelector('#size');
    const weight = bottomSheet.querySelector('#weight');
    const image = bottomSheet.querySelector('#bottom-sheet-image');
    const chips = bottomSheet.querySelector('#chips');
    const gridSpec = bottomSheet.querySelector('#grid-spec');
    const chipsaltSpec = bottomSheet.querySelector('#chipsalt-spec');

    extraInfo.textContent = data.extra;
    title.textContent = data.title;
    size.textContent = data.size;
    weight.textContent = data.weight;
    image.src = data.image;
    gridSpec.innerHTML = '';
    if (data.specification) {
        data.specification.forEach(spec => {
            const specElement = document.createElement('div');
            specElement.classList.add('block-spec');
            const titleSpec = document.createElement('p');
            titleSpec.classList.add('title-spec');
            titleSpec.textContent = spec['block-spec']['title-spec'];
            const weightSpec = document.createElement('div');
            weightSpec.classList.add('weight-spec', 'alt');
            weightSpec.textContent = spec['block-spec']['weight-spec'];
            specElement.appendChild(weightSpec);
            specElement.appendChild(titleSpec);
            gridSpec.appendChild(specElement);
        });
    }
    chipsaltSpec.innerHTML = '';
    if (data.chipalt) {
        data.chipalt.forEach(chip => {
            const chipElement = document.createElement('div');
            chipElement.classList.add('block-spec', 'alt');
            const titleSpec = document.createElement('p');
            titleSpec.classList.add('title-spec');
            titleSpec.textContent = chip['block-spec']['title-spec'];
            const weightSpec = document.createElement('div');
            weightSpec.classList.add('weight-spec');
            weightSpec.textContent = chip['block-spec']['weight-spec'];
            chipElement.appendChild(weightSpec);
            chipElement.appendChild(titleSpec);
            chipsaltSpec.appendChild(chipElement);
        });
    }

    bottomSheet.classList.add('active');
    overlay.classList.add('active');

    overlay.addEventListener('click', () => {
        bottomSheet.classList.remove('active');
        overlay.classList.remove('active');
    }, { once: true }); // Ensure the event listener is added only once

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.card') && !event.target.closest('.bottom-sheet')) {
            bottomSheet.classList.remove('active');
            overlay.classList.remove('active');
        }
    }, { once: true }); // Ensure the event listener is added only once
}

function createCard(data, targetPanelId) {
    // console.log('Creating card for panel:', targetPanelId, 'with data:', data); // Add this line
    const newCard = cardTemplate.cloneNode(true);
    const sizeCard = newCard.querySelector('.size-card');
    sizeCard.textContent = data.weight;
    const textCard = newCard.querySelector('.name-card .text-card');
    textCard.textContent = data.title;
    const lexanText = newCard.querySelector('.name-card .lexan');
    lexanText.textContent = data.size;
    const image = newCard.querySelector('.image');
    image.src = data.image;
    const chips = newCard.querySelector('.chips');
    data.chip.forEach(chip => {
        const chipElement = document.createElement('p');
        chipElement.textContent = chip.value;
        chipElement.classList.add('chip');
        chipElement.classList.add(chip.type);
        if (chip.type === 'chip') {
            chipElement.classList.add('combo');
        }
        chips.appendChild(chipElement);
    });

    newCard.addEventListener('click', () => {
        showBottomSheet(data, targetPanelId);
    });

    document.getElementById(targetPanelId).appendChild(newCard);
}



// Assuming tabPanels is defined as a global variable or accessible in the scope of this function


// const getCalcLexData = async () => {
//     try {
//         const response = await fetch('./calculator.json');
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// };







// const CardValueClicks = () => {

// const sizeValues = document.querySelectorAll('input[name="radioValue"]');

// sizeValues.forEach(sizeValue => {
//     sizeValue.addEventListener('change', () => {
//         if (sizeValue.checked && parseInt(sizeValue.value) > 0) {
//             console.log(sizeValue.getAttribute('dirname'));
//         }
//     });
// });

// };



async function fetchLexanData() {
  const response = await fetch('/tare.json');
  const tareData = await response.json();
  return tareData;
}


function showBottomSheet(data, panelId) {
    const bottomSheet = document.getElementById(`bottom-sheet-${panelId}`);
    const overlay = document.getElementById(`overlay-${panelId}`);
    
    const extraInfo = bottomSheet.querySelector('#extra-info');
    const title = bottomSheet.querySelector('#title');
    const size = bottomSheet.querySelector('#size');
    const weight = bottomSheet.querySelector('#weight');
    const image = bottomSheet.querySelector('#bottom-sheet-image');
    const chips = bottomSheet.querySelector('#chips');
    const gridSpec = bottomSheet.querySelector('#grid-spec');
    const chipsaltSpec = bottomSheet.querySelector('#chipsalt-spec');

    extraInfo.textContent = data.extra;
    title.textContent = data.title;
    size.textContent = data.size;
    weight.textContent = data.weight;
    image.src = data.image;
    gridSpec.innerHTML = '';
    if (data.specification) {
        data.specification.forEach(spec => {
            const specElement = document.createElement('div');
            specElement.classList.add('block-spec');
            const titleSpec = document.createElement('p');
            titleSpec.classList.add('title-spec');
            titleSpec.textContent = spec['block-spec']['title-spec'];
            const weightSpec = document.createElement('div');
            weightSpec.classList.add('weight-spec', 'alt');
            weightSpec.textContent = spec['block-spec']['weight-spec'];
            specElement.appendChild(weightSpec);
            specElement.appendChild(titleSpec);
            gridSpec.appendChild(specElement);
        });
    }
    chipsaltSpec.innerHTML = '';
    if (data.chipalt) {
        data.chipalt.forEach(chip => {
            const chipElement = document.createElement('div');
            chipElement.classList.add('block-spec', 'alt');
            const titleSpec = document.createElement('p');
            titleSpec.classList.add('title-spec');
            titleSpec.textContent = chip['block-spec']['title-spec'];
            const weightSpec = document.createElement('div');
            weightSpec.classList.add('weight-spec');
            weightSpec.textContent = chip['block-spec']['weight-spec'];
            chipElement.appendChild(weightSpec);
            chipElement.appendChild(titleSpec);
            chipsaltSpec.appendChild(chipElement);
        });
    }

    bottomSheet.classList.add('active');
    overlay.classList.add('active');

    overlay.addEventListener('click', () => {
        bottomSheet.classList.remove('active');
        overlay.classList.remove('active'); // Hide overlay
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.card') && !event.target.closest('.bottom-sheet')) {
            bottomSheet.classList.remove('active');
            overlay.classList.remove('active'); // Hide overlay
        }
    });


    

        function dragAndMoveBottomSheet() {
            let startY = 0;
            let currentY = 0;
            let isDragging = false;
            let initialY = 0; // Add a variable to store the initial Y position

            // Define bottomSheet within the function scope
            const bottomSheet = document.getElementById(`bottom-sheet-${panelId}`);
            const overlay = document.getElementById(`overlay-${panelId}`);

            // Add event listener to start dragging when mouse or touch is pressed on the bottomSheet
            bottomSheet.addEventListener('mousedown', handleDragStart);
            bottomSheet.addEventListener('touchstart', handleDragStart);

            function handleDragStart(event) {
                isDragging = true;
                startY = event.clientY || event.touches[0].clientY; // Adjust for touch event
                initialY = parseInt(bottomSheet.style.top) || 0; // Store the initial Y position
            }

            // Event listener to track mouse or touch movement and handle dragging logic
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('touchmove', handleDragMove);

            function handleDragMove(event) {
                if (isDragging) {
                    currentY = event.clientY || event.touches[0].clientY; // Adjust for touch event
                    const diffY = currentY - startY;
                    const speed = Math.abs(diffY); // Calculate speed based on the absolute difference
                    const bottomSheetHeight = bottomSheet.clientHeight; // Get the height of the bottomSheet

                    if (diffY < 100) { // Check if dragging down
                        const maxHeight = bottomSheetHeight - 100;
                        const newTop = initialY + diffY;

                        if (newTop > 0 && newTop > maxHeight) {
                            bottomSheet.style.top = `${newTop}px`;
                            bottomSheet.style.transition = 'none';
                        } // Calculate the new top position
                    } else {
                        bottomSheet.classList.remove('active');
                        overlay.classList.remove('active');
                        isDragging = false;
                        bottomSheet.style.top = 'auto';
                    }
                }
            }

            // Event listener to stop dragging when mouse or touch is released
            document.addEventListener('mouseup', handleDragEnd);
            document.addEventListener('touchend', handleDragEnd);

            function handleDragEnd() {
                isDragging = false;
            }
        }
        dragAndMoveBottomSheet();
    }      

window.onload = function() {
    let preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    setInterval(function() {
          preloader.classList.add('preloader-hidden');
    },2700);

}

