// Cache DOM elements for efficient access and manipulation
const $imgProdMain = $('#img-product-main');
const $imgSubs = $('.img-subs img');
const $price = $('#price');
const $priceValue = $('#price-value');
const $totalValue = $('#total-value');
const $quantity = $('#quantity');
const $color = $(`input[name='color']`);
const $colorValue = $('#color-value');
const $size = $('#size-value');
const $sizes = $(`input[name='size']`);
const $submit = $('#submit');

// Define constants for product color and model variations
const blackFront = 'black-front';
const redFront = 'red-front';
const greyFront = 'grey-front';

const blackBack = 'black-back';
const redBack = 'red-back';
const greyBack = 'grey-back';

const blackNoModel = 'black-no-model';
const redNoModel = 'red-no-model';
const greyNoModel = 'grey-no-model';

// Initialize variables for image management and product settings
let currentProdImgIdx = 0;
const imgProdPath = './resources/product-images/';

let formErrors = false;
let price = 20;
let sltColor = 'black';


// Array of images representing different product models for the black color variant
subImgs = [blackNoModel, blackFront, blackBack];

// Initialize validation for the submit button and set up event listener for size changes
validateSubmit();
$sizes.on('change', validateSubmit);

// Update the size display value when a new size is selected from the size radio buttons
$sizes.on('change', function () {
    $size.attr('value', `Size: ` + $(this).val().toUpperCase());
});

// Function to validate the form submission based on whether a size is selected
function validateSubmit() {

    const $isSizeChecked = $(`input[name='size']:checked`);
    if ($isSizeChecked.length > 0) {
        $submit.val('Add to cart');
        $submit.prop('disabled', false);
    } else {
        $submit.val('Choose a size');
        $submit.prop('disabled', true);
    }
}

// Arrays of images for different color variants of the product
const blackImgs = [blackNoModel, blackFront, blackBack];
const redImgs = [redNoModel, redFront, redBack];
const greyImgs = [greyNoModel, greyFront, greyBack];

// Set the default images array to the black color variant
let defaultProdImg = blackImgs;


// Function to update the main image based on the current image index
function mainProdImgFtn(img) {
    $imgProdMain.attr({
        'src': `${imgProdPath}t-shirt-${img[currentProdImgIdx]}.jpg`,
        'alt': `${img[currentProdImgIdx]}`
    });
}

// Initialize the main image with the default color variant images
mainProdImgFtn(defaultProdImg);

// Update thumbnail images with default color variant images and apply styling
$imgSubs.each(function (index, element) {
    $(element).attr({
        'src': `${imgProdPath}t-shirt-${defaultProdImg[index]}.jpg`,
        'alt': `${defaultProdImg[index]}`
    });

    $(element).css('border-bottom', 'darkslategrey 2px solid');
});

// Set up the quantity input field with a minimum value of 1 and default value of 1
$quantity.attr({
    'min': 1,
    'value': 1,
});

// Update the price display with the formatted price value
$priceValue.attr('value', `Price: $ ${price.toFixed(2)}`);

// Update the total price display with the formatted total value and apply bold font weight
$totalValue.attr('value', `Total: $ ${price.toFixed(2)}`).css('font-weight', 'bold');

// Update total price based on the quantity input
$quantity.on('input', function () {
    const newPrice = $(this).val() * price;
    $totalValue.attr('value', `Total: $ ${newPrice.toFixed(2)}`).css('font-weight', 'bold');
});

// Set default color option and update color display
const colorAry = ['black', 'red', 'grey'];
$(`input[name="color"][value="${sltColor}"]`).prop('checked', true);
$colorValue.attr('value', `Color: ${sltColor.toUpperCase()}`);

// Handle color change event to update selected color and images
$color.change(function () {
    sltColor = $(this).val();
    $colorValue.attr('value', `Color: ${sltColor.toUpperCase()}`);
    updateImages(sltColor);
});

// Update images based on the selected color
function updateImages(color) {
    let subImgs;
    switch (color) {
        case 'black':
            subImgs = blackImgs;
            break;
        case 'red':
            subImgs = redImgs;
            break;
        case 'grey':
            subImgs = greyImgs;
            break;
        default:
            subImgs = blackImgs;
            break;
    }

    // Update thumbnail images and border style
    $imgSubs.each(function (index, element) {
        $(element).attr({
            'src': `${imgProdPath}t-shirt-${subImgs[index]}.jpg`,
            'alt': `${subImgs[index]}`
        });

        $(element).css('border-bottom', '2px solid darkslategrey');
    });

    // Update default images and main image
    defaultProdImg = subImgs;
    mainProdImgFtn(defaultProdImg);
}

