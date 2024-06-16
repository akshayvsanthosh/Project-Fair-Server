const projects = require('../Models/projectModel')

// add project
exports.addProjectController = async (req,res) =>{
    console.log('Inside add projects function');
    const {title,language,github,website,overview,} = req.body
    const userId = req.payload
    const projectImg = req.file.filename
    console.log(title,language,overview,website,github,userId,projectImg);
    try {
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("Project already in our database.. Add another one.")
        } else {
            const newProject = new projects({
                title,language,github,website,overview,projectImg,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// home projects
exports.getHomeProjects = async (req,res)=>{
    console.log("Inside getHomeProjects");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// all projects
exports.allProjectsController = async (req,res)=>{
    console.log("Inside allProjectsController");
    try {
        const allProjects = await projects.find()
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// user projects
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}
