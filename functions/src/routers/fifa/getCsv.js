/* eslint-disable no-use-before-define */
const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');

const router = express.Router();

module.exports = router.get('/', (async (req, res) => {
  const { key, sheetId } = req.query;

  const url = `https://docs.google.com/spreadsheets/d/${key}/export?format=csv&id=${key}&gid=${sheetId}`;
  axios.get(url).then(async (response) => {
    const filename = getFilename(response);
    const jsonArray = await csv().fromString(response.data);
    const arr = removeKeys(jsonArray);
    const arrValidated = validate(arr);
    const arrStructured = struture(arrValidated);
    const json = build(filename, sheetId, arrStructured);

    return res.send(json);
  }).catch((error) => res.send(error));
}));

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
  const endFileNameIndex = line.indexOf('(') - 1;
  return line.substring(0, endFileNameIndex);
};

const getScores = (line) => {
  const firstGame = getBeforeParentesis(line).split(' - ');
  const secondGame = getInParentesis(line).split(' - ');
  return { firstGame, secondGame };
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
        user: getInParentesis(each[0]),
        team: getBeforeParentesis(each[0]),
        firstGame: scores.firstGame[0],
        secondGame: scores.secondGame[0],
      },
      teamB: {
        user: getInParentesis(each[2]),
        team: getBeforeParentesis(each[2]),
        firstGame: scores.firstGame[1],
        secondGame: scores.secondGame[1],
      },
    };
    newArray.push(obj);
  });
  return newArray;
};

const build = (date, id, data) => ({
  date,
  id,
  data,
});
