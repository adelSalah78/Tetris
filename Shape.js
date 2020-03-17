var Shape = function(settings) {
    this.color = settings.color;
    this.isVertical = settings.isVertical;
    this.noOfBlocks = settings.noOfBlocks;
    this.name = settings.name;

    this.draw = settings.draw.bind(this);
    this.rotate = settings.rotate.bind(this);

    this.keyDown = settings.keyDown.bind(this);

    document.body.onkeydown = this.keyDown.bind(this);

    this.shapeBlocks = settings.blocks;

    this.rotatePosition = settings.rotatePosition;
}