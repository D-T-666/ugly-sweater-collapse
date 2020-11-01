class Matcher {
    constructor() {
        this.patterns = [];
    }

    addPattern(pattern, neighbor, direction) {
        if (this.patterns[pattern] != undefined) {
            this.patterns[pattern][direction].push(neighbor);
        } else {
            this.patterns[pattern] = [[], [], [], []];
        }
    }

    match(my_states, neighbor_states) {
        let nStates = my_states;

        for (let direction = 0; direction < 4; direction++) {
            // get all the possible neighbors for each neighbor in the oposite direction
            let neighbor_posibilities = [];
            for (let state of neighbor_states[direction]) {
                neighbor_posibilities.push(...this.patterns[state][(direction + 2) % 4]);
            }

            let update_states = [];
            for (let state of nStates) {
                if (neighbor_posibilities.indexOf(state) != -1) {
                    update_states.push(state);
                }
            }
            // console.log(nStates);
            nStates = update_states;
        }

        return nStates;
    }

    static tileCompatible(a, b, direction) {
        let A = 0;
        let B = 1;

        if (direction == 0) {
            A = [...a];
            A.pop();
            B = [...b];
            B.shift();
        } else if (direction == 1) {
            A = [...a];
            A = transpose2DArray(A);
            A.pop();
            B = [...b];
            B = transpose2DArray(B);
            B.shift();
        } else if (direction == 2) {
            A = [...a];
            A.shift();
            B = [...b];
            B.pop();
        } else if (direction == 3) {
            A = [...a];
            A = transpose2DArray(A);
            A.shift();
            B = [...b];
            B = transpose2DArray(B);
            B.pop();
        }

        return arrayIsEqual(A, B);
    }
}

function transpose2DArray(arr) {
    let nArr = [];
    for (let i = 0; i < arr[0].length; i++) {
        nArr[i] = [];
        for (let j = 0; j < arr.length; j++) {
            nArr[i][j] = arr[j][i];
        }
    }
    return nArr;
}

function flip1DArray(arr) {
    let nArr = [];
    for (let i = arr.length - 1; i > -1; i--) {
        nArr.push(arr[i]);
    }
    return nArr;
}

function arrayIsEqual(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
}

function Min(lis) {
    let minmum = Infinity;
    for (let elt of lis) {
        minmum = (elt < minmum) ? elt : minmum;
    }
    return minmum;
}