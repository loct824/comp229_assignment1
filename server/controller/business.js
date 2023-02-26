const businessContact = require('../models/business.js');

module.exports.displayBusinessContacts = (req,res,next)=>{
    businessContact.find((err,businessContactsList)=>{
        if (err){
            return console.error(err);
        }
        else{
            // console.log(businessContactsList);
            // console.log(typeof businessContactsList);
            businessContactsList.sort((a, b) => a.name.localeCompare(b.name));
            res.render('business/list',{
                title:"Business Contacts", 
                businessContactsList
            });
        }
    });
};
  

module.exports.displayBusinessAddPage = (req,res,next)=>{
    res.render('business/add',{title:"Add Business Contacts"});
};

module.exports.postBusinessAddPage = (req,res,next)=>{
    let newContact = businessContact({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });
    businessContact.create(newContact,(err)=>{
        if (err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/business');
        }
    });
};

module.exports.displayBusinessEditPage = (req,res,next)=>{
    let id = req.params.id;
    businessContact.findById(id,(err,contactToEdit)=>{
        if (err){
            console.log(err);
        }
        else{
            res.render('business/edit',{title: 'Edit Contact', contactToEdit});
            // Book.insertMany([bookToEdit]);
        }
    });
};

module.exports.postBusinessEditPage = (req,res,next)=>{
    let id = req.params.id;
    let updatedContact = businessContact({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    })
    businessContact.findById(id,(err,contactToEdit)=>{
        if (err){
            console.log(err);
        }
        else{
            businessContact.updateOne({"_id":id},updatedContact,(err)=>{
                if (err){
                    console.log(err);
                    res.end(err);
                }
                else{
                    res.redirect('/business');
                }
            });
        }
    });
};

module.exports.deleteBusinessContact = (req,res,next)=>{
    let id = req.params.id;
    businessContact.remove({_id:id},(err)=>{
        if (err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/business');
        }
    });
};

