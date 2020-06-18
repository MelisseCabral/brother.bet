/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const fifa = async () => {
  const data = {
    key: '1DzPBoZzRx1JraO48IaiRsTCML75XXLFMj0ZItfaI8-A',
    sheetId: '',
  };

  const dataSet = [];
  try {
    idsTabelas.forEach(async (each, indexOf) => {
      data.sheetId = each;
      const response = await getCsv(data);
      if (response.data) {
        dataSet.push(JSON.stringify(response));
        if (indexOf === idsTabelas.length - 1) {
          createDb('dataSet', dataSet);
        }
      } else {
        console.log(each, response);
      }
    });
  } catch (error) {
    localStorage.setItem('dataError', JSON.stringify({ error }));
  }
};

function getCsv(data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:5001/brother-bet/us-central1/app/getCsv',
      dataType: 'json',
      method: 'get',
      cache: false,
      crossDomain: true,
      headers: {
        Accept: 'application/json',
      },
      data,
    }).done((response) => {
      resolve(response);
    }).fail((error) => {
      console.log(error);
      reject(error);
    });
  });
}

const createDb = (dbName, dataSet) => {
  const request = indexedDB.open('brotherbet', 2);

  request.onerror = (event) => {
    console.log(event);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore(dbName, { keyPath: 'id' });

    objectStore.createIndex('date', 'date', { unique: true });

    objectStore.createIndex('id', 'id', { unique: true });

    objectStore.transaction.oncomplete = (event) => {
      const dbObjectStore = db.transaction(dbName, 'readwrite').objectStore(dbName);
      dataSet.forEach((each) => {
        dbObjectStore.add(each);
      });
    };
  };
};

const saveJsonFile = (dataSet) => {
  const a = document.createElement('a');
  a.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(dataSet))}`);
  a.setAttribute('download', 'filename.json');
  a.click();
}

let idsTabelas = [
  '2142102868',
  '831947300',
  '29771886',
  '1561166611',
  '1342777524',
  '1732294506',
  '1360687816',
  '2143234053',
  '426693712',
  '706046854',
  '1823441290',
  '1636160298',
  '1245276041',
  '101125808',
  '24822662',
  '831063963',
  '743805214',
  '294586944',
  '800365827',
  '795108071',
  '1653572724',
  '908751891',
  '7275885',
  '690945532',
  '1021103014',
  '812275314',
  '1285956889',
  '22208882',
  '798668504',
  '829967459',
  '810135418',
  '476705515',
  '62524068',
  '190566713',
  '2090563235',
  '531952521',
  '58291296',
  '771339771',
  '808487729',
  '1376301728',
  '816202328',
  '516416968',
  '2103110450',
  '787897977',
  '1657997336',
  '541384094',
  '1320559540',
  '99940413',
  '1772281208',
  '181508402',
  '1675355205',
  '2133682780',
  '963560610',
  '1000337942',
  '984616743',
  '1587884644',
  '1977689777',
  '44156993',
  '1339627639',
  '1558496269',
  '1319623306',
  '1616340696',
  '911893431',
  '473368820',
  '571089104',
  '789221817',
  '568090900',
  '682897144',
  '977612081',
  '53647551',
  '1680405087',
  '782454864',
  '656471722',
  '2131698999',
  '1175590910',
  '1214431363',
  '72963459',
  '1843065733',
  '1496708822',
  '36360484',
  '1053560111',
  '1275428752',
  '1858170508',
  '1931562535',
  '623409378',
  '1575882671',
  '2078815180',
  '1414937918',
  '165886382',
  '1183724316',
  '460112835',
  '1734567226',
  '1088241856',
  '542470642',
  '1987590564',
  '1459073109',
  '741994942',
  '1296621401',
  '1689505366',
  '1674690575',
  '1457528313',
  '558544080',
];
