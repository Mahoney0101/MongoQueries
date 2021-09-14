// Inserts a document into collection
db.QueryPractice.insertOne(
    { "_id": 8,
      "Percent": 
        { "Default" : 5.00 , 
          "Override" : [ 
            { 
              "From": [ "Joe" ],
              "To": [ "Mary" ],
              "Percent": 12.00 }, 
            { 
              "From": [ "Bill" ],
              "To": [ "Ted" ],
              "Percent": 2.00 },
            { 
              "From": [ "Bob" ],
              "To": [ "Anne" ],
              "Percent": 1.00 } 
          ] 
        }
    }
)

// $push appends value to an array (Allows duplicates)
db.QueryPractice.update(
    { "_id" : 8 },
    { $push: { "Percent.Override": { "From": [ "Ben" ], "To": [ "Bernie" ], "Percent" : "55.5" }}}
)

// $addToSet adds to an array. Will not create a duplicate 
db.QueryPractice.update(
    { "_id": 8 }, 
    { $addToSet: { "Percent.Override" : { "From": [ "Charlotte" ], "To": [ "Johnny" ], "Percent": 18.00 }}}
)

//$pull remove from and array
db.QueryPractice.update(
    { "_id" : 8 },
    { $pull: { "Percent.Override": { "From":[ "Ben" ]}}}
)

// $ <- positional operater updates the first matching element
db.QueryPractice.update(
    { "_id" : 8, "Percent.Override.From": [ "Joe" ] },
    { $set: { "Percent.Override.$.To": [ "Bert" ] }}
)

// $[] <- all positional updates all matching elements 
db.QueryPractice.updateMany(
    { "_id" : 8, "Percent.Override.From":  [ "Ben" ]},
    { $set: { "Percent.Override.$[].Percent": "155.5" }}
)

db.QueryPractice.updateMany(
    {},
    { $set: {"Percent.Override.$[elem].Percent": "123456.0"}},
    { multi: true,
      arrayFilters: [ { "elem.From": "Bob" }]}
)

db.QueryPractice.updateMany(
    {},
    { $set: {"Percent.Override.$[elem].Percent": "123456.0"}},
    { multi: true,
      arrayFilters: [ { "elem.From": { $gte : "C" } }]}
)

db.QueryPractice.updateMany(
    {},
    { $set: {"Percent.Override.$[elem].From": [ "James" ]}},
    { multi: true,
      arrayFilters: [ { "elem.Percent": { $gt : 1 } }]}
)

db.QueryPractice.updateMany(
    {},
    { $set: {"Percent.Override.$[elem].To": [ "Sarah" ]}},
    { multi: true,
      arrayFilters: [ { "elem.Percent": { $lte : 2 } }]}
)

// increment value by 18
db.QueryPractice.findOneAndUpdate(
    { "_id" : 8 },
    { $inc: { "Percent.Default" : 18 }}
)

// sets a max time limit to complete the update
try{
    db.QueryPractice.findOneAndUpdate(
    { "_id" : 8 },
    { $inc: { "Percent.Default" : 18 } , maxTime : 0.001}
    )
}
catch(e){
    print(e)
}

db.QueryPractice.distinct("Percent.Override.From")