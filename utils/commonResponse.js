class CommonResponse {
  constructor(data) {
    this.data = this.formatData(data.value.data);
    this.message = data.value.message.$value;
    this.code = parseInt(data.value.status.$value);
    this.xml = data;
  }

  formatData(xmlData) {
    const formattedData = {};
    Object.keys(xmlData).forEach((key) => {
      if (key !== 'attributes') formattedData[key] = xmlData[key].$value;
    });

    return formattedData;
  }
}

module.exports = CommonResponse;
