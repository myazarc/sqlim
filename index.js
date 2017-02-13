var sprintf=require('sprintf').sprintf;
var mysql      = require('mysql');

const sqlim={};

sqlim.dataBase={};

sqlim._dbConn=null;

sqlim.dataBase.host='localhost';
sqlim.dataBase.user='root';
sqlim.dataBase.pass='';
sqlim.dataBase.name='';

sqlim.connectMysql=function () {
    this._dbConn = mysql.createConnection({
        host     : sqlim.dataBase.host,
        user     : sqlim.dataBase.user,
        password : sqlim.dataBase.pass,
        database : sqlim.dataBase.name
    });

    this._dbConn.connect();
};

sqlim.query=function (sql,callback) {
    this._dbConn.query(sql,callback);
    this.clear();
};

sqlim.storage={};

sqlim.storage._sql="";
sqlim.storage._where="where";
sqlim.storage._whereCount=0;
sqlim.storage._from="";
sqlim.storage._fromCount=0;
sqlim.storage._select="";
sqlim.storage._selectCount=0;
sqlim.storage._join="";
sqlim.storage._limit="";
sqlim.storage._orderby="";
sqlim.storage._orderbyCount=0;
sqlim.storage._groupby="";
sqlim.storage._groupbyCount=0;


sqlim.where=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' and %s=%s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s=%s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

sqlim.where_or=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' or %s=%s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s=%s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

sqlim.where_like=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' and %s like %s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s like %s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

sqlim.where_like_or=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' or %s like %s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s like %s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

sqlim.from=function(tableName){
    if(this.storage._fromCount){
        this.storage._from+=sprintf(',%s',tableName);
    }else{
        this.storage._from+=sprintf('%s',tableName);
    }
    this.storage._fromCount++;
    return this;
};

sqlim.select=function(fieldName){
    if(this.storage._selectCount){
        this.storage._select+=sprintf(',%s',fieldName);
    }else{
        this.storage._select+=sprintf('%s',fieldName);
    }
    this.storage._selectCount++;
    return this;
};

sqlim.join=function(tableName,fields){
        this.storage._join+=sprintf('JOIN %s on %s',tableName,fields);
    return this;
};

sqlim.join_left=function(tableName,fields){
    this.storage._join+=sprintf('LEFT JOIN %s on %s',tableName,fields);
    return this;
};

sqlim.join_right=function(tableName,fields){
    this.storage._join+=sprintf('RIGHT JOIN %s on %s',tableName,fields);
    return this;
};



sqlim.getSql=function () {

    if(!this.storage._selectCount){
        this.storage._select='*';
    }

    if(!this.storage._whereCount){
        this.storage._where='';
    }

    var sql="select "+this.storage._select+" from "+this.storage._from+" "+this.storage._where;

    return sql;

};

sqlim.orderby=function(fieldName,type){
    var t=type || 'asc';
    if(this.storage._orderbyCount){
        this.storage._orderby+=sprintf(',%s %s',fieldName,t);
    }else{
        this.storage._orderby+=sprintf('order by %s %s',fieldName,t);
    }
    this.storage._orderbyCount++;
    return this;
};

sqlim.groupby=function(fieldName){
    if(this.storage._groupbyCount){
        this.storage._groupby+=sprintf(',%s',fieldName);
    }else{
        this.storage._groupby+=sprintf('group by %s',fieldName);
    }
    this.storage._groupbyCount++;
    return this;
};

sqlim.clear=function(){
    sqlim.storage._sql="";
    sqlim.storage._where="where";
    sqlim.storage._whereCount=0;
    sqlim.storage._from="";
    sqlim.storage._fromCount=0;
    sqlim.storage._select="";
    sqlim.storage._selectCount=0;
    sqlim.storage._join="";
    sqlim.storage._limit="";
    sqlim.storage._orderby="";
    sqlim.storage._orderbyCount=0;
    sqlim.storage._groupby="";
    sqlim.storage._groupbyCount=0;

    return this;
};

/**
 *
 * @param tableName
 * @param callback
 * @example Callback
 * function (error, results, fields) {
        if (error) throw error;
        console.log(results);
    }
 */
sqlim.get=function (tableName,callback) {

    if (typeof tableName=="function"){
        this.query(this.getSql(),tableName);
    }else{
        this.from(tableName);
        this.query(this.getSql(),callback);
    }
};
/**
 *
 * @param tableName
 * @param data
 * @example Callback
 * function(err, result) {
 *      if (error) throw error;
 *   }
 */
sqlim.insert=function (tableName,data,cb) {
    this._dbConn.query(sprintf('INSERT INTO %s SET ?',tableName), data, cb);
    this.clear();
};

sqlim.update=function (tableName,data,cb) {
    var where='';
    if(this.storage._whereCount){
        where=this.storage._where;
    }
    this._dbConn.query(sprintf('UPDATE %s SET ? '+where,tableName), data, cb);
    this.clear();
};

sqlim.delete=function (tableName,data,cb) {
    var where='';
    if(this.storage._whereCount){
        where=this.storage._where;
    }
    this._dbConn.query(sprintf('DELETE FROM %s '+where,tableName), cb);
    this.clear();
};

module.exports=sqlim;