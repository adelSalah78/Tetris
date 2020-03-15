function shouldSBlockStopMoving(sBlock) {
    var shapeBlocks = sBlock.shapeBlocks;
    var firstRow = shapeBlocks[0][0];
    var half = shapeBlocks.length / 2;
    var firstCol = shapeBlocks[0][1];
    if(firstRow+half>= verticalBlocks)
        return true;
    var result =  blocks[firstRow+half][firstCol] == 1 || blocks[firstRow+half][firstCol + 1] == 1;        
    return result;
}

function moveSBlock() {
    var arr = currentShape.shapeBlocks;
    removeEmptyBlocksColoring();
    var color = currentShape.color;

    if(shouldSBlockStopMoving(currentShape)) {
        clearInterval(drawInterval);
        if(isGameOver((arr))) {
            // window.location.href = window.location.href;
            return;
        }
        fillBlocks(currentShape);
        getNextShape();
        checkRowsToRemove();
    }

    for(var i=0;i<arr.length;i++) {
        if(arr[i][0] < 0)
            continue;
        document.getElementById("block"+arr[i][0]+"_"+arr[i][1]).style.backgroundColor = color;
    }

    for(var i=0;i<currentShape.shapeBlocks.length;i++) {
        currentShape.shapeBlocks[i][0] = currentShape.shapeBlocks[i][0] + 1;
    }
}