// Change main image on thumbnail click
$imgSubs.click(function () {
    currentProdImgIdx = $(this).index();
    $imgProdMain.attr({
        'src': `${imgProdPath}t-shirt-${defaultProdImg[currentProdImgIdx]}.jpg`,
        'alt': `${defaultProdImg[currentProdImgIdx]}`
    });
});

// Change main image on thumbnail hover
$imgSubs.mouseover(function () {
    currentProdImgIdx = $(this).index();
    $imgProdMain.attr({
        'src': `${imgProdPath}t-shirt-${defaultProdImg[currentProdImgIdx]}.jpg`,
        'alt': `${defaultProdImg[currentProdImgIdx]}`
    });
});

// Form submission handler
function submitForm(event) {
    validateSubmit();
    formErrors = false;
    if (formErrors) {
        event.preventDefault();
    } else {
        console.log("Added to cart!!!");
    }
}

// Event listener for form submission
$submit.on('submit', submitForm);



// Cache DOM elements for efficient access and manipulation
const $main = $('#main-2');
const $pContent = $('#p-content');
const $imgBikeMain = $('#img-bike-main');
const $start = $('#start');
const $stop = $('#stop');
const $popup = $('#popup');
const $closePopup = $('#close-popup');

// Initialize variables for the image rotation functionality
let currentBikeImgIdx = 0;
const imgPath = './resources/product-images-2/';
let images = [];
const minImg = 1;
const maxImg = 34;
const delay = 100;
let popupDelay = 3000;
let isMaxImg = false;
let isMinImg = false;
let isBikeAnimationStarted = false;
let isBikeAnimationRunning = true;


let defaultBikeImg = '';
let ltdRaceAnimation;
let popupTimeout;
const pageLoaded = Date.now();

// Load image paths into the images array
for (let i = minImg; i <= maxImg; i++) {
    images[i] = `${imgPath}bike-${i}.jpg`;
}

// Initialize the main image with the default image
defaultBikeImg = `${imgPath}bike-1.jpg`;
mainBikeImgFtn(defaultBikeImg);

// Function to update the main image based on the current image index
function mainBikeImgFtn(img) {
    $imgBikeMain.attr({
        'src': `${img}`,
        'alt': `${img}`
    });
}

// Set a timeout to show the popup after a delay if the Start button is not clicked
popupTimeout = setTimeout(function () {
    $popup.css({
        'opacity': '1',
        'display': 'block'
    }); // Show the popup
    $main.addClass('overlay'); // Add a dark overlay to the background
}, popupDelay);

// Function to start the image rotation
function startRace() {
    // Ensure the animation only runs if it has been started
    if (!isBikeAnimationStarted) {
        return;
    }

    isBikeAnimationRunning = false;

    // Update the current image index to rotate the images
    if (!isMaxImg) {
        currentBikeImgIdx++;
        if (currentBikeImgIdx === maxImg) {
            isMaxImg = true;
            isMinImg = false;
        }
    } else {
        currentBikeImgIdx--;
        if (currentBikeImgIdx === minImg) {
            isMinImg = true;
            isMaxImg = false;
        }
    }

    mainBikeImgFtn(`${images[currentBikeImgIdx]}`);

    // Continue the animation with a delay
    setTimeout(function () {
        ltdRaceAnimation = requestAnimationFrame(startRace);
    }, delay);
}

// Event listener for the Start button
$start.click(function () {
    const timeLoaded = Date.now() - pageLoaded;
    isBikeAnimationStarted = true;

    // Prevent starting the animation if it is already running
    if (!isBikeAnimationRunning) {
        return;
    }

    // Clear the popup timeout if the Start button is clicked within the popup delay
    if (timeLoaded <= popupDelay) {
        clearTimeout(popupTimeout);
    }

    // Start the animation
    ltdRaceAnimation = requestAnimationFrame(startRace);
});

// Function to stop the image rotation
function stopRace() {
    isBikeAnimationRunning = true;
    isBikeAnimationStarted = false;
    cancelAnimationFrame(ltdRaceAnimation);
}

// Event listener for the Stop button
$stop.click(stopRace);

// Event listener for the Close button on the popup
$closePopup.click(function () {
    $popup.css({
        'opacity': '1',
        'display': 'none'
    }); // Hide the popup
    $main.removeClass('overlay'); // Remove the dark overlay
});

