/* author: Zhenyang Liu */
let winWidth = window.innerWidth;
let winWheight = window.innerHeight;
let filesSet = ["images/basicface.png", "images/normalbeard.png", "images/normalmouse.png"];
let canvas = document.getElementById("doraemon_canvas");
let context = canvas.getContext("2d");
let currentExpressions = "neutral";
initAndStart(context, drawEyes_button, "images/normaleye.png", 0, 0);

// Here default values are set for some of the parameters, while increasing the flexibility of function calls.
function initAndStart(context, callback=false, eyeSrc="images/normaleye.png", lPX=0, lPY=0) {
  // Clear the content that exists on the canvas
  context.clearRect(0, 0, 1060, 1080);
  loadImages(context, filesSet, draw);
  /*The reason for setting the timer here is to allow the eyes to be rendered last so that they are not overwritten. 
  This is because there may be bugs in the order of execution in some browsers.
  Although there are more advanced ways to solve this, this simple solution is an effective solution.*/
  setTimeout(() => {
    if (callback==drawEyes_button) {
      callback(context, eyeSrc, lPX, lPY)
    };
  }, 150);
}

// Functions for loading multiple images
function loadImages(context, filenames, callback) {
  let doraemonImages = new Array(filenames.length);
  let imageCount = 0;
  for (let i=0; i<filenames.length; ++i) {
    doraemonImages[i] = new Image();
    // make sure the image has been loaded
    doraemonImages[i].onload = function() {
      imageCount++; 
      if (imageCount==filenames.length) callback(context, doraemonImages);
    }
    doraemonImages[i].src = filenames[i];
  }
}

// Functions for drawing multiple images
function draw(context, doraemonImages) {
  for (let i=0; i<doraemonImages.length; ++i) {
    context.drawImage(doraemonImages[i], 0, 0);
  }
}

// Functions for drawing eyes
function drawEyes_button(context, imgSrc, posX, posY) {
  let img = new Image();
  img.onload = function() { 
    context.drawImage(img, posX, posY);
  }
  img.src = imgSrc;
}

// Add button click events
var doubleClickTimer;
var buttonNeutral = document.getElementById("neutral");
buttonNeutral.addEventListener('click', function(){
  // If the timer exists, the user has actually double-clicked the element
  if (doubleClickTimer) {
    // Clear the timer to stop the click event from happening
    // The clearTimeout function fails in some browsers emulating mobile functionality, such as Firefox, but in real tests there are no problems.
    clearTimeout(doubleClickTimer); 
    doubleClickTimer = null;
    // Handling double click events
    // Change the image to be drawn
    filesSet[1] = "images/normalbeard.png";
    filesSet[2] = "images/normalmouse.png";
    //Add an eyes element to the end of the array
    filesSet.push("images/normaleye.png");
    initAndStart(context)
    // Remove an element at the end of an array
    filesSet.pop();
    eyesOpen = true;
    // Restore the initial position of the eye
    latestPositionX = 0;
    latestPositionY = 0;
    // Call the animation for Initialisation
    initAnimation('neutral')
  }else{
    // Otherwise, the user has only clicked once.
    // Setting the one double event timer
    doubleClickTimer = setTimeout(function() {
      // If the timer is not cancelled within the specified time, the following events will be executed(ONE click).
      doubleClickTimer = null;
      filesSet[1] = "images/normalbeard.png";
      filesSet[2] = "images/normalmouse.png";
      if (eyesOpen==false){
        filesSet.push("images/closedeye.png");
        initAndStart(context);
        filesSet.pop();
      }else{
        // Drawing the picture including the final position of the eye.
        initAndStart(context, drawEyes_button, "images/normaleye.png", latestPositionX, latestPositionY);
      }
      currentExpressions = "neutral";
      // Call the animation for changing expressions
      changeAnimation()
    }, 300); // Set the timer to 300 milliseconds 
  }
}, false);

/* Much the same logic as the previous click event. 
The same points will not be repeatedly annotated. */
var buttonFearful = document.getElementById("fearful");
buttonFearful.addEventListener('click', function(){
  if (doubleClickTimer) {
    clearTimeout(doubleClickTimer);
    doubleClickTimer = null;
    // Modify the image file to the file corresponding to the current expression.
    filesSet[1] = "images/fearfulbeard.png";
    filesSet[2] = "images/fearfulmouse.png";
    filesSet.push("images/fearfuleye.png");
    initAndStart(context)
    filesSet.pop();
    eyesOpen = true;
    latestPositionX = 0;
    latestPositionY = 0;
    initAnimation('fearful')
  }else{
    doubleClickTimer = setTimeout(function() {
      doubleClickTimer = null;
      // Modify the image file to the file corresponding to the current expression.
      filesSet[1] = "images/fearfulbeard.png";
      filesSet[2] = "images/fearfulmouse.png";
      if (eyesOpen==false){
        filesSet.push("images/closedeye.png");
        initAndStart(context);
        filesSet.pop();
      }else{
        initAndStart(context, drawEyes_button, "images/fearfuleye.png", latestPositionX, latestPositionY);
      }
      currentExpressions = "fearful";
      changeAnimation()
    }, 300); 
  }
}, false);

