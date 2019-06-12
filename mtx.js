class Matrix {
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(this.rows);

        for(let i = 0; i < this.rows; i++){
            this.data[i] = new Array(cols);
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] = 0;
            }
        }
    }

    // Randomize a matrix
    rand(n = 1){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                this.data[i][j] += Math.random() * n;
            }
        }
    }

    // Show the matrix in the console as a table
    show(){
        console.table(this.data);
    }

    toArray(){
        let arr = [];
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    // Transopose this matrix
    trans(){
        let res = new Matrix(this.cols, this.rows);
        for(let i = 0; i < res.rows; i++){
            res.data[i] = new Array(res.cols);
            for(let j = 0; j < res.cols; j++){
                res.data[i][j] = this.data[j][i];
            }
        }
        for(let i = 0; i < res.rows; i++){
            this.data[i] = new Array(res.cols);
            for(let j = 0; j < res.cols; j++){
                this.data[i][j] = res.data[i][j];
            }
        }
        this.cols = res.cols;
        this.rows = res.rows;
    }

    // Maping Function. It takes a function that work on every element of the Matrix
    map(func){
        for(let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                let val = this.data[i][j];
                this.data[i][j] = func(val);
            }
        }
    }

    // Add another matrix or a number
    add(n){
        if (typeof n === "number"){
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] += n;
                }
            }
        } else if (n instanceof Matrix){
            if(n.rows === this.rows && n.cols === this.cols){
                for(let i = 0; i < this.rows; i++){
                    for(let j = 0; j < this.cols; j++){
                        this.data[i][j] += n.data[i][j];
                    }
                }
            } else {
                console.error("The matrix A need the same rows that the matrix B.")
            }
        } else {
            console.error("You can't add this becouse B is not a Matrix instance or a number.")
        }
    }

    // Multiply
    mult(n){
        if(typeof n === "number"){
            // Scalar Product
            for(let i = 0; i < this.rows; i++){
                for(let j = 0; j < this.cols; j++){
                    this.data[i][j] *= n;
                }
            }
        } else {
            // Hadamard Product
            if(n instanceof Matrix){
                for(let i = 0; i < this.rows; i++){
                    for(let j = 0; j < this.cols; j++){
                        this.data[i][j] *= n.data[i][j];
                    }
                }
            } else {
                console.error(`Columns of ${this} must match rows of ${n}`);
                return undefined;
            }
        }
    }



    // ------------------------STATIC METHODS-------------------------- //

    // Multiply as a static method
    static mult(a, b){
        // Dot Product
        if(a instanceof Matrix && b instanceof Matrix){
            // Make a new result matrix
            let result = new Matrix(a.rows, b.cols);
            for(let i = 0; i < result.rows; i++){
                result.data[i] = new Array(b.cols);
                for(let j = 0; j < result.cols; j++){
                    result.data[i][j] = 0;
                }
            }
            // Multiplying
            for(let i = 0; i < result.rows; i++){
                for(let j = 0; j < result.cols; j++){
                    let sum = 0;
                    for(let k = 0; k < a.cols; k++){
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    result.data[i][j] = sum;
                }
            }
            return result;
        } else {
            console.error(`Columns of A must match rows of B`);
            return undefined;
        }
    }

    // Subtract two matrix
    static subtr(a, b){
        if (a.rows === b.rows){
            let res = new Matrix(a.rows, a.cols);
            for(let i = 0; i < res.rows; i++){
                for(let j = 0; j < res.cols; j++){
                    res.data[i][j] = a.data[i][j] - b.data[i][j];
                }
            }
            return res;
        }
    }

    // Maping Function as a static method
    static map(matrix, func){
        if (matrix instanceof Matrix){
            for(let i = 0; i < matrix.rows; i++){
                for(let j = 0; j < matrix.cols; j++){
                    let val = matrix.data[i][j];
                    matrix.data[i][j] = func(val);
                }
            }
            return matrix;
        } else {
            console.error(`The ${matrix} matrix needs to be a instance of Matrix constructor.`)
        }
    }

    //Transpose another matrix
    static trans(matrix){
        if(matrix instanceof Matrix){
            let res = new Matrix(matrix.cols, matrix.rows);
            for(let i = 0; i < res.rows; i++){
                res.data[i] = new Array(res.cols);
                for(let j = 0; j < res.cols; j++){
                    res.data[i][j] = matrix.data[j][i];
                }
            }
            return res;
        } else {
            console.error(`The ${matrix} matrix needs to be a instance of Matrix constructor.`)
        }
    }

    //Make a matrix from an Array
    static fromArray(arr = [], rows = null, cols = null){
        if (rows === null && cols === null) {
            let matrix = new Matrix(arr.length, 1);
            for (let i = 0; i < matrix.rows; i++) {
                matrix.data[i][0] = arr[i];
            }
            return matrix;
        } else {
            // I HAVE TO FINISH THIS 
            if (typeof rows === 'number' && typeof cols === 'number') {
                // I HAVE TO PUT SOME CODE HERE ;-;
            }
        }
    }
}