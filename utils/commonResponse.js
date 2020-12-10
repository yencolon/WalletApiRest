class CommonResponse {
    message;
    code;
    data;
    
    constructor(data){
        this.message = data.value.message.$value;
        this.code = parseInt(data.value.status.$value);
        this.data = this.formatData(data.value.data);
    }

    formatData(xmlData){
        let formattedData =  {};
        Object.keys(xmlData).forEach((key, _) => {
            if(key !== 'attributes') 
                formattedData[key] = xmlData[key].$value
        } );

        return formattedData;
    }
}

module.exports = CommonResponse;