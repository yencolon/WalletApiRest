class CommonResponse {
    message;
    code;
    data;
    
    constructor(data){
        console.log(data)
        this.message = data.value.message.$value;
        this.code = parseInt(data.value.status.$value);
        this.data = data.value.data.$value;
    }

    status505(){
        return ;
    }
}

module.exports = CommonResponse;