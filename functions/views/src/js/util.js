class Util {
  static hash(data, label = '') {
    const s = JSON.stringify(data) || '';
    let h = 0;
    const l = s.length;
    let i = 0;
    // eslint-disable-next-line no-bitwise
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i += 1)) | 0;
    return label + h;
  }

  static generateDaysOfYear(year = 2020) {
    const allDaysOfYear = [];
    for (let month = 1; month < 13; month += 1) {
      const daysOfMonth = new Date(year, month, 0).getDate();
      for (let day = 1; day < daysOfMonth + 1; day += 1) {
        const dateWithoutZeros = `${year}/${month}/${day}`;
        const newDay = new Date(dateWithoutZeros).toISOString().slice(0, 10);
        allDaysOfYear.push(newDay);
      }
    }
    return allDaysOfYear;
  }

  static isValid(data) {
    if (Number.isNaN(data)) return 'Is NaN!';
    if (data === true) return 'Is true!';
    if (data === false) return 'Is false!';
    if (data === null) return 'Is null!';
    if (data === undefined) return 'Is undefined!';
    if (data === '') return "Is ''!";
    return false;
  }

  static saveJsonFile(data) {
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`,
    );
    a.setAttribute('download', 'filename.json');
    a.click();
  }

  static downloadJSON(data, name) {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data),
    )}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  static organizeObject(obj) {
    return Object.keys(obj)
      .sort((a, b) => (obj[a] > obj[b] ? 1 : -1))
      .reduce((a, b) => {
        // eslint-disable-next-line no-param-reassign
        a[b] = obj[b];
        return a;
      }, {});
  }

  static delay(timeSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeSeconds * 1000);
    });
  }
}

const {
  hash, generateDaysOfYear, isValid, saveJsonFile, organizeObject, delay,
} = new Util();

export {
  hash, generateDaysOfYear, isValid, saveJsonFile, organizeObject, delay,
};
