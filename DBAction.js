'use strict'


/** !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! **/
<<<<<<< HEAD
/** version 2021-05-16 **/
=======
/** version 2021-05-21 **/
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
/** If you have the latest version, please update it **/

let SqlString = require('sqlstring');

/**
 *  if the entity have id do insert,else do update
 * @param database
 * @param entity
 * @returns {Promise<unknown>}
 */
async function save(database, entity) {
  let sql = "";
  let keyArr = [];
  let keyStr = "";
  let valueArr = [];

  if (entity.id) {
    const entityFromMysql = await this.findDataById(database, entity.id)
    if (entityFromMysql) {
      entity = extend(entityFromMysql, entity);
    }
  }

  for (const p in entity) {
    if (p == "id") {
      continue;
    }
    if (p == "from") {
      keyArr.push(database + ".from");
    } else if (p == 'to') {
      keyArr.push(database + ".to");
    } else {
      keyArr.push(p);
    }

    const value = entity[p];
    if (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
      const jsonStr = JSON.stringify(entity[p])
      if (isJSON(jsonStr)) {
        entity[p] = jsonStr;
      }
    }

    valueArr.push(entity[p])
  }
  keyStr = keyArr.join(',');

  if (entity.id) {
    /*update*/
    const setSqlArr = [];
    for (let i = 0; i < keyArr.length; i++) {
      console.log("valueArr[i]", valueArr[i])
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

  let formatSql = SqlString.format(sql, valueArr);
  console.log("formatSqlTemp--Insert---->sql", sql);
  console.log("formatSqlTemp--Insert---->valueArr", valueArr);
  console.log("formatSqlTemp--Insert---->", formatSql);


  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements: valueArr,
      type: entity.id ? self.QueryTypes.UPDATE : self.QueryTypes.INSERT
    }).then((result) => {
      resolve(entity.id ? entity.id : result[0]);
    }).catch((err) => {
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
<<<<<<< HEAD
async function  insert(sql,filterArr){
=======
async function insert(sql, filterArr) {
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
  const self = this;

  return new Promise(function (resolve, reject) {
    self.query(sql, {
<<<<<<< HEAD
      replacements:filterArr,
      type:self.QueryTypes.INSERT
    }).then((result) => {
      resolve(result[0]);
    }).catch((err)=>{
=======
      replacements: filterArr,
      type: self.QueryTypes.INSERT
    }).then((result) => {
      resolve(result[0]);
    }).catch((err) => {
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
      //  console.error(err);
      reject(err);
    })
  })
}


/**
<<<<<<< HEAD
=======
 * @param sql
 * @returns {Promise<unknown>}
 */
async function findDataById(database, id) {

  const start = (new Date()).valueOf();


  const sql = `select * from ${database} where id = ?`

  const self = this;
  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements: [id],
      type: self.QueryTypes.SELECT
    }).then((result) => {
      const end = (new Date()).valueOf();
      console.log("formatSql---->", sql);
      console.log("time---->", end - start);

      resolve(result[0]);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

/**
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
 * @param sql
 * @returns {Promise<unknown>}
 */
async function select(sql, filterArr) {


  const start = (new Date()).valueOf();

  let formatSql = SqlString.format(sql, filterArr);

  console.log("formatSqlTemp---->", formatSql);

  const self = this;
  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements: filterArr,
      type: self.QueryTypes.SELECT
    }).then((aa) => {
      const end = (new Date()).valueOf();
      console.log("formatSql---->", formatSql);
      console.log("time---->", end - start);

      resolve(aa);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}

/**
 * @param sql
 * @returns {Promise<unknown>}
 */
<<<<<<< HEAD
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
=======
async function getTotal(sql, filterArr) {
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260

  sql = formatSqlTotal(sql);
  const start = (new Date()).valueOf();

  let formatSql = SqlString.format(sql, filterArr);

  console.log("formatSqlTemp---->", formatSql);

  const self = this;
  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements: filterArr,
      type: self.QueryTypes.SELECT
    }).then((aa) => {
      const end = (new Date()).valueOf();
      console.log("formatSql---->", formatSql);
      console.log("time---->", end - start);

      resolve(aa.length);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}


/**
 * @param sql
 * @returns {Promise<unknown>}
 */
async function del(sql, filterArr) {


  const start = (new Date()).valueOf();

  let formatSql = SqlString.format(sql, filterArr);

  console.log("formatSqlTemp---->", formatSql);

  const self = this;
  return new Promise(function (resolve, reject) {
    self.query(sql, {
      replacements: filterArr,
      type: self.QueryTypes.DELETE
    }).then((aa) => {
      const end = (new Date()).valueOf();
      console.log("formatSql---->", formatSql);
      console.log("time---->", end - start);

      resolve(aa);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}


<<<<<<< HEAD

function formatSqlTotal(sql){
  const sqlArr_a = sql.split("from");
  const sqlArr_b = sqlArr_a[1].split("limit");

  sql = "select id from "+sqlArr_b[0];
=======
function formatSqlTotal(sql) {
  const sqlArr_a = sql.split("from");
  const sqlArr_b = sqlArr_a[1].split("limit");
  sql = `select id from ${sqlArr_b[0]}`;
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
  return sql;
}


<<<<<<< HEAD
function addActions(sequelize){
=======
function addActions(sequelize) {
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
  sequelize.save = save;
  sequelize.del = del;
  sequelize.select = select;
  sequelize.insert = insert;
  sequelize.getTotal = getTotal;
<<<<<<< HEAD
=======
  sequelize.findDataById = findDataById;
>>>>>>> f9731b24421048b0868b9f7e258b5ff81cfdf260
}

let isJSON = function (str) {
  if (typeof (str) === 'string') {
    try {
      const obj = JSON.parse(str);
      if (typeof (obj) === 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

let extend = function (oldEntity, newEntity) {
  for (let p in newEntity) {
    oldEntity[p] = newEntity[p];
  }
  return oldEntity;
};


exports.addActions = addActions;

