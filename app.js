const navLinks = document.querySelectorAll('nav input[type="radio"]');

navLinks.forEach((link, index) => {
  link.addEventListener('change', () => {
    // Update the text content of the hero-one element
    document.querySelector('h2.hero-one').textContent = link.value;

    // Dynamically set iconId based on the index of the clicked link
    const iconId = `icon${index + 1}`; // Assuming icon IDs are sequentially numbered
    const iconSource = document.querySelector(`#${iconId}`).src;
    
    // Update the hero-icon source
    document.querySelector('.hero-icon').src = iconSource;
  });
});
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  
  // Add leading zeros if necessary
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  // Display the time
  const timeString = `${hours}:${minutes}`;
  document.getElementById('time').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Set up the initial clock display
updateClock();

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen();  
    } else if (document.documentElement.webkititRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

function lockZoom(event) {
  event.preventDefault(); // Prevent the default zoom behavior
}





const tabs = document.querySelectorAll('nav input[type="radio"]');
const tabPanels = document.querySelectorAll('.content');

// Function to show all content in panel1 and hide other content
function showPanel1Content() {
  tabPanels.forEach((panel) => {
    if (panel.id !== 'panel1') {
      panel.style.display = 'none'; 
    } else {
      panel.style.display = 'block';
    }
  });
}

// Call the function to show panel1 content initially
showPanel1Content();

tabs.forEach((tab) => {
  tab.addEventListener('change', (e) => {
    // Hide all tab panels except the current one
    tabPanels.forEach((panel) => {
      if (panel.id !== `panel${e.target.id.slice(-1)}`) {
        panel.style.display = 'none';
      }
    });

    // Show the current tab panel
    const panelId = `panel${e.target.id.slice(-1)}`;
    document.getElementById(panelId).style.display = 'block';

    // Update the clock when the tab changes
    updateClock();
  });
});



