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
        drawInterval = setInterval(moveLBlock,speed);
    };

    settings.rotate = function () {
        if(!shouldLBlockRotate(currentShape.rotatePosition + 1))
            return;
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
                var addition = currentShape.shapeBlocks[0][1] * -1;
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
                if(blocks[shapeBlocks[1][0]][shapeBlocks[1][1]-1] == 1 || blocks[shapeBlocks[2][0]][shapeBlocks[2][1]-1] == 1 ||
                    blocks[shapeBlocks[3][0]][shapeBlocks[3][1]-1] == 1 || blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
                    return;
            }
            else if(currentShape.rotatePosition == 2) {
                if(shapeBlocks[4][1] <=0)
                    return;
                if(blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
                    return;
            }
            else if(currentShape.rotatePosition == 3) {
                if(shapeBlocks[0][1] <=0)
                    return;
                if(blocks[shapeBlocks[0][0]][shapeBlocks[0][1]-1] == 1 || blocks[shapeBlocks[2][0]][shapeBlocks[2][1]-1] == 1 ||
                    blocks[shapeBlocks[3][0]][shapeBlocks[3][1]-1] == 1 || blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
                    return;
            }
            else if(currentShape.rotatePosition == 4) {
                if(shapeBlocks[0][1] <=0)
                    return;
                if(blocks[shapeBlocks[0][0]][shapeBlocks[0][1]-1] == 1 || blocks[shapeBlocks[1][0]][shapeBlocks[1][1]-1] == 1)
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
                if(blocks[shapeBlocks[0][0]][shapeBlocks[0][1]-1] == 1 || blocks[shapeBlocks[2][0]][shapeBlocks[2][1]-1] == 1 ||
                    blocks[shapeBlocks[3][0]][shapeBlocks[3][1]-1] == 1 || blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
                    return;   
            }
            else if(currentShape.rotatePosition == 2) {
                if(shapeBlocks[0][1] >=horizontalBlocks-1)
                    return;
                if(blocks[shapeBlocks[0][0]][shapeBlocks[0][1]-1] == 1 || blocks[shapeBlocks[1][0]][shapeBlocks[1][1]-1] == 1)
                    return;   
            }
            else if(currentShape.rotatePosition == 3) {
                if(shapeBlocks[4][1] >=horizontalBlocks-1)
                    return;
                if(blocks[shapeBlocks[1][0]][shapeBlocks[1][1]-1] == 1 || blocks[shapeBlocks[2][0]][shapeBlocks[2][1]-1] == 1 ||
                    blocks[shapeBlocks[3][0]][shapeBlocks[3][1]-1] == 1 || blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
                    return;   
            }
            else if(currentShape.rotatePosition == 4) {
                if(shapeBlocks[4][1] >=horizontalBlocks-1)
                    return;
                if(blocks[shapeBlocks[4][0]][shapeBlocks[4][1]-1] == 1)
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
function shouldLBlockRotate(nextRotatePosition) {
    if(nextRotatePosition > 4){
        nextRotatePosition = 1;
    }
    var first = currentShape.shapeBlocks[0].slice();
    var second = currentShape.shapeBlocks[1].slice();
    var third = currentShape.shapeBlocks[2].slice();
    var fourth = currentShape.shapeBlocks[3].slice();
    var fifth = currentShape.shapeBlocks[4].slice();

    if(first[0]<0 || second[0]<0 || third[0]<0 || fourth[0]<0 || fifth[0]<0) {
        return false;
    }

    if(nextRotatePosition == 1) {
        first[1]+=2;
        first[0]-=1;

        second[1] = first[1] - 1;
        second[0] = first[0];

        third[0] = first[0] +1;
        third[1] = first[1] -1;

        fourth[0] = first[0] +2;
        fourth[1] = first[1] -1;

        fifth[0] = first[0] +3;
        fifth[1] = first[1] -1;

        if(first[1] >= horizontalBlocks) {
            var subtract = first[1] - (horizontalBlocks - 1);
            // currentShape.shapeBlocks[0][1]+=subtract;
            first[1]-=subtract;
            second[1]-=subtract;
            third[1]-=subtract;
            fourth[1]-=subtract;
            fifth[1]-=subtract;
        }
        if(second[1] < 0) {
            var addition = second[1] * -1;
            first[1]+=addition;
            second[1]+=addition;
            third[1]+=addition;
            fourth[1]+=addition;
            fifth[1]+=addition;
        }
    }
    else if(nextRotatePosition == 2) {
        first[1]+=2;
        first[0]+=1;

        second[1] = first[1];
        second[0] = first[0] -1;

        third[0] = first[0] -1;
        third[1] = first[1] -1;

        fourth[0] = first[0] -1;
        fourth[1] = first[1] -2;

        fifth[0] = first[0] -1;
        fifth[1] = first[1] -3;

        if(first[1] >= horizontalBlocks) {
            var subtract = first[1] - (horizontalBlocks - 1);
            // currentShape.shapeBlocks[0][1]+=subtract;
            first[1]-=subtract;
            second[1]-=subtract;
            third[1]-=subtract;
            fourth[1]-=subtract;
            fifth[1]-=subtract;
        }
        if(fifth[1] < 0) {
            var addition = fifth[1] * -1;
            first[1]+=addition;
            second[1]+=addition;
            third[1]+=addition;
            fourth[1]+=addition;
            fifth[1]+=addition;
        }
    }
    else if(nextRotatePosition == 3) {
        first[1]-=2;
        first[0]+=1;

        second[1] = first[1] + 1;
        second[0] = first[0];

        third[0] = first[0] -1;
        third[1] = first[1] +1;

        fourth[0] = first[0] -2;
        fourth[1] = first[1] +1;

        fifth[0] = first[0] -3;
        fifth[1] = first[1] +1;

        if(fifth[1] >= horizontalBlocks) {
            var subtract = fifth[1] - (horizontalBlocks - 1);
            // currentShape.shapeBlocks[0][1]+=subtract;
            first[1]-=subtract;
            second[1]-=subtract;
            third[1]-=subtract;
            fourth[1]-=subtract;
            fifth[1]-=subtract;
        }
        if(first[1] < 0) {
            var addition = first[1] * -1;
            first[1]+=addition;
            second[1]+=addition;
            third[1]+=addition;
            fourth[1]+=addition;
            fifth[1]+=addition;
        }
    }
    else if(nextRotatePosition == 4) {
        first[1]-=2;
        first[0]-=1;

        second[1] = first[1];
        second[0] = first[0] + 1;

        third[0] = first[0] +1;
        third[1] = first[1] +1;

        fourth[0] = first[0] +1;
        fourth[1] = first[1] +2;

        fifth[0] = first[0] +1;
        fifth[1] = first[1] +3;

        if(fifth[1] >= horizontalBlocks) {
            var subtract = fifth[1] - (horizontalBlocks - 1);
            // currentShape.shapeBlocks[0][1]+=subtract;
            first[1]-=subtract;
            second[1]-=subtract;
            third[1]-=subtract;
            fourth[1]-=subtract;
            fifth[1]-=subtract;
        }
        if(first[1] < 0) {
            var addition = first[1] * -1;
            first[1]+=addition;
            second[1]+=addition;
            third[1]+=addition;
            fourth[1]+=addition;
            fifth[1]+=addition;
        }
    }
    return !(blocks[first[0]][first[1]] == 1 || blocks[second[0]][second[1]] == 1 || blocks[third[0]][third[1]] == 1 || blocks[fourth[0]][fourth[1]] == 1 || blocks[fifth[0]][fifth[1]] == 1) ;
}