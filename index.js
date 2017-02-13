var sprintf=require('sprintf').sprintf;
var mysql      = require('mysql');

const nodeSql={};

nodeSql.dataBase={};

nodeSql._dbConn=null;

nodeSql.dataBase.host='localhost';
nodeSql.dataBase.user='root';
nodeSql.dataBase.pass='';
nodeSql.dataBase.name='suem';

nodeSql.connectMysql=function () {
    nodeSql._dbConn = mysql.createConnection({
        host     : nodeSql.dataBase.host,
        user     : nodeSql.dataBase.user,
        password : nodeSql.dataBase.pass,
        database : nodeSql.dataBase.name
    });

    nodeSql._dbConn.connect();
};

nodeSql.query=function (sql,callback) {
    this._dbConn.query(sql,callback);
};

nodeSql.storage={};

nodeSql.storage._sql="";
nodeSql.storage._where="where";
nodeSql.storage._whereCount=0;
nodeSql.storage._from="";
nodeSql.storage._fromCount=0;
nodeSql.storage._select="";
nodeSql.storage._selectCount=0;
nodeSql.storage._join="";
nodeSql.storage._limit="";
nodeSql.storage._orderby="";
nodeSql.storage._orderbyCount=0;
nodeSql.storage._groupby="";
nodeSql.storage._groupbyCount=0;


nodeSql.where=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' and %s=%s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s=%s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

nodeSql.where_or=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' or %s=%s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s=%s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

nodeSql.where_like=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' and %s like %s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s like %s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

nodeSql.where_like_or=function(fieldName,value){
    if(this.storage._whereCount){
        this.storage._where+=sprintf(' or %s like %s',fieldName,value);
    }else{
        this.storage._where+=sprintf(' %s like %s',fieldName,value);
    }
    this.storage._whereCount++;
    return this;
};

nodeSql.from=function(tableName){
    if(this.storage._fromCount){
        this.storage._from+=sprintf(',%s',tableName);
    }else{
        this.storage._from+=sprintf('%s',tableName);
    }
    this.storage._fromCount++;
    return this;
};

nodeSql.select=function(fieldName){
    if(this.storage._selectCount){
        this.storage._select+=sprintf(',%s',fieldName);
    }else{
        this.storage._select+=sprintf('%s',fieldName);
    }
    this.storage._selectCount++;
    return this;
};

nodeSql.join=function(tableName,fields){
        this.storage._join+=sprintf('JOIN %s on %s',tableName,fields);
    return this;
};

nodeSql.join_left=function(tableName,fields){
    this.storage._join+=sprintf('LEFT JOIN %s on %s',tableName,fields);
    return this;
};

nodeSql.join_right=function(tableName,fields){
    this.storage._join+=sprintf('RIGHT JOIN %s on %s',tableName,fields);
    return this;
};



nodeSql.getSql=function () {

    if(!this.storage._selectCount){
        this.storage._select='*';
    }

    if(!this.storage._whereCount){
        this.storage._where='';
    }

    var sql="select "+this.storage._select+" from "+this.storage._from+" "+this.storage._where;

    return sql;

};

nodeSql.orderby=function(fieldName,type){
    var t=type || 'asc';
    if(this.storage._orderbyCount){
        this.storage._orderby+=sprintf(',%s %s',fieldName,t);
    }else{
        this.storage._orderby+=sprintf('order by %s %s',fieldName,t);
    }
    this.storage._orderbyCount++;
    return this;
};

nodeSql.groupby=function(fieldName){
    if(this.storage._groupbyCount){
        this.storage._groupby+=sprintf(',%s',fieldName);
    }else{
        this.storage._groupby+=sprintf('group by %s',fieldName);
    }
    this.storage._groupbyCount++;
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
nodeSql.get=function (tableName,callback) {
    this.from(tableName);
    this.query(this.getSql(),callback);
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
nodeSql.insert=function (tableName,data,cb) {
    this._dbConn.query(sprintf('INSERT INTO %s SET ?',tableName), data, cb);
};

nodeSql.update=function (tableName,data,cb) {
    var where='';
    if(this.storage._whereCount){
        where=this.storage._where;
    }
    this._dbConn.query(sprintf('UPDATE %s SET ? '+where,tableName), data, cb);
};

module.exports=nodeSql;