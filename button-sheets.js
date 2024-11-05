
async function fetchLexanData() {
  const response = await fetch('/lexan-data.json');
  const lexanData = await response.json();
  return lexanData;
}

fetchLexanData().then(lexanData => {
  const cardTemplate = document.getElementById('card-template').querySelector('.card');
  const bottomSheet = document.getElementById('bottom-sheet');
  const overlay = document.getElementById('overlay');

  function showBottomSheet(data) {
      const extraInfo = bottomSheet.querySelector('#extra-info');
      const title = bottomSheet.querySelector('#title');
      const size = bottomSheet.querySelector('#size');
      const weight = bottomSheet.querySelector('#weight');
      const image = bottomSheet.querySelector('#bottom-sheet-image');
      const chips = bottomSheet.querySelector('#chips');
      const gridSpec = bottomSheet.querySelector('#grid-spec');
      const chipsaltSpec = bottomSheet.querySelector('#chipsalt-spec');

      // New section for chipsalt
      extraInfo.textContent = data.extra;
      title.textContent = data.title;
      size.textContent = data.size;
      weight.textContent = data.weight;
      image.src = data.image;
      gridSpec.innerHTML = ''; // Clear previous gridSpec
      if (data.specification) {
          data.specification.forEach(spec => {
              const specElement = document.createElement('div');
              specElement.classList.add('block-spec');
              const titleSpec = document.createElement('p');
              titleSpec.classList.add('title-spec');
              titleSpec.textContent = spec['block-spec']['title-spec'];
              const weightSpec = document.createElement('div');
              weightSpec.classList.add('weight-spec');
              weightSpec.textContent = spec['block-spec']['weight-spec'];
              specElement.appendChild(weightSpec);
              specElement.appendChild(titleSpec);
              gridSpec.appendChild(specElement);
          });
      }
      chipsaltSpec.innerHTML = ''; // Clear previous chipsaltSpec
      if (data.chipalt) {
          data.chipalt.forEach(chip => {
              const chipElement = document.createElement('div');
              chipElement.classList.add('block-spec', 'alt');
              const titleSpec = document.createElement('p');
              titleSpec.classList.add('title-spec');
              titleSpec.textContent = chip['block-spec']['title-spec'];
              const weightSpec = document.createElement('div');
              weightSpec.classList.add('weight-spec', 'plastic', 'metal');
              weightSpec.textContent = chip['block-spec']['weight-spec'];
              chipElement.appendChild(titleSpec);
              chipElement.appendChild(weightSpec);
              chipsaltSpec.appendChild(chipElement);
          });
      }
      bottomSheet.classList.add('active');
      overlay.classList.add('active'); // Show overlay
  }

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

  function createCard(data) {
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
          const chipElement = document.createElement('div');
          chipElement.textContent = chip.value;
          chipElement.classList.add(chip.type === 'plastic' ? 'plastic' : 'metal');
          chips.appendChild(chipElement);
      });

      function addCardClickListener(cardElement, data) {
          cardElement.addEventListener('click', () => {
              showBottomSheet(data);
          });
      }

      addCardClickListener(newCard, data);
      document.body.appendChild(newCard);
  }

  lexanData.lexans.forEach(data => {
      createCard(data);
  });

  document.addEventListener('click', (event) => {
      if (!event.target.closest('.card') && !event.target.closest('.bottom-sheet')) {
          bottomSheet.classList.remove('active');
      }
  });
});