/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const getDays = async (year = '2020') => {
  try {
    const response = await api.get(`/daysOfYear?year=${year}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getSource = async (key, sheetId) => {
  try {
    const response = await api.get('/source?{', { params: { key, sheetId } });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDatabaseConsistency = async (type = 'whole') => {
  try {
    const response = await api.get(`/databaseConsistency?type=${type}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postDatabaseConsistency = async (data, type = 'whole') => {
  try {
    const response = await api.post(`/databaseConsistency?type=${type}`, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getData = async (year = '2020', date = '2020.03.01') => {
  try {
    const response = await api.get(`/data?year=${year}&date=${date}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (data) => {
  try {
    const response = await api.post('/data', data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
