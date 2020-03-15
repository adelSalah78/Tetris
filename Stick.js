function shouldStickStopMoving(stick){
    var shapeBlocks = stick.shapeBlocks;
    var isShapeVertical = stick.isVertical;

    if(isShapeVertical) {
        var row = shapeBlocks[shapeBlocks.length -1][0];
        if(row>= verticalBlocks)
            return true;
        var column = shapeBlocks[shapeBlocks.length -1][1];
        if(shapeBlocks[shapeBlocks.length -1][0] == verticalBlocks - 1 || 
         blocks[row+1][column] == 1) {
            return true;
        }
        return false;
    }

    else {
        if(shapeBlocks[0][0] == verticalBlocks-1)
            return true;
        for(var i=0;i<shapeBlocks.length;i++) {
            var row = shapeBlocks[i][0];
            var column = shapeBlocks[i][1];
            if(blocks[row+1][column] == 1) 
                return true;
        }
        return false;
    }
}

function moveStick() {
    var arr = currentShape.shapeBlocks;
    removeEmptyBlocksColoring();
    var color = currentShape.color;
    for(var i=0;i<arr.length;i++) {
        if(arr[i][0] < 0)
            continue;
        document.getElementById("block"+arr[i][0]+"_"+arr[i][1]).style.backgroundColor = color;
    }
    if(shouldStickStopMoving(currentShape)) {
        clearInterval(drawInterval);
        if(isGameOver((arr))) {
            // window.location.href = window.location.href;
            return;
        }
        fillBlocks(currentShape);
        getNextShape();
        checkRowsToRemove();
    }
    for(var i=0;i<currentShape.shapeBlocks.length;i++) {
        currentShape.shapeBlocks[i][0] = currentShape.shapeBlocks[i][0] + 1;
    }
}