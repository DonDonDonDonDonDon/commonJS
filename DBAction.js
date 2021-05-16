'use strict'


/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **/
/** version 2021-04-16 **/
/** If you have the latest version, please update it **/

let SqlString = require('sqlstring');

/**
 *  if the entity have id do insert,else do update
 * @param database
 * @param entity
 * @returns {Promise<unknown>}
 */
async function  save(database,entity){
  let sql = "";
  let keyArr = [];
  let keyStr = "";
  let valueArr = [];

  console.info("entity--->",entity)

  for (const p in entity) {
    if(p=="id"){
      continue;
    }
    if (p == "from") {
      keyArr.push(database+".from");
    } else {
      keyArr.push(p);
    }

    const value = entity[p];
    if(Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]'){
      const jsonStr = JSON.stringify(entity[p])
      if(isJSON(jsonStr)){
        entity[p] = jsonStr;
      }
    }

    valueArr.push( entity[p] )
  }
  keyStr = keyArr.join(',');

  if (entity.id) {
    /*update*/
    const setSqlArr = [];
    for (let i = 0; i < keyArr.length; i++) {
      console.log("valueArr[i]",valueArr[i])
      setSqlArr.push(keyArr[i] + " = ?");
    }

    let setSql = setSqlArr.join(",");

    sql = "update " + database + " set " + setSql + " where id = " + entity.id;
  } else {
    /*insert*/
    const questionMarkArr = [];

    for (let i = 0; i < valueArr.length; i++) {
      questionMarkArr.push("?")
    }
    const questionMarkStr = questionMarkArr.join(",")
    sql = "insert " + database + "(" + keyStr + ") values(" + questionMarkStr + ")";

  }
  const self = this;

  let formatSql    = SqlString.format(sql,valueArr);
  console.log("formatSqlTemp--Insert---->sql",sql);
  console.log("formatSqlTemp--Insert---->valueArr",valueArr);
  console.log("formatSqlTemp--Insert---->",formatSql);


  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements:valueArr,
      type:entity.id?self.QueryTypes.UPDATE:self.QueryTypes.INSERT
    }).then((result) => {
      resolve(entity.id?entity.id:result[0]);
    }).catch((err)=>{
      //  console.error(err);
      reject(err);
    })
  })
}

/**
 *  just do insert sql
 * @param database
 * @param entity
 * @returns {Promise<unknown>}
 */
async function  insert(sql,filterArr){
  const self = this;

  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements:filterArr,
      type:self.QueryTypes.INSERT
    }).then((result) => {
      resolve(result[0]);
    }).catch((err)=>{
      //  console.error(err);
      reject(err);
    })
  })
}


/**
 * @param sql
 * @returns {Promise<unknown>}
 */
async function  select(sql,filterArr){


  const start =  (new Date()).valueOf();

  let formatSql    = SqlString.format(sql,filterArr);

  console.log("formatSqlTemp---->",formatSql);

  const self = this;
  return new Promise(function (resolve,reject) {
    self.query(sql, {
      replacements:filterArr,
      type:self.QueryTypes.SELECT
    }).then((aa) => {
      const end =  (new Date()).valueOf();
      console.log("formatSql---->",formatSql);
      console.log("time---->",end-start);

      resolve(aa);
    }).catch((err)=>{
      console.error(err)
      reject(err);
    })
  })
}

/**
 * @param sql
 * @returns {Promise<unknown>}
 */
async function  getTotal(sql,filterArr){

  sql = formatSqlTotal(sql);
  const start =  (new Date()).valueOf();

  let formatSql    = SqlString.format(sql,filterArr);

  console.log("formatSqlTemp---->",formatSql);

  const self = this;
  return new Promise(function (resolve,reject) {
    self.query(sql, {
      replacements:filterArr,
      type:self.QueryTypes.SELECT
    }).then((aa) => {
      const end =  (new Date()).valueOf();
      console.log("formatSql---->",formatSql);
      console.log("time---->",end-start);

      resolve(aa.length);
    }).catch((err)=>{
      console.error(err)
      reject(err);
    })
  })
}


/**
 * @param sql
 * @returns {Promise<unknown>}
 */
async function  del(sql,filterArr){


  const start =  (new Date()).valueOf();

  let formatSql    = SqlString.format(sql,filterArr);

  console.log("formatSqlTemp---->",formatSql);

  const self = this;
  return new Promise(function (resolve,reject) {
    self.query(sql, {
      replacements:filterArr,
      type:self.QueryTypes.DELETE
    }).then((aa) => {
      const end =  (new Date()).valueOf();
      console.log("formatSql---->",formatSql);
      console.log("time---->",end-start);

      resolve(aa);
    }).catch((err)=>{
      console.error(err)
      reject(err);
    })
  })
}



function formatSqlTotal(sql){
  const sqlArr_a = sql.split("from");
  const sqlArr_b = sqlArr_a[1].split("limit");

  sql = "select id from "+sqlArr_b[0];
  return sql;
}


function addActions(sequelize){
  sequelize.save = save;
  sequelize.del = del;
  sequelize.select = select;
  sequelize.insert = insert;
  sequelize.getTotal = getTotal;
}

let isJSON = function(str) {
  if(typeof(str) === 'string') {
    try{
      const obj = JSON.parse(str);
      if(typeof(obj) === 'object' && obj) {
        return true;
      }
      else {
        return false;
      }
    }
    catch(e) {
      return false;
    }
  }
}

exports.addActions = addActions;

