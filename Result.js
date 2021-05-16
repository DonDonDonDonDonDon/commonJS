


/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **/
/** version 2021-05-16 **/
/** Reference address  https://github.com/DonDonDonDonDonDon/commonJS/blob/main/Result.js  **/
/** If you have the latest version, please update it **/

class Result{
  /*  constructor(typeCode,msg,data){
      this.typeCode = typeCode;
      this.msg = msg;
      this.data = data;
    }*/
  constructor(){
    this.typeCode = 1;
    this.msg = "no msg";
    this.data = null;
    this.total = 0;
  }
  setTypeCode(typeCode){
    this.typeCode = typeCode;
    return this;
  }
  getTypeCode(){
    return this.typeCode;
    return this;
  }
  setMsg(msg){
    this.msg = msg;
    return this;

  }
  getMsg(){
    return this.msg;
    return this;

  }
  setData(data){
    this.data = data;
    return this;

  }

  setTotal(total){
    this.total = total;
    return this;
  }

  getTotal(){
    return this.total;
  }
  getData(){
    return this.data;
    return this;

  }
  getRes(){
    return {'code':this.typeCode,'msg':this.msg,'data':this.data};
  }
  response(req, res){
    return res.status(200).json(this);
  }
}

module.exports = {
  SUCCESS                 :       new Result(0,'SUCCESS',{}),
  FAILED                  :       new Result(1,'FAILED',{}),
  USER_PASSWORD_ERROR     :       new Result(101,'USER_PASSWORD_ERROR',{}),
  USER_CAPTCHA_ERROR      :       new Result(102,'USER_CAPTCHA_ERROR',{}),
  ResultConstructor      :       Result,
}





