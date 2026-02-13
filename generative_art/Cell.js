class Cell {
    //CONSTRUCTORS

    //Converted from multiple constructors in Java to a single constructor handling different arguments
    constructor(arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        this.root = false;
        this.invisible = false;
        this.dir = 0; //direction, 0 = North, 1 = East, 2 = South, 3 = West
        this.prev = null;

        // Check for "spawnRoot" style constructor: 
        // cell(int x, int y, int hue, int sat, int bri, boolean invisible, int turnProbability)
        if (arguments.length === 7) {
            //ROOT CELL CONSTRUCTOR
            this.x = arg1;
            this.y = arg2;
            this.hue = arg3;
            this.sat = arg4;
            this.bri = arg5;
            this.invisible = arg6;
            this.turnProbability = arg7;

            this.prev = null;
            this.root = true;
            //console.log("turnProbability = " + this.turnProbability);
            this.dir = floor(random(4));

        } else if (arguments.length === 3 && typeof arg1 === 'object') {
            // cell(cell creator, int x, int y)
            let creator = arg1;
            this.x = arg2;
            this.y = arg3;

            this.prev = creator;
            this.dir = creator.dir;

            //turning
            this.turnProbability = creator.turnProbability;
            if (floor(random(this.turnProbability)) === 0) {
                this.changeDirection();
            }

            //colour
            this.hueChangeSpeed = (((random(0, 1))**(hyper_temperature+1)) / (min(numRoots,4)));
            if (hyper_isRandomColourMode == false){
                this.hueChangeSpeed/=2;
            }
            if (creator.hue < 360)
                this.hue = creator.hue + this.hueChangeSpeed;
            else
                this.hue = 0;

            this.sat = creator.sat;
            this.bri = creator.bri;
            this.invisible = creator.invisible;

        } else if (arguments.length === 3 && typeof arg3 === 'boolean') {
            // cell(int x, int y, boolean invisible)
            this.x = arg1;
            this.y = arg2;
            this.invisible = arg3;

            this.prev = null;
            this.root = false;
            this.dir = 0;
        }
    }

    //METHODS
    changeDirection() {
        if (floor(random(2)) === 1)
            if (this.dir < 3) this.dir++; //turn clockwise
            else this.dir = 0;
        else
            if (this.dir > 0) this.dir--; //turn counter-clockwise
            else this.dir = 3;
    }
}