/* Much the same logic as the previous click event. 
The same points will not be repeatedly annotated. */
var buttonHappy = document.getElementById("happy");
buttonHappy.addEventListener('click', function(){
  if (doubleClickTimer) {
    clearTimeout(doubleClickTimer);
    doubleClickTimer = null;
    // Modify the image file to the file corresponding to the current expression.
    filesSet[1] = "images/happymouse.png";
    filesSet[2] = "images/happybeard.png";
    filesSet.push("images/happyeye.png");
    initAndStart(context)
    filesSet.pop();
    eyesOpen = true;
    latestPositionX = 0;
    latestPositionY = 0;
    initAnimation('happy')
  }
  else{
    doubleClickTimer = setTimeout(function() {
      doubleClickTimer = null;
      // Modify the image file to the file corresponding to the current expression.
      filesSet[1] = "images/happymouse.png";
      filesSet[2] = "images/happybeard.png";
      if (eyesOpen==false){
        filesSet.push("images/closedeye.png");
        initAndStart(context);
        filesSet.pop();
      }else{
        initAndStart(context, drawEyes_button, "images/happyeye.png", latestPositionX, latestPositionY);
      }
      currentExpressions = "happy";
      changeAnimation()
    }, 300); 
  }
}, false);

//Set variables for recording eye status and position.
let eyesOpen = true;
var latestPositionX = 0;
var latestPositionY = 0;
canvas.addEventListener('click', function(event) {
  /* As I used css to compress the canvas size, thus solving the problem of the original canvas not being sharp in high resolution screens. 
  The coordinates need to be scaled in the handling of the canvas click event to ensure that the click range is consistent with the setting.*/
  var scaledWidth = doraemon_canvas.clientWidth;
  var scaledHeight = doraemon_canvas.clientHeight;
  // Get the coordinates of the marker in the canvas
  var x = event.offsetX;
  var y = event.offsetY;
  var eyesX = 0;
  var eyesY = 0;

  // Functions related to drawing pictures
  function drawEyes(context, imgSrc, posX, posY) {
    let img = new Image();
    img.onload = function() { 
      context.drawImage(img, posX, posY);
    }
    img.src = imgSrc;
  }

  function initAndStart2(context) {
    context.clearRect(0, 0, 1060, 1080);
    loadImages2(context, filesSet, draw2);
  }

  function loadImages2(context, filenames, callback) {
    let doraemonImages = new Array(filenames.length);
    let imageCount = 0;
      for (let i=0; i<filenames.length; ++i) {
        doraemonImages[i] = new Image();
        doraemonImages[i].onload = function() {
          imageCount++; 
          if (imageCount==filenames.length) callback(context, doraemonImages);
        }
        doraemonImages[i].src = filenames[i];
      }
  }

  function draw2(context, doraemonImages) {
    for (let i=0; i<doraemonImages.length; ++i) {
      context.drawImage(doraemonImages[i], 0, 0);
    }
  }

  // Set a rectangle object to determine if the click event occurred in the eye area.
  var rect = {
    height: scaledHeight*0.2443,
    width: scaledWidth*0.383,
    //200/653
    x: scaledWidth*0.306,
    y: scaledHeight*0.0458
  };
  // Treatment of the eye state
  if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
    var eyes = "images/normaleye.png"
    initAndStart2(context)
    if (eyesOpen==true){
      // Close-eye process
      eyes = "images/closedeye.png"
      eyesOpen=false
      drawEyes(context, eyes, 0, 0)
    }else{
      // Open-eye process
      if(currentExpressions === "neutral"){
        eyes = "images/normaleye.png"
      }else if(currentExpressions === "happy"){
        eyes = "images/happyeye.png"
      }else{
        eyes = "images/fearfuleye.png"
      }
      eyesOpen=true
      drawEyes(context, eyes, latestPositionX, latestPositionY)
    } 
  
  }else{
    // The part that controls the movement of the eyes.
    // Calculates the position of the mouse click and the angle of the set visual centre.
   var angle = Math.atan2(y - scaledHeight*0.313, x - scaledWidth*0.505);
   var distance = Math.sqrt((x - scaledWidth*0.54) * (x - scaledWidth*0.54) + (y - scaledHeight*0.313) * (y - scaledHeight*0.313));

   // Calculate which direction the image should be moved.
   var dx = Math.cos(angle);
   var dy = Math.sin(angle);
   /* Since I debugged the range in a state with a width of 653 and a height of 655, 
   some of the coefficients relate to them.*/
   var eyesRangeFactorX = 653/scaledWidth;
   var eyesRangeFactorY = 655/scaledHeight;

   // Calculate the distance to be moved
   // For anime character styling reasons, different ranges have different movement factors.
   if(dy < 0){
    eyesY += dy * distance * 0.28*eyesRangeFactorY;
    eyesX += dx * distance * 0.07*eyesRangeFactorX;
   }
   else{
    eyesY += dy * distance * 0.065*eyesRangeFactorY;
    eyesX += dx * distance * 0.05*eyesRangeFactorX;
   }
   //Making clones 
   latestPositionX = JSON.parse(JSON.stringify(eyesX));
   latestPositionY = JSON.parse(JSON.stringify(eyesY));
   initAndStart2(context)
   if(currentExpressions === "neutral"){
      eyes = "images/normaleye.png"
    }
   else if(currentExpressions === "happy"){
      eyes = "images/happyeye.png"
    }
   else{
      eyes = "images/fearfuleye.png"
    }
   drawEyes(context, eyes, eyesX, eyesY)
   eyesOpen=true;
  }
});

