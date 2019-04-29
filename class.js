//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
        this.directions = [];

    }
    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 8) {
            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y);
                grassArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
//խոտակերի կլասը
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
        this.directions = [];
    }

    //շրջապատի հետազոտության մատրիցը
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        let fundCords = this.getDirections(1);
        let cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            let x = cord[0];
            let y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 2;
            // this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}

class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let azatTexer = this.chooseCell(0)
        let datarkTex = random(azatTexer)
        if (datarkTex) {
            let x = datarkTex[0]
            let y = datarkTex[1]
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    eat() {
        let uteluTexer = this.chooseCell(2)

        let uteluTex = random(uteluTexer)
        if (uteluTex) {
            let x = uteluTex[0]
            let y = uteluTex[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++
            this.energy++

            for (let i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1)
                }
            }
            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }
        }
        else
            this.move()
        this.energy--
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in gishArr) {
            if (this.x == gishArr[i].x && this.y == gishArr[i].y) {
                gishArr.splice(i, 1)
            }
        }
    }
    mul() {
        let azatTex = this.chooseCell(0)
        let kord = random(azatTex)
        if (kord) {
            let x = kord[0]
            let y = kord[1]
            matrix[y][x] = 2;
            let gishatich = new Gishatich(x, y)
            gishArr.push(gishatich)
        }
    }
}

class Monstr {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 3;
        this.multiply = 0;
    }


    new_directions() {
        this.directions =
            [
                [this.x - 2, this.y - 2],
                [this.x - 1, this.y - 2],
                [this.x, this.y - 2],
                [this.x + 1, this.y - 2],
                [this.x + 2, this.y - 2],
                [this.x + 2, this.y - 1],
                [this.x + 2, this.y],
                [this.x + 2, this.y + 1],
                [this.x + 2, this.y + 2],
                [this.x + 1, this.y + 2],
                [this.x, this.y + 2],
                [this.x - 1, this.y + 2],
                [this.x - 2, this.y + 2],
                [this.x - 2, this.y + 1],
                [this.x - 2, this.y],
                [this.x - 2, this.y - 1],
                [this.x - 2, this.y - 2],
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ]
    }
    chooseCell(t) {
        this.new_directions()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move() {
        let azatTexer = this.chooseCell(0)
        let qaylel = random(azatTexer)
        if (qaylel) {

            let x = qaylel[0]
            let y = qaylel[1]
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in monstrArr) {
            if (this.x == monstrArr[i].x && this.y == monstrArr[i].y) {
                monstrArr.splice(i, 1)
            }
        }

    }
    mul() {
        let datark = this.chooseCell(0)
        let bazmTex = random(datark)
        if (bazmTex) {
            let x = bazmTex[0]
            let y = bazmTex[1]
            matrix[y][x] = 4;
            let norMonstr = new Monstr(x, y)
            monstrArr.push(norMonstr)
        }
    }
    eat() {
        let emptyCells1 = this.chooseCell(2);
        let emptyCells2 = this.chooseCell(3);
        let emptyCells = emptyCells1.concat(emptyCells2);
        let newCell = random(emptyCells);
        //let uteluXotaker = this.chooseCell(2)

        //uteluGishatich = uteluGishatich.concat(uteluXotaker)
        if (newCell) {

            let x = newCell[0]
            let y = newCell[1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 2) {
                    //console.log("UTUMA XOTAKER")
                    matrix[y][x] = 4;
                    matrix[this.y][this.x] = 0
                    this.multiply++
                    this.energy++
                    for (let i in eatArr) {
                        if (x == eatArr[i].x && y == eatArr[i].y) {
                            eatArr.splice(i, 1)
                        }
                    }
                    if (this.multiply == 15) {
                        this.mul()
                        this.multiply = 0;
                    }
                    this.y = y;
                    this.x = x;
                }
                else if (matrix[y][x] == 3) {
                    //console.log("UTUMA GISHATICH")
                    matrix[y][x] = 4;
                    matrix[this.y][this.x] = 0
                    this.multiply++
                    this.energy++
                    for (let i in gishArr) {
                        if (x == gishArr[i].x && y == gishArr[i].y) {
                            gishArr.splice(i, 1)
                        }
                    }
                    if (this.multiply == 15) {
                        this.mul()
                        this.multiply = 0;
                    }
                    this.y = y;
                    this.x = x;
                }
            }

        }
        else {
            this.move()

            this.energy--
            if (this.energy <= 0) {
                this.die()
            }
        }
    }
}

