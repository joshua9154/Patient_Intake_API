 var express = require("express");
 var router = express.Router();
 let request = require('request');


router.get("/", function(req, res, next) {
   res.render("modify", { title: "Patient Intake" });
 });
 
 
 router.post("/UpdateContact", async function(req, res, next) {
    const { contactId, patientId, title, firstName, middleInitial, lastName, phone, email, sex, dob, street, city, state, zip, relationToPatient, type, emergencyPriority, signature } = req.body;
    var result=1
     
    request.put(
    'https://dzsqyl-8080.preview.csb.app/contacts',
    { json: { 
      "contactId":contactId,  
      "patientId": patientId ,
     "title": title,
     "firstName": firstName,
     "middleInitial": middleInitial,
     "lastName":lastName,
     "phone":phone,
     "email":email,
    "sex":sex,
    "dateOfBirth": dob,
    "street":street,
    "city":city,
    "state":state,
    "zip":zip,
    "relationToPatient":relationToPatient,
    "type":type,
    "emergencyPriority":emergencyPriority,
    "signature":signature
    
    }
    },
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
         //   result="Thank You, your Contact has been updated "
              result=body;
              res.render("modResponse", {
             title: "Contact",
              result 
    
               });
        }
        else{
            console.log(body);
            result= JSON.stringify(body)
              res.render("modResponse", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});

router.post("/UpdatePatient", async function(req, res, next) {
   const { patientId,title, firstName, middleInitial, lastName, phone, email, sex, ssn, dob, street, city, state, zip, insuranceCompany, plan, groupNumber, cardHolder,medications,allergies,surgeries,familyHistory,addictions,questionnaire,symptoms, signature } = req.body;
   var result= 0
   
    request.put(
    'https://dzsqyl-8080.preview.csb.app/patient',
    { json: { 
      "patientId":patientId,  
     "title": title,
     "firstName": firstName,
     "middleInitial": middleInitial,
     "lastName":lastName,
     "phone":phone,
     "email":email,
    "sex":sex,
     "ssn":ssn,
    "dateOfBirth": dob,
    "street":street,
    "city":city,
    "state":state,
    "zip":zip,
    "insuranceCompany": insuranceCompany,
    "plan": plan,
    "groupNumber": groupNumber,
    "cardHolder": cardHolder,
     "medications": {"Update":medications},
     "allergies": {"Update":allergies},
     "surgeries": {"Update":surgeries},
     "familyHistory": { "Update":familyHistory},
     "addictions": { "Update":addictions},
     "questionnaire": {"Blood Type":questionnaire },
    "symptoms": {"Update":symptoms },
    "signature":signature
    
    }
    },
    async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
           // result="Thank You, your Patient ID is "+body.insertId
             result=body;
              res.render("modResponse", {
              title: "Patient",
              result 
    
               });
        }
        else{
            console.log(body);
            result= JSON.stringify(body)
              res.render("modResponse", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});

router.post("/DeletePatient", async function(req, res, next) {
   const { patientId} = req.body;

   var result= "Patient not found with ID "+patientId
  // var titles="Error"
  // var contact= "No Contacts found for Patient with ID "+patientId
   
   
    request.delete('https://dzsqyl-8080.preview.csb.app/patient/'+patientId+'',
    async function (error, response, body) {
        if (!error ) {
            console.log(body);
            result=body;
             res.render("modResponse", {
                 title: "Error",
                  result 
    
  });      
                 }
        else{
           
              res.render("modResponse", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});

router.post("/DeleteContact", async function(req, res, next) {
   const { contactId} = req.body;

   var result= "Contact not found with ID "+contactId
 
   
   
    request.delete('https://dzsqyl-8080.preview.csb.app/contacts/'+contactId+'',
    async function (error, response, body) {
        if (!error ) {
            console.log(body);
            result=body;
             res.render("modResponse", {
                 title: "Error",
                  result 
    
  }); 
                 }
        else{
           
              res.render("modResponse", {
                 title: "Error",
                  result 
    
  });
        }
    }
);
});
module.exports = router;

