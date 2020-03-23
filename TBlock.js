function moveTBlock() {
    var arr = currentShape.shapeBlocks;
    removeEmptyBlocksColoring();
    var color = currentShape.color;

    if(shouldTBlockStopMoving(currentShape)) {
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

function shouldTBlockStopMoving(tBlock) {
    var shapeBlocks = tBlock.shapeBlocks;
    if(tBlock.rotatePosition == 1) {
        if(shapeBlocks[3][0] >= verticalBlocks-1 || shapeBlocks[2][0] >= verticalBlocks-1) {
            return true;
        }

        if(blocks[shapeBlocks[2][0]+1][shapeBlocks[2][1]] == 1 || blocks[shapeBlocks[3][0]+1][shapeBlocks[3][1]] == 1) {
            return true;
        }
    }
    else if(tBlock.rotatePosition == 2) {
        if(shapeBlocks[0][0] >= verticalBlocks-1 || shapeBlocks[1][0] >= verticalBlocks-1 || shapeBlocks[2][0] >= verticalBlocks-1) {
            return true;
        }
        if(blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1 || blocks[shapeBlocks[1][0]+1][shapeBlocks[1][1]] == 1 || blocks[shapeBlocks[2][0]+1][shapeBlocks[2][1]] == 1) {
            return true;
        }
    }
    else if(tBlock.rotatePosition == 3) {
        if(shapeBlocks[3][0] >= verticalBlocks-1 || shapeBlocks[0][0] >= verticalBlocks-1) {
            return true;
        }

        if(blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1 || blocks[shapeBlocks[3][0]+1][shapeBlocks[3][1]] == 1) {
            return true;
        }
    }
    else if(tBlock.rotatePosition == 4) {
        if(shapeBlocks[3][0] >= verticalBlocks-1 || shapeBlocks[0][0] >= verticalBlocks-1 || shapeBlocks[2][0] >= verticalBlocks-1) {
            return true;
        }

        if(blocks[shapeBlocks[0][0]+1][shapeBlocks[0][1]] == 1 || blocks[shapeBlocks[3][0]+1][shapeBlocks[3][1]] == 1 ||  blocks[shapeBlocks[2][0]+1][shapeBlocks[2][1]] == 1) {
            return true;
        }
    }
    return false;
}

function initTBlock(settings) {
    settings.draw = function () {
        //TODO
        currentShape = this;
        drawInterval = setInterval(moveTBlock,speed);
    };

    settings.rotate = function () {
        //TODO
        if(!shouldTBlockRotate(currentShape.rotatePosition + 1)) {
            return;
        }
        removeEmptyBlocksColoring();
        if(currentShape.rotatePosition == 4){
            currentShape.rotatePosition = 1;
        }
        else{
            currentShape.rotatePosition++;
        }

        // var shapeBlocks = currentShape.shapeBlocks;

        if(currentShape.rotatePosition == 1){
            currentShape.shapeBlocks[0][1]+=2;

            currentShape.shapeBlocks[1][1]+=1;
            currentShape.shapeBlocks[1][0]+=1;

            currentShape.shapeBlocks[2][0]+=2;
        }
        else if(currentShape.rotatePosition == 2) {
            currentShape.shapeBlocks[2][1]-=2;

            currentShape.shapeBlocks[1][1]-=1;
            currentShape.shapeBlocks[1][0]+=1;

            currentShape.shapeBlocks[0][0]+=2;

            if(currentShape.shapeBlocks[3][1] <= 0) {
                for(var i=0;i<currentShape.shapeBlocks.length;i++) {
                    currentShape.shapeBlocks[i][1] ++;
                }
            }
        }
        else if(currentShape.rotatePosition == 3) {
            currentShape.shapeBlocks[0][1]-=2;

            currentShape.shapeBlocks[1][1]-=1;
            currentShape.shapeBlocks[1][0]-=1;

            currentShape.shapeBlocks[2][0]-=2;
        }
        else if(currentShape.rotatePosition == 4) {
            currentShape.shapeBlocks[0][0]-=2;

            currentShape.shapeBlocks[1][1]+=1;
            currentShape.shapeBlocks[1][0]-=1;

            currentShape.shapeBlocks[2][1]+=2;

            if(currentShape.shapeBlocks[3][1] >= horizontalBlocks-1) {
                for(var i=0;i<currentShape.shapeBlocks.length;i++) {
                    currentShape.shapeBlocks[i][1] --;
                }
            }
        }
        moveTBlock();
    };

    settings.keyDown = function(event) {
        //TODO
        if(gameOver)
            return;
        if(event.keyCode == 37) { //left
            var rotatePosition = currentShape.rotatePosition;
            if(rotatePosition == 1) {
                if(currentShape.shapeBlocks[3][1] <=0) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] - 1] == 1 || blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] - 1] == 1
                    || blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] - 1] == 1)
                    return;
            }
            else if(rotatePosition == 2) {
                if(currentShape.shapeBlocks[2][1] <=0) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] - 1] == 1 || blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] - 1] == 1)
                    return;
            }
            else if(rotatePosition == 3) {
                if(currentShape.shapeBlocks[0][1] <=0) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] - 1] == 1 || blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] - 1] == 1
                    || blocks[currentShape.shapeBlocks[1][0]][currentShape.shapeBlocks[1][1] - 1] == 1)
                    return;
            }
            else if(rotatePosition == 4) {
                if(currentShape.shapeBlocks[0][1] <=0) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] - 1] == 1 || blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] - 1] == 1)
                    return;
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] - 1;
            }
        }
        else if(event.keyCode == 39) { //right
            var rotatePosition = currentShape.rotatePosition;
            if(rotatePosition == 1) {
                if(currentShape.shapeBlocks[0][1] >=horizontalBlocks - 1) {
                    return;
                }

                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] + 1] == 1 || blocks[currentShape.shapeBlocks[1][0]][currentShape.shapeBlocks[1][1] + 1] == 1
                    || blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] + 1] == 1)
                    return;
            }
            else if(rotatePosition == 2) {
                if(currentShape.shapeBlocks[0][1] >=horizontalBlocks - 1) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] + 1] == 1 || blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] + 1] == 1)
                    return;
            }
            else if(rotatePosition == 3) {
                if(currentShape.shapeBlocks[3][1] >=horizontalBlocks - 1) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[0][0]][currentShape.shapeBlocks[0][1] + 1] == 1 || blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] + 1] == 1
                    || blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] + 1] == 1)
                    return;
            }
            else if(rotatePosition == 4) {
                if(currentShape.shapeBlocks[2][1] >=horizontalBlocks - 1) {
                    return;
                }
                if(blocks[currentShape.shapeBlocks[3][0]][currentShape.shapeBlocks[3][1] + 1] == 1 || blocks[currentShape.shapeBlocks[2][0]][currentShape.shapeBlocks[2][1] + 1] == 1)
                    return;
            }
            for(var i=0;i<this.shapeBlocks.length;i++) {
                this.shapeBlocks[i][1] = this.shapeBlocks[i][1] + 1;
            }
        }
        else if(event.keyCode == 40) { //down
            clearInterval(drawInterval);
            drawInterval = setInterval(moveTBlock,1);
        }
        currentShape = this;
        moveTBlock();
    };

    settings.rotatePosition = 1;

    settings.blocks = [];
    settings.blocks.push([-2,7]);
    settings.blocks.push([-1,7]);
    settings.blocks.push([0,7]);
    settings.blocks.push([-1,6]);
}

