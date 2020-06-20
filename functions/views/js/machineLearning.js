let machineLearning =  (dataSet) =>{
  const input = tf.tensor2d(dataSet.validationSet.input);
  const output = tf.tensor2d(dataSet.validationSet.output);
  
  const inputs = tf.tensor2d(dataSet.validationSet.input);
  const outputs = tf.tensor2d(dataSet.validationSet.output);

  const learningRate = 0.1

  const model = tf.sequential();
  
  const hiddenLayers = tf.layers.dense({
    units: 4,
    inputShape: [9],
    activation: 'sigmoid',
  });

  const outputLayers = tf.layers.dense({
    units: 5,
    inputShape: [4],
    activation: 'sigmoid',
  })

  model.add(hiddenLayers);
  model.add(outputLayers);
         
  model.compile({
      optimizer: tf.train.sgd(learningRate),
      loss: tf.losses.meanSquaredError
  });


  console.log(dataSet);

}

getTable('trainSet').then((data)=>{
  console.log(data)
})

