let currentColor = '';

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
            newSquare.style.backgroundColor = currentColor;
        });
    }
}


const initializeColorPalette = (randomColorPalette) => {
    const colorPaletteContainer = document.querySelector('.color-palette-container'); 
    randomColorPalette.forEach((color) => {
        const colorToIncorporateToTheColorPaletteContainer = document.createElement('div');
        colorToIncorporateToTheColorPaletteContainer.className = 'color';
        colorToIncorporateToTheColorPaletteContainer.style.backgroundColor = color.rgb;
        colorPaletteContainer.appendChild(colorToIncorporateToTheColorPaletteContainer);
        colorToIncorporateToTheColorPaletteContainer.addEventListener('click', (event) => {
            currentColor = event.target.style.backgroundColor;
        });
    });
}


const getRandomColorPalette = async () => {
    let randomColorPalette = [];
    const res = await fetch('https://x-colors.yurace.pro/api/random?number=12');
    randomColorPalette = await res.json();
    return randomColorPalette;
}


const main = async () => {
    initializeGrid(32, 32);
    initializeColorPalette(await getRandomColorPalette());
}


main();