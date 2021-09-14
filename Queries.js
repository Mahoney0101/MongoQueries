// Inserts a document into collection
db.QueryPractice.insertOne(
    { "_id": 8,
      "Percent": 
        { "Default" : "5.00" , 
          "Override" : [ 
            { 
              "From": [ "Joe" ],
              "To": [ "Mary" ],
              "Percent": "12.00" }, 
            { 
              "From": [ "Bill" ],
              "To": [ "Ted" ],
              "Percent": "2.00" },
            { 
              "From": [ "Bob" ],
              "To": [ "Anne" ],
              "Percent": "1.00" } 
          ] 
        }
    }
)

// $push appends value to an array
db.QueryPractice.update({
    "_id" : 8
},
{
    $push:{
        "Percent.Override": {
            "From": [
                "Ben"
            ],
            "To": [
                "Bernie"
            ],
            "Percent" : "55.5"
        }
    }
}
)

//$pull remove from and array
db.QueryPractice.update({
    "_id" : 8
},
{
    $pull: {
        "Percent.Override": {
            "From":[
                "Ben"
            ]
        }
    }
}
)

// $ <- positional operater updates the first matching element
db.QueryPractice.update({
    "_id" : 8,
    "Percent.Override.From": [ "Joe" ]
},
{
    $set: {
        "Percent.Override.$.To": [ "Bert" ] 
        }
}
)

// $[] <- all positional updates all matching elements 
db.QueryPractice.updateMany({
    "_id" : 8,
    "Percent.Override.From": [ "Ben" ]
},
{
    $set: {
        "Percent.Override.$[].Percent": "155.5" 
        }
}
)

