submitMessage = ()=>{
    document.getElementById("btnContactSubmit").addEventListener("click", ()=>{
        let inputPhone = document.getElementById("inputPhone").value;
        let inputEmail = document.getElementById("inputEmail").value;
        let inputMessage = document.getElementById("inputMessage").value;
        console.log("phone:"+inputPhone);
        console.log("email:"+inputEmail);
        console.log("msg:"+inputMessage); 
    })
};

module.exports = {submitMessage};