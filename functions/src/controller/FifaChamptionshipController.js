/* eslint-disable no-extend-native */
/* eslint-disable no-use-before-define */
const axios = require('axios');
const csv = require('csvtojson');

module.exports = {
  async index(req, res) {
    const { key, sheetId } = req.query;

    const url = `https://docs.google.com/spreadsheets/d/${key}/export?format=csv&id=${key}&gid=${sheetId}`;
    try {
      const response = await axios.get(url);
      const filename = getFilename(response);
      const jsonArray = await csv().fromString(response.data);
      const arr = removeKeys(jsonArray);
      const arrValidated = validate(arr);
      const arrStructured = struture(arrValidated);
      const json = build(filename, sheetId, arrStructured);

      res.send(json);
    } catch (error) {
      console.log(error);
    }
  },
};

const getFilename = (response) => {
  const headerLine = response.headers['content-disposition'];
  return getFirst(headerLine, '"')
    .split('ResultsFIFA-')[1]
    .split('.csv')[0];
};

const getFirst = (line, char) => {
  const startFileNameIndex = line.indexOf(char) + 1;
  const endFileNameIndex = line.lastIndexOf(char);
  return line.substring(startFileNameIndex, endFileNameIndex);
};

const getInParentesis = (line) => {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(line);
  return matches[1];
};

const getBeforeParentesis = (line) => {
  const endFileNameIndex = line.indexOf('(');
  return line.substring(0, endFileNameIndex);
};

const getScores = (line) => {
  const firstHalf = getInParentesis(line).split('-').map((each) => Number.parseInt(each, 10));
  const secondHalf = getBeforeParentesis(line).split('-').map((each) => Number.parseInt(each, 10));
  return { firstHalf, secondHalf };
};

const removeKeys = (arr) => arr.map((each) => {
  const arrOutput = Object.keys(each).map((key) => each[key]);
  const sliced = arrOutput.slice(1, 4);
  return sliced;
});

const validate = (arr) => arr.filter((each) => Number.isInteger(Number.parseInt(each[1][0], 10)));

const struture = (arr) => {
  const newArray = [];

  arr.forEach((each) => {
    const scores = getScores(each[1]);
    const obj = {
      teamA: {
        user: trim(getInParentesis(each[0])),
        team: trim(getBeforeParentesis(each[0])),
        firstHalf: +scores.firstHalf[0],
        secondHalf: scores.secondHalf[0] - scores.firstHalf[0],
      },
      teamB: {
        user: trim(getInParentesis(each[2])),
        team: trim(getBeforeParentesis(each[2])),
        firstHalf: +scores.firstHalf[1],
        secondHalf: scores.secondHalf[1] - scores.firstHalf[1],
      },
    };
    newArray.push(obj);
  });
  return newArray;
};

const trim = (str) => str.replace(/^\s+|\s+$/g, '');

const build = (date, id, data) => ({
  date,
  id,
  data,
});
