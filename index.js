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
    }
}


const main = () => {
    initializeGrid(16, 16);
}


main();