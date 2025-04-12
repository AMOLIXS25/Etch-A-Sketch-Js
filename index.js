let currentColor = '';
let resolution = 16;
let eraserMode = false;


const initializeGrid = (resolutionWidth, resolutionHeight) => {
    const totalResolution = resolutionWidth * resolutionHeight;
    const squareWidth = 100 / resolutionWidth;
    const squareHeight = 100 / resolutionHeight;
    const drawingGridContainer = document.querySelector('.drawing-grid-container');
    for (let i = 0; i < totalResolution; i++) {
        const newSquare = document.createElement('div');
        newSquare.className = 'square';
        newSquare.style.cssText = `width: ${squareWidth}%; height: ${squareHeight}%`;
        drawingGridContainer.appendChild(newSquare);
        newSquare.addEventListener('mouseover', () => {  
            if (eraserMode && newSquare.style.backgroundColor == currentColor) {
                newSquare.style.backgroundColor = 'transparent';
            } else if (!eraserMode) {
                newSquare.style.backgroundColor = currentColor;
            }
        });
    }
}


const resetGrid = () => {
    const drawingGridContainer = document.querySelector('.drawing-grid-container');
    drawingGridContainer.textContent = '';
    initializeGrid(resolution, resolution);
}


const initializeColorPalette = (randomColorPalette) => {
    const colorPaletteContainer = document.querySelector('.color-palette-container'); 
    randomColorPalette.forEach((color) => {
        const colorToIncorporateToTheColorPaletteContainer = document.createElement('div');
        colorToIncorporateToTheColorPaletteContainer.className = 'color';
        colorToIncorporateToTheColorPaletteContainer.style.backgroundColor = color.rgb;
        colorPaletteContainer.appendChild(colorToIncorporateToTheColorPaletteContainer);
        colorToIncorporateToTheColorPaletteContainer.addEventListener('click', (event) => {
            resetAllActiveClassNameForColorToThePaletteColor();
            event.target.className = 'color active';
            event.target.textContent = '✒️'
            eraserMode = false;
            currentColor = event.target.style.backgroundColor;
        });
    });
}


const resetAllActiveClassNameForColorToThePaletteColor = () => {
    const allColors = document.querySelectorAll('.color');
    allColors.forEach((color) => {
        color.textContent = '';
        color.className = 'color';
    });
}


const changeColorPalette = async () => {
    const colorPaletteContainer = document.querySelector('.color-palette-container'); 
    colorPaletteContainer.textContent = '';
    initializeColorPalette(await getRandomColorPalette());
}


const getRandomColorPalette = async () => {
    let randomColorPalette = [];
    const res = await fetch('https://x-colors.yurace.pro/api/random?number=12');
    randomColorPalette = await res.json();
    return randomColorPalette;
}


const resetGridButtonListenerManager = () => {
    const resetGridButton = document.querySelector('.reset-button');
    resetGridButton.addEventListener('click', () => {
        resetGrid();
    })
}


const changePaletteColorButtonListenerManager = () => {
    const changePaletteColorButton = document.querySelector('.change-palette-color-button');
    changePaletteColorButton.addEventListener('click', () => {
        changeColorPalette();
    });
}


const changeResolutionButtonListenerManager = () => {
    const resetGridButton = document.querySelector('.change-resolution-button');
    resetGridButton.addEventListener('click', () => {
        while (true) {
            newResolution = parseInt(prompt('Enter a new resolution max 100'));
            if (newResolution <= 100) break;
            else alert('Max 100 !') 
        }
        resolution = newResolution;
        resetGrid();
    })
}

const eraserCurrentColorListenerManager = () => {
    const body = document.querySelector('body');
    body.addEventListener('keypress', (event) => {
        if (event.key === 'r') {
            const activeColorToThePaletteColor = document.querySelector('.active');
            if (eraserMode === true) {
                activeColorToThePaletteColor.textContent = '✒️';
                eraserMode = false;
            } else {
                eraserMode = true;
                activeColorToThePaletteColor.textContent = '🧽';
            }
        }
    });
}


const main = async () => {
    initializeGrid(resolution, resolution);
    initializeColorPalette(await getRandomColorPalette());
    resetGridButtonListenerManager();
    changeResolutionButtonListenerManager();
    changePaletteColorButtonListenerManager();
    eraserCurrentColorListenerManager();
}


main();