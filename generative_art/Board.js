class Board {
    //BOARD MEASUREMENTS ARE BASED ON CELLS, NOT PIXELS
    // int sizeX;
    // int sizeY;
    // color emptyCells1;
    // color emptyCells2;
    // color head;
    // cell[][] board;
    // int cellSize;
    // int bgMode;
    // int NumOfBgs = ?;
    // int bgVar1;
    // boolean showHead = false;

    //CONSTRUCTOR
    constructor(sizeX, sizeY, cellSize) {

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.cellSize = cellSize;

        let boardHue = random(360);
        let boardSaturation = random(0, 40);
        let boardBrightness = random(20, 100);

        this.emptyCells1 = color(boardHue, boardSaturation, boardBrightness);
        this.emptyCells2 = color(boardHue, boardSaturation, boardBrightness - (boardBrightness / 8));
        // board = new cell[sizeX][sizeY];
        this.board = Array.from({ length: sizeX }, () => Array(sizeY).fill(null));

        this.head = color(170, 100, 100);
        this.bgMode = floor(random(8)); //NumOfBgs = 8
        this.bgVar1 = floor(random(5, 12));
        this.showHead = false;

        //console.log("BackgroundMode: " + this.bgMode);
        //console.log("bgVar1: " + this.bgVar1);

    }

    //METHODS
    display(x, y) {
        if (this.board[x][y] == null || this.board[x][y].invisible == true) { //if tile is empty
            switch (this.bgMode) {
                case 0:
                    //regular checkerboard
                    if ((x + y) % 2 == 0) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                case 1:
                    //diagonal stripes
                    if ((x + y) % 4 < 2) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                case 2:
                    //nxm grid
                    let limit = floor(this.bgVar1 / 2);
                    if ((x % this.bgVar1 < limit && y % this.bgVar1 < limit) || (x % this.bgVar1 >= limit && y % this.bgVar1 >= limit)) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                case 3:
                case 4: //higher chance of getting this background cause it has so much variation lol
                    if (((x ^ 2) + (y ^ 2)) % this.bgVar1 > 2)
                        fill(this.emptyCells1);
                    else
                        fill(this.emptyCells2);
                    break;
                case 5:
                    //diagonal stripes with cutoff
                    if ((x + y - (5 * this.bgVar1)) % 4 < 2) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                case 6:
                    //stripe pattern board
                    if ((this.bgVar1*(sin(y**2)))<(x%this.bgVar1)) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                case 7:
                    //radial board
                    if ((sqrt((x-this.sizeX/2)**2 + (y-this.sizeY/2)**2) % this.bgVar1) > 3) {
                        fill(this.emptyCells1);
                    } else
                        fill(this.emptyCells2);
                    break;
                default:
                    //println("error in backgroundMode");
                    break;
            }

        } else if (headCells.length > 0 && this.board[x][y] == headCells[0]) {
            if (this.showHead) fill(this.head);
            else {
                let current = this.board[x][y];
                fill(current.hue, current.sat, current.bri, 100);
            }
        } else {
            let current = this.board[x][y];//if tile is not empty
            fill(current.hue, current.sat, current.bri, 100);
        }
        //drawing squares
        rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

}
