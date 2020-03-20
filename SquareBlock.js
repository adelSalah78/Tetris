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
            colorGameOverShape(arr,color);
            return;
        }
        fillBlocks(currentShape);
        colorShapeStopMoving(arr,color);
        checkRowsToRemove();
        getNextShape();
        return;
    }

    colorShapeStopMoving(arr,color);

    for(var i=0;i<currentShape.shapeBlocks.length;i++) {
        currentShape.shapeBlocks[i][0] = currentShape.shapeBlocks[i][0] + 1;
    }
}

function initSquareBlock(settings){
    settings.draw = function () {
        //TODO
        currentShape = this;
        drawInterval = setInterval(moveSBlock,speed);
    };

    settings.rotate = function () {
        //TODO
    };

    settings.keyDown = function(event) {
        //TODO
        if(gameOver)
            return;
        if(event.keyCode == 37) { //left
            if(this.shapeBlocks[0][1] - 1 < 0)
                return;
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] - 1;
            }
        }
        else if(event.keyCode == 39) { //right
            if(this.shapeBlocks[this.shapeBlocks.length-1][1] + 1 >= horizontalBlocks)
                return;
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] + 1;
            }
        }
        else if(event.keyCode == 40) { //down
            clearInterval(drawInterval);
            drawInterval = setInterval(moveSBlock,1);
        }
        currentShape = this;
        moveSBlock();
    };

    settings.blocks = [];
    settings.blocks.push([-2,6]);
    settings.blocks.push([-2,7]);
    settings.blocks.push([-1,6]);
    settings.blocks.push([-1,7]);
}