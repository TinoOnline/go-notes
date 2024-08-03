# MangoDB documentation

resources: https://www.youtube.com/watch?v=c2M-rlkkT5o
create docker container: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/

<lu>
<li>download the image: pull community edition</li>
<li>run the container: docker run --name mongodb -p 27017:27017 -d mongodb mongodb-community-server:latest</li>
</lu>

## Data types

- String, Number, **Double**, Boolean, datetime, null , array

## Databse CLI (mangosh)

- creating: `use <database name>`
  - add collection: `db.createCollection(<collection name>)`
  - options, capped to 10mb and 100 documents `db.createCollection(<collection name>,{cappted:true, size:bytes, max: 100}, {autoIndexId:false})`
  - `drop collection: db.<collection name>.drop()`
- deleting db: `db.dropDatabase()`

## CUD records

### creating

- after creating the database
- create collection: `db.students`
- methods: `db.students.insertOne({})`, `db.students.insertMany([{},{}])`

### updating

- updating a field that doesn't exit auto crates it `set` operator
  - `db.students.updateOne({name:'sBob'},{$set:{fullTime:true}})`
  - update many: `.updateMany({},{$set:{fullTime:false}})`

### deleting

- remving a field `unset` operator
  - `.updateOne({_id: ObjectId('669f7956a49913493706dd8e')},{$unset:{fullTime:true}})`
- deleting a document
  - `.deleteOne({_id: ObjectId('669f7956a49913493706dd8e')})`
  - `deleteMany`

## fetching records

- .find({query},{projection}) ,

  - `db.students.find()`
  - `db.students.find({name:'sBob'})`...
  - requesting specific parameter `db.students.find({}, {_id:false, name:true})`
  - not equial to: `.find({name:{$ne:'sBob'}})`
    - less than: lt
    - less then equal to: lte
    - greater than: gt..
    - greater then and less then: `....{$gt:10, $lt:20}`
    - in operator: `{name:{$in:['this','that','all']}}`
    - not in: `nin`
  - logical operators ($and,$not,$nor,$or)
    - `{$and:[{fulltime:true},{age:{$lte:40,$gte:15}}]}`
    - `$not` will also give you values that have null values if they don't match the condition

- sorting
  - alphabetical:`db.students.find().sort({name:1})`
  - reverse: `db.students.find().sort({name:-1})`
- limiting
  - `db.students.find().limit(1)`
- chaining:
  - ASC order: `db.students.find().sort({name:1}).limit(1)`

## indexing the documents

- this will allow you to quickly collect a document using a field,
- this can also slow your crud operations, needs to be used purposefully
- `db.students.createIndex({name:1})`, ordered by alphabetical order, or -1 not ordered by alphabetical order
- fetch all the indexes: `db.students.getIndexes()`
- `[ { v: 2, key: { _id: 1 }, name: '_id_' } ]`
- to drop an index `db.students.dropIndex("_id_")` supply the name