function shouldTBlockRotate(nextRotatePosition) {
    if(nextRotatePosition > 4){
        nextRotatePosition = 1;
    }

    var first = currentShape.shapeBlocks[0].slice();
    var second = currentShape.shapeBlocks[1].slice();
    var third = currentShape.shapeBlocks[2].slice();
    var fourth = currentShape.shapeBlocks[3].slice();

    if(first[0]<0 || second[0]<0 || third[0]<0 || fourth[0]<0) {
        return false;
    }

    if(nextRotatePosition == 1) {
        first[1]+=2;
        second[1]+=1;
        second[0]+=1;

        third[0]+=2;
    }
    else if(nextRotatePosition == 2) {
        third[1]-=2;

        second[1]-=1;
        second[0]+=1;

        first[0]+=2;
    }
    else if(nextRotatePosition == 3) {
        first[1]-=2;

        second[1]-=1;
        second[0]-=1;

        third[0]-=2;
    }
    else if(nextRotatePosition == 4) {
        first[0]-=2;

        second[1]+=1;
        second[0]-=1;

        third[1]+=2;
    }

    return !(blocks[first[0]][first[1]] == 1 || blocks[second[0]][second[1]] == 1 || blocks[third[0]][third[1]] == 1 || blocks[fourth[0]][fourth[1]] == 1);
}