// Screen animation effects section
const buttons = document.querySelectorAll(".button");
const init = document.querySelectorAll(".init");
const stars = document.querySelectorAll(".star");
const loopPos = document.getElementById("loop");

function initAnimation(status){
  // Responsive design for different pages
  if(status=='neutral'){
    if(winWidth < 992){
      loopPos.style.top ='130.5vw'
    }
    else{
      loopPos.style.top ='19vw';
    }
  }
  else if(status=='happy'){
    if(winWidth < 992){
      loopPos.style.top ='142.5vw'
    }
    else{
      loopPos.style.top ='28vw';
    }
  }
  else{
    if(winWidth < 992){
      loopPos.style.top ='154.5vw'
    }
    else{
      loopPos.style.top ='37vw';
    }
  }

  // Modify CSS to reveal elements
  init.forEach((element) => {
    element.style.display = 'block';
  });

  // Control the disappearance of elements
  setTimeout(() => {
    init.forEach((element) => {
      element.style.display = 'none';
    });
  }, 800);
}

function changeAnimation(){
  stars.forEach((star) => {
    star.style.display = 'block';
  });

  setTimeout(() => {
    // Change the style attribute of the image again so that it is hidden
    stars.forEach((star) => {
      star.style.display = 'none';
    });
  }, 800);
}

const waterSpray = document.getElementById("waterSpray");
const src = waterSpray .getAttribute('src'); 
buttonNeutral.addEventListener('click', () => {
  // Reload the images to ensure that the animations appear approximately the same.
  waterSpray .setAttribute('src', `${src}?t=${Date.now()}`);
  waterSpray.style.display = 'block';
  if(winWidth < 992){
    waterSpray.style.top = '131.5vw';
  }
  else{
    waterSpray.style.top = '21.7vw';
  }
  setTimeout(() => {
    waterSpray.style.display = 'none';
  }, 400);
})

buttonHappy.addEventListener('click', () => {
  waterSpray .setAttribute('src', `${src}?t=${Date.now()}`);
  waterSpray.style.display = 'block';
  if(winWidth < 992){
    waterSpray.style.top = '143.5vw';
  }
  else{
    waterSpray.style.top = '30.7vw';
  }
  setTimeout(() => {
    waterSpray.style.display = 'none';
  }, 400);
})

buttonFearful.addEventListener('click', () => {
  waterSpray .setAttribute('src', `${src}?t=${Date.now()}`);
  waterSpray.style.display = 'block';
  if(winWidth < 992){
    waterSpray.style.top = '155.5vw';
  }
  else{
    waterSpray.style.top = '39.7vw';
  }
  setTimeout(() => {
    waterSpray.style.display = 'none';
  }, 400);
})

const blueFlashes = document.querySelectorAll('.blueFlash');
canvas.addEventListener('click', () => {
  blueFlashes.forEach((blueFlash) => {
    blueFlash.style.display = 'block';
  });

  setTimeout(() => {
    blueFlashes.forEach((blueFlash) => {
      blueFlash.style.display = 'none';
    });
  }, 600);
})
