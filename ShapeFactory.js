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

        if(settings.name == 'sBlock') {
            initSquareBlock(settings);
        }

        if(settings.name == 'tBlock') {
            initTBlock(settings);
        }

        if(settings.name == 'lBlock') {
            initLBlock(settings);
        }

        return new Shape(settings);
    }
    return getShape;
}