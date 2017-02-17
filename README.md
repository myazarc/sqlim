# sqlim

Basic Db Queries for mysql

## Installation

```sh
npm install sqlim
```

## Usage
##### Connect Mysql
```js
var sqlim=require('sqlim');
sqlim.dataBase.host='localhost';
sqlim.dataBase.user='root';
sqlim.dataBase.pass='';
sqlim.dataBase.name='';
sqlim.connect();
```

#### Available Functions
* select
* from
* where
* where_or
* where_like
* where_like_or
* join
* join_left
* join_right
* getSql
* orderby
* groupby
* clear
* get
* insert
* update
* delete


##### select
```js
sqlim.select('field').select('field1 as f').select('sum(field) as total');
// SQL: select field,field1 as f,sum(field) as total
```

##### from
```js
sqlim.from('table').from('table1 t1');
// SQL: from table,table t1
```

##### where
```js
sqlim.where('field',1).where('field2','test');
// SQL: where field=1 and field2='test'
```

##### where_or
```js
sqlim.where('field',1).where_or('field2','test');
// SQL: where field=1 or field2='test'
```

##### where_like
```js
sqlim.where_like('field','%t1%').where_like('field2','test');
// SQL: where field like '%t1%' and field2 like 'test'
```

##### where_like_or
```js
sqlim.where_like('field','%t1%').where_like_or('field2','test');
// SQL: where field like '%t1%' or field2 like 'test'
```

##### join
```js
sqlim.join('tablename t','t.ID=m.FIELD');
// SQL: join tablename t on t.ID=m.FIELD
```

##### join_left
```js
sqlim.join_left('tablename t','t.ID=m.FIELD');
// SQL: left join tablename t on t.ID=m.FIELD
```

##### join_right
```js
sqlim.join_right('tablename t','t.ID=m.FIELD');
// SQL: right join tablename t on t.ID=m.FIELD
```

##### getSql
```js
sqlim.select('ID,NAME,USERNAME')
       .select('EMAIL')
       .where('ID',2)
       .where('ISADMIN',1)
       .from('users');
var sql=sqlim.getSql();
// OUTPUT sql: select ID,NAME,USERNAME,EMAIL from users where ID=2 and ISADMIN=2
```

##### orderby
```js
sqlim.orderby('ID').orderby('DATE','DESC');
// SQL: order by ID asc,DATE desc
```

##### groupby
```js
sqlim.groupby('YEAR(datefield)').groupby('STOCKNAME');
// SQL: group by YEAR(datefield),STOCKNAME
```

##### clear
Reset Sql
```js
sqlim.clear();
// SQL: ""
```
##### get
Sql Results
```js
var cb=function(err, results, fields){
console.log(results);
}
sqlim.get('tablename',cb);
// Running SQL: select * from tablename;
// OUTPUT: [{ID:1,FIELDNAME:'VALUE',ISTEST:'OK'}]

sqlim.select('ID,FIELDNAME').where('ISTEST','OK').get('tablename',cb);
// Running SQL: select ID,FIELDNAME from tablename;
// OUTPUT: [{ID:1,FIELDNAME:VALUE}]


sqlim.select('ID,FIELDNAME').where('ISTEST','OK').from('tablename').get(cb);
// Running SQL: select ID,FIELDNAME from tablename;
// OUTPUT: [{ID:1,FIELDNAME:VALUE}]
```

##### insert
```js
var cb=function(err, result) {
    if (error) throw error;
    console.log(result.insertId);// last insert id
}
var data={
NAME:'test',
SURNAME:'test'
};
sqlim.insert('tablename',data,cb);
// SQL: "insert into tablename set NAME='test',SURNAME='test'"
```

##### update
```js
var cb=function(err, result) {
    if (error) throw error;
    console.log(result);
}
var data={
NAME:'test',
SURNAME:'test'
};
sqlim.update('tablename',data,cb);
// SQL: "update tablename set NAME='test',SURNAME='test'"

sqlim.where('ID',17).update('tablename',data,cb);
// SQL: "update tablename set NAME='test',SURNAME='test' where ID=17"
```

##### delete
```js
var cb=function(err, result) {
    if (error) throw error;
    console.log(result.affectedRows);
}
sqlim.delete('tablename',cb);
// SQL: "delete from tablename"

sqlim.where('ID',17).delete('tablename',cb);
// SQL: "delete from tablename where ID=17"
```



