/*Main method for my program.
 *below is a list of the random variables that change each iteration, what they do, and in which class and method you can find and change them.
 *you can change them manually if you want, by commenting out the random function, and replacing it with the desired value
 *Here's an example of setting "randomVariable" to 1
 *BEFORE: int randomVariable = random(1,20);
 *AFTER:  int randomVariable = 1; //random(1,20);
 
 MAIN CLASS:
   GLOBAL VARS (line 52)
   sizeX  - canvas width
   sizeY  - canvas length
   //processing is a bit strange in that you can't use variables in the size() method in setup()
   //so when you change sizeX and sizeY, you also have to change the respective values in size() in setup()... line
   
   SETUP METHOD (line 63)
   frameRate()  - changes how quickly cells grow
   cellSize  - size of each square in the grid. Should be a multiple of 10, though nothing bad happens if its not
   numRoots  - number of head cells that spawn in the beginning. making this value really high is cool
   
   SPAWNROOT METHOD (line 76)
   a  - x value of root to be spawned. must be between 1 and board size
   b  - y value of root to be spawned. must be between 1 and board size
   rootHue, rootSat, rootVal  - initial hue saturation and value of the root node to be spawned
      turnProbability  - the probability that each new cell grown will point in a different direction than its parent
   //cells have a 1 in turnProbability chance of changing direction when they're grown, setting this value really
   //low (~2) or really high (1000+) gives interesting results
   
   INVISIBLEBOX METHOD (line 240)
   boxSize  - size of the invisible box. must be smaller than the canvas
   boxStartX, boxStartY  - top-left x and y coordinates of the invisible box

 BOARD CLASS
   GLOBAL VARIABLES (line 13)
   showHead  - whether or not the head node will be highlighted or not. Good for troubleshooting (and entertaining), bad for pictures.
   
   CONSTRUCTOR (line 16)
   boardHue, boardSaturation, boardBrightness  - hue saturation and brightness of empty tiles on the board
   emptyCells1  - background colour 1. by default it is the lighter colour and uses boardHue, boardSaturation, boardBrightness.
   emptyCells2  - background colour 2. by default it is the darker colour and uses boardHue, boardSaturation, boardBrightness.
   head  - the colour of the current cell being operated on in the main method. 
   bgMode  - a number between 0 and 4 (inclusive). my favourite is 4.
   bgVar1  - used in some of the background modes as a miscellaneous variable to acheive certain looks. 
   
   
 
*/
//GLOBAL VARS
//I would recommend not changing MAX_NODE_PLACEMENT_ATTEMPTS, 
let MAX_NODE_PLACEMENT_ATTEMPTS = 3;
let sizeX = 500;
let sizeY = 500;
let cellSize;
let headCells = [];
let canvas;
let numRoots;

//Hyper parameters
let hyper_temperature = 0; //how erratic the results are. Scales between -1 and 1
let hyper_isRandomColourMode = true; //whether to use random colours or the user selected colour.
let hyper_colourHue = 0; //colour that the user has selected. Scales between 0 and 360.
let hyper_boardSize = 0; //0 = small, 1 = medium, 2 = large



function setup() {
    let canvas = createCanvas(sizeX, sizeY);
    canvas.parent('canvas-container');
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();
    frameRate(100);

    // UI Event Listeners
    let tempSlider = select('#temperature');
    let randomColorCheckbox = select('#random-color');
    let hueSlider = select('#hue');

    // Initialize UI values
    tempSlider.value(hyper_temperature);
    randomColorCheckbox.checked(hyper_isRandomColourMode);
    hueSlider.value(hyper_colourHue);

    tempSlider.input(() => {
        hyper_temperature = parseFloat(tempSlider.value());
    });

    randomColorCheckbox.changed(() => {
        hyper_isRandomColourMode = randomColorCheckbox.checked();
    });

    hueSlider.input(() => {
        hyper_colourHue = parseFloat(hueSlider.value());
    });
    resetSketch();
}

function resetSketch() {
    headCells = [];
    switch (hyper_boardSize){
        case 0: //small
            cellSize = 5 * ((floor(random(5, 12))));
            break;
        case 1: //normal
            cellSize = 5 * ((floor(random(3, 8))));
            break;
        case 2: //large
            cellSize = 5 * ((floor(random(1, 4))));
            break;
        default:
            cellSize = 5 * ((floor(random(2, 10))));
            break;
    }
    
    numRoots = floor(random(1, 6));
    //println("number of roots: " + numRoots);

    canvas = new Board(floor(sizeX / cellSize), floor(sizeY / cellSize), cellSize);
    background(canvas.emptyCells2);
    for (let i = 0; i < numRoots; i++) {
        spawnRoot();
    }
    if (random(100) < 33) {
        invisibleBox();
        //println("box spawned");
    }
    //print(hyper_colourHue);
}

