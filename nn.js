class NeuronalNetwork {
    constructor(input_nodes = Number(), hidden_nodes = Number(), output_nodes = Number()){
        this.i_nodes = input_nodes;
        this.h_nodes = hidden_nodes;
        this.o_nodes = output_nodes;

        this.weigths_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weigths_ih.rand();
        
        this.weigths_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weigths_ho.rand();

        this.bias_h = new Matrix(this.h_nodes, 1);
        this.bias_h.rand();

        this.bias_o = new Matrix(this.o_nodes, 1);
        this.bias_o.rand();

        this.lr = 0.1;
    }


    // Esto es usado para escalar un numero a una escala del 0 al 1
    sigmoid(x){
        return 1 / (1 + Math.E**-x);
    }


    // Esto es la Deribada de la funcion sigmoide. Se utiliza en el "Gradient Descent".
    dsigmoid(y){
        return y * (1 - y);
    }


    // Esta funcion pasa todos los inputs a traves de la NN y devuelve un array con los outputs.
    feedforward(input_array){
        let input = Matrix.fromArray(input_array);
        
        let hidden = Matrix.mult(this.weigths_ih, input);
        hidden.add(this.bias_h);
        // Activation function
        hidden.map(this.sigmoid);

        let output = Matrix.mult(this.weigths_ho, hidden);
        output.add(this.bias_o);
        output.map(this.sigmoid);

        return output.toArray();
    }


    // Esta funcion es para "entrenar" a la NN. 
    // Lo que en realidad hace es encontrar los valores mas optimos para los parametros weights y bias,
    // calculando los errores de cada capa desde los outputs hasta los inputs
    train(input_arr, answer){
        
        let input = Matrix.fromArray(input_arr);
        let hidden = Matrix.mult(this.weigths_ih, input);
        let output = this.feedforward(input_arr);

        hidden.add(this.bias_h);
        // Activation function. Esto escala los valores de los inputs en valores de 0 a 1.
        hidden.map(this.sigmoid);

        
        // Convert Arrs in to matrix
        output = Matrix.fromArray(output);
        answer = Matrix.fromArray(answer);

        // Esto calcula el output_error que es la diferencia entre los outputs obtenidos y los valores deseados.
        let o_error = Matrix.subtr(answer, output);

        // Esto calcula el hidden_error que es la multiplicacion entre los o_error y la transpuesta de los weigths de hidden to output
        let weigths_ho_T = Matrix.trans(this.weigths_ho);
        let h_error = Matrix.mult(weigths_ho_T, o_error);


        // variacion de los weigths_ho
        // DeltaW_ho = lr * o_error * (output * (1 - output)) * hidden_T
        let gradient = Matrix.map(output, this.dsigmoid);           // (output * (1 - output)) = gradient       
        gradient.mult(o_error);                                     // gradient * o_error
        gradient.mult(this.lr);                                     // gradient * lr
 
        let hidden_T = Matrix.trans(hidden);                        // hidden_T

        // la variacion del deltaW_ho es la multiplicacion del gradiente por el error de esta capa (output_layer), 
        // por el learning ratio(lr), por la transpuesta de la capa anterior (en este caso es la hidden_layer).
        let deltaW_ho = Matrix.mult(gradient, hidden_T);
        
        // bias_o
        this.bias_o.add(gradient);

        // adding the weigths
        this.weigths_ho.add(deltaW_ho);


        // variacion de los weigths_ih 
        // DeltaW_ih = (lr * h_error) * (hidden * (1 - hidden)) * inputs_T
        let gradient_h = Matrix.map(hidden, this.dsigmoid);         // (hidden * (1 - hidden)) = gradient       
        gradient_h.mult(h_error);                                   // gradient * h_error
        gradient_h.mult(this.lr);                                   // gradient * lr
 
        let input_T = Matrix.trans(input);                          // hidden_T

        // la variacion del deltaW_ho es la multiplicacion del gradiente por el error de esta capa (hidden_layer), 
        // por el learning ratio(lr), por la transpuesta de la capa anterior (en este caso es la input_layer).
        let deltaW_ih = Matrix.mult(gradient_h, input_T);
        
        // bias_o
        this.bias_h.add(gradient_h);

        // adding the weigths
        this.weigths_ih.add(deltaW_ih);
    }
}