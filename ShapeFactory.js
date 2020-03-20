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
            initStick(settings);
        }

        else if(settings.name == 'sBlock') {
            initSquareBlock(settings);
        }

        else if(settings.name == 'tBlock') {
            initTBlock(settings);
        }

        else if(settings.name == 'lBlock') {
            initLBlock(settings);
        }
        else if(settings.name == 'nBlock') {
            initNBlock(settings);
        }

        return new Shape(settings);
    }
    return getShape;
}