// class Bomb {
//     constructor() {
//         this.x = Math.floor(random(matrix[0].length))
//         this.y = Math.floor(random(matrix.length))
//         this.jamanak = 0;
//     }
//     new_directions() {
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y],
//             [this.x + 1, this.y],
//             [this.x - 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x + 1, this.y + 1]  
//         ]
//     }
//     getDirections(t) {
//         this.new_directions();
//         var found = [];
//         for (var i in this.directions) {
//             var x = this.directions[i][0];
//             var y = this.directions[i][1];
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[y][x] == t) {
//                     found.push(this.directions[i]);
//                 }
//             }
//         }
//         return found;
//     }
//     paytel() {
        
//             var cords1 = this.getDirections(0);
//             var cords2 = this.getDirections(1);
//             var cords3 = this.getDirections(2);
//             var cords4 = this.getDirections(3);
//             var cords5 = this.getDirections(4);
            
//         console.log("hesa kgmpam")
        
//             //console.log(this.directions);
          
//             console.log("gmapc1")
//             if (matrix[y][x] == 1) {
//                 matrix[y][x] = 0;
//                 // console.log("Gmpac")
//                 for (let j in grassArr) {
//                         if (grassArr[j].x == x && grassArr[j].y == y) {
                            
//                         grassArr.splice(j, 1)
//                     }
//                 }
//             }
//             else if (matrix[y][x] == 2) {
//                 matrix[y][x] = 0;
//                 console.log("Gmpac")
//                 for (let j in eatArr) {
//                         if (eatArr[j].x == x && eatArr[j].y == y) {   
//                         eatArr.splice(j, 1)
//                     }
//                 }
//             }
//             else if (matrix[y][x] == 3) {
//                     console.log("Gmpac")
//                     matrix[y][x] = 0;
//                     for (let j in gishArr) {
//                     if (gishArr[j].x == x && gishArr[j].y == y) {
//                         gishArr.splice(j, 1)
//                     }
//                 }
//             }
//             else if (matrix[y][x] == 4) {
//                     console.log("Gmpac")
//                     matrix[y][x] = 0;
//                     for (let j in monstrArr) {
//                     if (monstrArr[j].x == x && monstrArr[j].y == y) {
//                         monstrArr.splice(j, 1)
//                     }
//                 }
//             }
        
//         matrix[this.y][this.x] = 0;
    
//         }
//     haytnvelFunc() {
//         this.jamanak++;
//         // alert(this.haytnvel)
//         if (this.jamanak >=10) {
//             console.log("mtnuma if")
//             if (matrix[this.y][this.x] == 1) {
//                 matrix[this.y][this.x] = 5;
//                 for (let i in grassArr) {
//                     if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
//                         grassArr.splice(i, 1)
//                     }
//                 }
//             }
//             else if (matrix[this.y][this.x] == 2) {
//                 matrix[this.y][this.x] = 5;
//                 for (let i in eatArr) {
//                     if (eatArr[i].x == this.x && eatArr[i].y == this.y) {
//                         eatArr.splice(i, 1)
//                     }
//                 }
//             }
//             else if (matrix[this.y][this.x] == 3) {
//                 matrix[this.y][this.x] = 5;
//                 for (let i in gishArr) {
//                     if (gishArr[i].x == this.x && gishArr[i].y == this.y) {
//                         gishArr.splice(i, 1)
//                     }
//                 }
//             }
//             else if (matrix[this.y][this.x] == 4) {
//                 matrix[this.y][this.x] = 5;
//                 for (let i in monstrArr) {
//                     if (monstrArr[i].x == this.x && monstrArr[i].y == this.y) {
//                         monstrArr.splice(i, 1)
//                     }
//                 }
//             }
//             this.paytel()
//         }
//     }
// }