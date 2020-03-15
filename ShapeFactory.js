function ShapeFactory(number) {
    var getShape = function() {
        var settings = {};
        var randomColorIndex = Math.floor(Math.random()*(colors.length -1));
        // randomColorIndex-=1;
        settings.color = colors[randomColorIndex];
        settings.isVertical = true;
        settings.noOfBlocks = shapes[number].blocksNumber;
        settings.name = shapes[number].name;

        if(settings.name == 'stick') {
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

        if(settings.name == 'sBlock') {
            settings.draw = function () {
                //TODO
                currentShape = this;
                drawInterval = setInterval(moveSBlock,1000);
            };

            settings.rotate = function () {
                //TODO
            };

            settings.keyDown = function(event) {
                //TODO
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
            settings.blocks.push([-1,6]);
            settings.blocks.push([-1,7]);
            settings.blocks.push([0,6]);
            settings.blocks.push([0,7]);
        }

        return new Shape(settings);
    }
    return getShape;
}