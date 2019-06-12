/* 
    PERCEPTRON WITH GRADIENT DESCENT IN JAVASCRIPT.

    This is my first neuron for IA based on the Daniel Shiffman video
    tutorial of Youtube.

    
    By Jack McRift,
    03/06/2019 - 12:10.
*/

let dataSet = [
    {
        input: [1, 0],
        target: [1]
    },{
        input: [0, 1],
        target: [1]
    },{
        input: [0, 0],
        target: [0]
    },{
        input: [1, 1],
        target: [0]
    }
]

function setup(){
    const nn = new NeuronalNetwork(2, 16, 1);

    for (let i = 0; i < 100000; i++) {        
        let data = random(dataSet);
        nn.train(data.input, data.target);
    }

    console.log(nn.feedforward([1,0]))
    console.log(nn.feedforward([1,1]))
    console.log(nn.feedforward([0,1]))
    console.log(nn.feedforward([0,0]))
}