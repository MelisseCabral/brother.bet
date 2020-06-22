/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const randomizeIO = (max, percentTrain) => {
  const generate = () => {
    const input = [];
    const output = [];

    for (let i = 0; i < max; i += 1) {
      const intResult = [
        ...tf.randomUniform([1, 3], -800, +800).dataSync(),
        ...tf.randomUniform([1, 6], -100, +100).dataSync(),
      ];
      intResult.forEach((each, indexOf) => { intResult[indexOf] = Math.floor(each); });
      input.push(intResult);

      const outResult = [
        ...tf.multinomial(tf.tensor([0.8, 0.0]), 3, 0, true).dataSync(),
        ...tf.randomUniform([1, 2], 800).dataSync(),
      ];
      outResult.forEach((each, indexOf) => { outResult[indexOf] = Math.floor(each); });
      output.push(outResult);
    }
    return { input, output };
  };

  const trainSet = generate(max * percentTrain);
  const validationSet = generate(1 - max * percentTrain);

  return { trainSet, validationSet };
};

const machineLearning = (sets) => {
  const {
    trainSet,
    validationSet,
    batches,
    learningRate,
    start,
    end,
    randomize,
    validationPercent,
  } = sets;

  const dataSplice = {
    trainSet: {
      input: trainSet.input.slice(start, end),
      output: trainSet.output.slice(start, end),
    },
  };

  const input = tf.tensor2d(dataSplice.trainSet.input);
  const output = tf.tensor2d(dataSplice.trainSet.output);

  const fitConfig = {
    validationSplit: validationPercent,
    shuffle: randomize,
  };

  if (validationSet) {
    const inputs = tf.tensor2d(validationSet.input);
    const outputs = tf.tensor2d(validationSet.output);
    fitConfig.validationData = [inputs, outputs];
  }

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
  });

  model.add(hiddenLayers);
  model.add(outputLayers);

  model.compile({
    optimizer: tf.train.sgd(learningRate),
    loss: tf.losses.meanSquaredError,
  });

  const train = async () => {
    let plotPercent = 0.1;
    for (let i = 0; i < batches; i += 1) {
      const response = await model.fit(input, output, fitConfig);
      if (i > batches * plotPercent) {
        plotPercent += 0.1;
        console.log('loss: ', response.history.loss[0], 'endData', batches);
      }

      if (i - batches === -1) return response;
    }
  };

  (train().then((data) => {
    console.log(data);
  }));
};
