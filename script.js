var side = 25;
var grassArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
let gishArr = [];//gishatichneri zangvac
let monstrArr = [];//monstrneri zangvac
// let bombArr = []


var matrix = [
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [0, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 1, 0, 3, 4, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 1, 3, 0, 2, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 0, 0, 4, 0, 1, 0, 2, 1, 4, 4, 1, 1, 4, 1, 1, 1, 3, 2, 1],
    [0, 0, 3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 2, 1, 2, 1, 1, 3, 2, 1],
    [0, 0, 0, 3, 0, 1, 4, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [0, 0, 0, 3, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [2, 3, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [2, 0, 0, 3, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3, 2, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3, 2, 1],
]

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');
    // norBomb = new Bomb()

    //Կրկնակի ցիկլը լցնում է օբյեկտներով խոտերի և խոտակերների զանգվածները
    //հիմնվելով մատրիցի վրա 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                let gishatich = new Gishatich(x, y)
                gishArr.push(gishatich)
            }
            else if (matrix[y][x] == 4) {
                let monstr = new Monstr(x, y)
                monstrArr.push(monstr)
            }
            // else if (matrix[y][x] == 5) {
            //     let bomb = new Bomb
            //     bombArr.push(bomb)
            // }
        }
    }
}

//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function draw() {
    //Գծում է աշխարհը, հիմվելով matrix-ի վրա
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill("red")
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("blue")
                rect(j * side, i * side, side, side);
            }
        //     else if (matrix[i][j] == 5)
        //         fill("black")
        //     rect(j * side, i * side, side, side);
        // }
    }


    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (let i in gishArr) {
        gishArr[i].eat()
    }
    for (let i in monstrArr) {
        monstrArr[i].eat()

    }
    // for (let i in bombArr) {
    //     bombArr[i].haytnvelFunc()
    // }

    }
}