module.exports.displayHomePage = (req,res,next)=>{
    res.render('home', { title: 'Home' });
};

module.exports.displayAboutMePage = (req,res,next)=>{
    res.render('aboutme', { title: 'About' });
};

module.exports.displayProjectsPage = (req,res,next)=>{
    res.render('projects', { title: 'Projects' });
};

module.exports.displayServicesPage = (req,res,next)=>{
    res.render('services', { title: 'Services' });
};

module.exports.displayContactPage = (req,res,next)=>{
    res.render('contact', { title: 'Contact' });
};

module.exports.getResume = (req,res,next)=>{
    res.download('./public/content/Ivan_Lo_resume.pdf', function(err){
        console.log("Error:",err);
    });
};