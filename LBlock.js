function moveLBlock() {
    var arr = currentShape.shapeBlocks;
    removeEmptyBlocksColoring();
    var color = currentShape.color;

    if(shouldLBlockStopMoving(currentShape)) {
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

function shouldLBlockStopMoving(lBlock) {
    var shapeBlocks = lBlock.shapeBlocks;
    if(lBlock.rotatePosition == 1) {
        if(shapeBlocks[4][0] >= verticalBlocks -1) {
            return true;
        }
        if(blocks[shapeBlocks[4][0]+1][shapeBlocks[4][1]] == 1 || (shapeBlocks[0][0] >=0 && blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1)) {
            return true;
        }
    }
    else if(lBlock.rotatePosition == 2) {
        if(shapeBlocks[0][0] < 0) {
            return false;
        }
        if(shapeBlocks[0][0] >= verticalBlocks -1) {
            return true;
        }
        if(blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1 || blocks[shapeBlocks[2][0]+1][shapeBlocks[2][1]] == 1 ||
        blocks[shapeBlocks[3][0]+1][shapeBlocks[3][1]] == 1 || blocks[shapeBlocks[4][0]+1][shapeBlocks[4][1]] == 1) {
            return true;
        }
    }
    else if(lBlock.rotatePosition == 3) {
        if(shapeBlocks[0][0] < 0 || shapeBlocks[1][0] < 0) {
            return false;
        }

        if(shapeBlocks[0][0] >= verticalBlocks -1) {
            return true;
        }
        
        if(blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1 || blocks[shapeBlocks[1][0]+1][shapeBlocks[1][1]] == 1) {
            return true;
        }
    }
    else if(lBlock.rotatePosition == 4) {
        if(shapeBlocks[4][0] < 0) {
            return false;
        }

        if(shapeBlocks[4][0] >= verticalBlocks -1) {
            return true;
        }

        if(blocks[shapeBlocks[2][0]+1][shapeBlocks[2][1]] == 1 || blocks[shapeBlocks[3][0]+1][shapeBlocks[3][1]] == 1 || blocks[shapeBlocks[4][0]+1][shapeBlocks[4][1]] == 1) {
            return true;
        }
    }
    return false;
}

function initLBlock(settings) {
    settings.draw = function () {
        //TODO
        currentShape = this;
        drawInterval = setInterval(moveLBlock,1000);
    };

    settings.rotate = function () {
        removeEmptyBlocksColoring();
        if(currentShape.rotatePosition == 4){
            currentShape.rotatePosition = 1;
        }
        else{
            currentShape.rotatePosition++;
        }

        if(currentShape.rotatePosition == 1){
            currentShape.shapeBlocks[0][1]+=2;
            currentShape.shapeBlocks[0][0]-=1;

            currentShape.shapeBlocks[1][1] = currentShape.shapeBlocks[0][1] - 1;
            currentShape.shapeBlocks[1][0] = currentShape.shapeBlocks[0][0];

            currentShape.shapeBlocks[2][0] = currentShape.shapeBlocks[0][0] +1;
            currentShape.shapeBlocks[2][1] = currentShape.shapeBlocks[0][1] -1;

            currentShape.shapeBlocks[3][0] = currentShape.shapeBlocks[0][0] +2;
            currentShape.shapeBlocks[3][1] = currentShape.shapeBlocks[0][1] -1;

            currentShape.shapeBlocks[4][0] = currentShape.shapeBlocks[0][0] +3;
            currentShape.shapeBlocks[4][1] = currentShape.shapeBlocks[0][1] -1;

            if(currentShape.shapeBlocks[0][1] >= horizontalBlocks) {
                var subtract = currentShape.shapeBlocks[0][1] - (horizontalBlocks - 1);
                // currentShape.shapeBlocks[0][1]+=subtract;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]-=subtract;
            }
            if(currentShape.shapeBlocks[1][1] < 0) {
                var addition = currentShape.shapeBlocks[1][1] * -1;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]+=addition;
            }
        }
        else if(currentShape.rotatePosition == 2){
            currentShape.shapeBlocks[0][1]+=2;
            currentShape.shapeBlocks[0][0]+=1;

            currentShape.shapeBlocks[1][1] = currentShape.shapeBlocks[0][1];
            currentShape.shapeBlocks[1][0] = currentShape.shapeBlocks[0][0] -1;

            currentShape.shapeBlocks[2][0] = currentShape.shapeBlocks[0][0] -1;
            currentShape.shapeBlocks[2][1] = currentShape.shapeBlocks[0][1] -1;

            currentShape.shapeBlocks[3][0] = currentShape.shapeBlocks[0][0] -1;
            currentShape.shapeBlocks[3][1] = currentShape.shapeBlocks[0][1] -2;

            currentShape.shapeBlocks[4][0] = currentShape.shapeBlocks[0][0] -1;
            currentShape.shapeBlocks[4][1] = currentShape.shapeBlocks[0][1] -3;

            if(currentShape.shapeBlocks[0][1] >= horizontalBlocks) {
                var subtract = currentShape.shapeBlocks[0][1] - (horizontalBlocks - 1);
                // currentShape.shapeBlocks[0][1]+=subtract;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]-=subtract;
            }
            if(currentShape.shapeBlocks[4][1] < 0) {
                var addition = currentShape.shapeBlocks[4][1] * -1;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]+=addition;
            }
        }
        else if(currentShape.rotatePosition == 3){
            currentShape.shapeBlocks[0][1]-=2;
            currentShape.shapeBlocks[0][0]+=1;

            currentShape.shapeBlocks[1][1] = currentShape.shapeBlocks[0][1] + 1;
            currentShape.shapeBlocks[1][0] = currentShape.shapeBlocks[0][0];

            currentShape.shapeBlocks[2][0] = currentShape.shapeBlocks[0][0] -1;
            currentShape.shapeBlocks[2][1] = currentShape.shapeBlocks[0][1] +1;

            currentShape.shapeBlocks[3][0] = currentShape.shapeBlocks[0][0] -2;
            currentShape.shapeBlocks[3][1] = currentShape.shapeBlocks[0][1] +1;

            currentShape.shapeBlocks[4][0] = currentShape.shapeBlocks[0][0] -3;
            currentShape.shapeBlocks[4][1] = currentShape.shapeBlocks[0][1] +1;

            if(currentShape.shapeBlocks[4][1] >= horizontalBlocks) {
                var subtract = currentShape.shapeBlocks[4][1] - (horizontalBlocks - 1);
                // currentShape.shapeBlocks[0][1]+=subtract;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]-=subtract;
            }
            if(currentShape.shapeBlocks[0][1] < 0) {
                var addition = currentShape.shapeBlocks[1][1] * -1;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]+=addition;
            }
        }
        else if(currentShape.rotatePosition == 4){
            currentShape.shapeBlocks[0][1]-=2;
            currentShape.shapeBlocks[0][0]-=1;

            currentShape.shapeBlocks[1][1] = currentShape.shapeBlocks[0][1];
            currentShape.shapeBlocks[1][0] = currentShape.shapeBlocks[0][0] + 1;

            currentShape.shapeBlocks[2][0] = currentShape.shapeBlocks[0][0] +1;
            currentShape.shapeBlocks[2][1] = currentShape.shapeBlocks[0][1] +1;

            currentShape.shapeBlocks[3][0] = currentShape.shapeBlocks[0][0] +1;
            currentShape.shapeBlocks[3][1] = currentShape.shapeBlocks[0][1] +2;

            currentShape.shapeBlocks[4][0] = currentShape.shapeBlocks[0][0] +1;
            currentShape.shapeBlocks[4][1] = currentShape.shapeBlocks[0][1] +3;

            if(currentShape.shapeBlocks[4][1] >= horizontalBlocks) {
                var subtract = currentShape.shapeBlocks[4][1] - (horizontalBlocks - 1);
                // currentShape.shapeBlocks[0][1]+=subtract;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]-=subtract;
            }
            if(currentShape.shapeBlocks[0][1] < 0) {
                var addition = currentShape.shapeBlocks[0][1] * -1;
                for(var i=0;i<currentShape.shapeBlocks.length;i++)
                    currentShape.shapeBlocks[i][1]+=addition;
            }
        }
        moveLBlock();
    }

    settings.keyDown = function(event) {
        if(gameOver)
            return;
        var shapeBlocks = currentShape.shapeBlocks;
        if(event.keyCode == 37) { //left
            if(currentShape.rotatePosition == 1) {
                if(shapeBlocks[1][1] <=0)
                    return;
            }
            else if(currentShape.rotatePosition == 2) {
                if(shapeBlocks[4][1] <=0)
                    return;
            }
            else if(currentShape.rotatePosition == 3) {
                if(shapeBlocks[0][1] <=0)
                    return;
            }
            else if(currentShape.rotatePosition == 4) {
                if(shapeBlocks[0][1] <=0)
                    return;
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] - 1;
            }
        }
        else if(event.keyCode == 39) { //right
            if(currentShape.rotatePosition == 1) {
                if(shapeBlocks[0][1] >=horizontalBlocks-1)
                    return;   
            }
            else if(currentShape.rotatePosition == 2) {
                if(shapeBlocks[0][1] >=horizontalBlocks-1)
                    return;   
            }
            else if(currentShape.rotatePosition == 3) {
                if(shapeBlocks[4][1] >=horizontalBlocks-1)
                    return;   
            }
            else if(currentShape.rotatePosition == 4) {
                if(shapeBlocks[4][1] >=horizontalBlocks-1)
                    return;   
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] + 1;
            }
        }
        else if(event.keyCode == 40) { //down
            clearInterval(drawInterval);
            drawInterval = setInterval(moveLBlock,1);
        }
        currentShape = this;
        moveLBlock();
    };

    settings.rotatePosition = 1;

    settings.blocks = [];
    settings.blocks.push([-3,7]);
    settings.blocks.push([-3,6]);
    settings.blocks.push([-2,6]);
    settings.blocks.push([-1,6]);
    settings.blocks.push([0,6]);
}