function draw() {
    if (headCells.length > 0) {
        let c = headCells.shift();
        let result = c;

        while (result == c) {
            //keep looping back until a cell can successfully grow
            result = grow(c.x, c.y);

            if (result == c) {
                //if growth failed
                if (c.prev != null) {
                    c = c.prev;
                    c.changeDirection();
                    result = c;

                    if (random(100) > 98 && c.prev != null) {
                        //avoiding the cell getting stuck on t-intersections
                        //println("Skipped");
                        c = c.prev;
                        c.changeDirection();
                        result = c;
                    }
                } else {
                    //if c.prev is null
                    println("removed c");
                    displayAll();
                    return;
                }

            }
        }
        if (result != null) headCells.push(result);
        displayAll();
    }
}

//METHODS
function spawnRoot() {
    let a = floor(random(2, ((sizeX) / cellSize) - 2));
    let b = floor(random(2, ((sizeY) / cellSize) - 2));
    let rootHue;
    let rootSat;
    let rootVal;
    if (hyper_isRandomColourMode) {
        rootHue = random(360);
    } else {
        rootHue = hyper_colourHue + floor(random(-40, 20))
            rootHue = rootHue % 360;
        print(rootHue);
    }
    if (hyper_isRandomColourMode) {
        rootSat = random(20, 100);
    } else {
        rootSat = random(0, 100);
    }
    rootVal = random(20, 100);

    //println("Initial colour is (" + rootHue + "," + rootSat + "," + rootVal + ")");
    let turnProbability = (((hyper_temperature + 1) ** 3) * floor((random(0, 30)))) + 2;
    canvas.board[a][b] = new Cell(a, b, rootHue, rootSat, rootVal, false, turnProbability); //places the root cell somewhere random on the board 
    headCells.push(canvas.board[a][b]);
}

function displayAll() {
    for (let i = 0; i < floor(sizeX / cellSize); i++) {
        for (let j = 0; j < floor(sizeY / cellSize); j++) {
            canvas.display(i, j);
        }
    }
}
function grow(x, y) {
    //places a cell in front of the current headcell, based on the head cells direction
    let parent = canvas.board[x][y];

    let childX = 0;
    let childY = 0;
    for (let i = 0; i < MAX_NODE_PLACEMENT_ATTEMPTS; i++) { //n attempts to place a node
        switch (parent.dir) {
            case 0:
                childX = x;
                childY = y - 1;
                break;
            case 1:
                childX = x + 1;
                childY = y;
                break;
            case 2:
                childX = x;
                childY = y + 1;
                break;
            case 3:
                childX = x - 1;
                childY = y;
                break;
            default:
                print("unknown direction error");
                break;
        }
        let proposedChild = new Cell(parent, childX, childY);
        if (!checkTileValidityNew(proposedChild, parent.dir)) {
            //if it's not valid, change the direction
            //println("unable to place tile at " + childX + ", " + childY + ", it's occupied by " + canvas.board[childX][childY]);
            parent.changeDirection();
        } else {
            //if it is valid, place it
            canvas.board[childX][childY] = proposedChild;
            return proposedChild;
        }
    }
    //if after n attempts of changing direction tile cannot be placed
    return parent;
}
function checkTileValidityNew(c, parentDir) {
    //returns whether or not a cell can be placed at its coordinates
    let i = c.x;
    let j = c.y;
    if (!((floor(sizeX / cellSize) - 1 > j && j > 0) && (floor(sizeY / cellSize) - 1 > i && i > 0))) {
        //if cell c would go outside of the array bounds
        return false;
    }

    // Safely check bounds for neighbors since JS arrays can be sparse/undefined
    try {
        let b = canvas.board; //Accessing global canvas object
        switch (parentDir) {
            case 0:
                //if the 5 tiles around the front of the proposed tile are null, placement is valid
                if (b[i - 1][j] == null &&
                    b[i - 1][j - 1] == null &&
                    b[i][j - 1] == null &&
                    b[i + 1][j - 1] == null &&
                    b[i + 1][j] == null) {
                    return true;
                }
                break;
            case 1:
                if (b[i][j - 1] == null &&
                    b[i + 1][j - 1] == null &&
                    b[i + 1][j] == null &&
                    b[i + 1][j + 1] == null &&
                    b[i][j + 1] == null) {
                    return true;
                }
                break;
            case 2:
                if (b[i - 1][j] == null &&
                    b[i - 1][j + 1] == null &&
                    b[i][j + 1] == null &&
                    b[i + 1][j + 1] == null &&
                    b[i + 1][j] == null) {
                    return true;
                }
                break;
            case 3:
                if (b[i][j - 1] == null &&
                    b[i - 1][j - 1] == null &&
                    b[i - 1][j] == null &&
                    b[i - 1][j + 1] == null &&
                    b[i][j + 1] == null) {
                    return true;
                }
                break;
            default:
                print("error in new tile validity checker method");
                break;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function invisibleBox() {
    let boxSize = floor(random(5, sizeX / (2 * cellSize)));
    let boxStartX = floor(random(5, (sizeX / cellSize) - boxSize - 5));
    let boxStartY = floor(random(5, (sizeY / cellSize) - boxSize - 5));

    for (let x = boxStartX; x < boxStartX + boxSize; x++) {
        for (let y = boxStartY; y < boxStartY + boxSize; y++) {
            canvas.board[x][y] = new Cell(x, y, true);
        }
    }
    return true;
}

// Helper for println
function println(msg) {
    console.log(msg);
}

function print(msg) {
    console.log(msg);
}
