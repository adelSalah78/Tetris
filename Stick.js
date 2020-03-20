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
    
    if(shouldStickStopMoving(currentShape)) {
        clearInterval(drawInterval);
        if(isGameOver((arr))) {
            // window.location.href = window.location.href;
            colorGameOverShape(arr,color);
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

function initStick(settings) {
    settings.draw = function () {
        currentShape = this;
        drawInterval = setInterval(moveStick,1000);
    };

    settings.rotate = function () {
        removeEmptyBlocksColoring();
        currentShape.isVertical = !currentShape.isVertical;
        if(currentShape.isVertical) {
            var shapeBlocks = currentShape.shapeBlocks;
            var oldRow = shapeBlocks[0][0];
            oldRow-=(shapeBlocks.length/2);

            if(oldRow + shapeBlocks.length > verticalBlocks) {
                oldRow = verticalBlocks - shapeBlocks.length;
            }

            var newColumn = shapeBlocks[0][1] + (shapeBlocks.length/2);
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = newColumn;
                this.shapeBlocks[i][0] = oldRow;
                oldRow ++;
            }
        }
        else {
            var shapeBlocks = currentShape.shapeBlocks;
            var oldColumn = shapeBlocks[0][1];
            oldColumn-=(shapeBlocks.length/2);
            if(oldColumn < 0)
                oldColumn = 0;
            else if(oldColumn+shapeBlocks.length > horizontalBlocks)
                oldColumn = horizontalBlocks - shapeBlocks.length;
            
            var newRow = shapeBlocks[0][0] + (shapeBlocks.length/2);
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = oldColumn;
                this.shapeBlocks[i][0] = newRow;
                oldColumn ++;
            }
        }
        moveStick();
    };

    settings.keyDown = function(event) {
        if(gameOver)
            return;
        if(event.keyCode == 37) { //left
            for(var i=0;i<this.shapeBlocks.length;i++) {
                if(this.shapeBlocks[i][1] - 1 < 0)
                    return;
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] - 1;
            }
        }
        else if(event.keyCode == 39) { //right
            for(var i=0;i<this.shapeBlocks.length;i++) {
                if(this.shapeBlocks[i][1] + 1 >= horizontalBlocks)
                    return;
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] + 1;
            }
        }
        else if(event.keyCode == 40) { //down
            clearInterval(drawInterval);
            drawInterval = setInterval(moveStick,1);
        }
        currentShape = this;
        moveStick();
    };

    settings.blocks = [];
    settings.blocks.push([-3,7]);
    settings.blocks.push([-2,7]);
    settings.blocks.push([-1,7]);
    settings.blocks.push([0,7]);
}