# nodeSql

Basic Db Queries for mysql

## Installation

```sh
npm install myazarc/nodeSql -g
```

## Usage
##### Connect Mysql
```js
var nodeSql=require('nodeSql');
nodeSql.dataBase.host='localhost';
nodeSql.dataBase.user='root';
nodeSql.dataBase.pass='';
nodeSql.dataBase.name='';
nodeSql.connect();
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
* get_sql
* orderby
* groupby
* clear
* get
* insert
* update
* delete


##### select
```js
nodeSql.select('field').select('field1 as f').select('sum(field) as total');
// SQL: select field,field1 as f,sum(field) as total
```

##### from
```js
nodeSql.from('table').from('table1 t1');
// SQL: from table,table t1
```

##### where
```js
nodeSql.where('field',1).where('field2','test');
// SQL: where field=1 and field2='test'
```

##### where_or
```js
nodeSql.where('field',1).where_or('field2','test');
// SQL: where field=1 or field2='test'
```

##### where_like
```js
nodeSql.where_like('field','%t1%').where_like('field2','test');
// SQL: where field like '%t1%' and field2 like 'test'
```

##### where_like_or
```js
nodeSql.where_like('field','%t1%').where_like_or('field2','test');
// SQL: where field like '%t1%' or field2 like 'test'
```

##### join
```js
nodeSql.join('tablename t','t.ID=m.FIELD');
// SQL: join tablename t on t.ID=m.FIELD
```

##### join_left
```js
nodeSql.join_left('tablename t','t.ID=m.FIELD');
// SQL: left join tablename t on t.ID=m.FIELD
```

##### join_right
```js
nodeSql.join_right('tablename t','t.ID=m.FIELD');
// SQL: right join tablename t on t.ID=m.FIELD
```

##### get_sql
```js
nodeSql.select('ID,NAME,USERNAME')
       .select('EMAIL')
       .where('ID',2)
       .where('ISADMIN',1)
       .from('users');
var sql=nodeSql.get_sql();
// OUTPUT sql: select ID,NAME,USERNAME,EMAIL from users where ID=2 and ISADMIN=2
```

##### orderby
```js
nodeSql.orderby('ID').orderby('DATE','DESC');
// SQL: order by ID asc,DATE desc
```

##### groupby
```js
nodeSql.groupby('YEAR(datefield)').groupby('STOCKNAME');
// SQL: group by YEAR(datefield),STOCKNAME
```

##### clear
Reset Sql
```js
nodeSql.clear();
// SQL: ""
```
##### get
Sql Results
```js
var cb=function(err, results, fields){
console.log(results);
}
nodeSql.get('tablename',cb);
// Running SQL: select * from tablename;
// OUTPUT: [{ID:1,FIELDNAME:'VALUE',ISTEST:'OK'}]

nodeSql.select('ID,FIELDNAME').where('ISTEST','OK').get('tablename',cb);
// Running SQL: select ID,FIELDNAME from tablename;
// OUTPUT: [{ID:1,FIELDNAME:VALUE}]


nodeSql.select('ID,FIELDNAME').where('ISTEST','OK').from('tablename').get(cb);
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
nodeSql.insert('tablename',data,cb);
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
nodeSql.update('tablename',data,cb);
// SQL: "update tablename set NAME='test',SURNAME='test'"

nodeSql.where('ID',17).update('tablename',data,cb);
// SQL: "update tablename set NAME='test',SURNAME='test' where ID=17"
```

##### delete
```js
var cb=function(err, result) {
    if (error) throw error;
    console.log(result.affectedRows);
}
nodeSql.delete('tablename',cb);
// SQL: "delete from tablename"

nodeSql.where('ID',17).delete('tablename',cb);
// SQL: "delete from tablename where ID=17"
```



