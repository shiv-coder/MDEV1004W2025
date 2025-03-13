const axios = require('axios');
const mongoose = require('mongoose');
const Repository = require('../model/repoModel');

const getRepositories =async(req,res)=>{
    try{
            const username = req.query.username ??"shiv-coder";
            const url = `https://api.github.com/users/${username}/repos`;
            const response = await axios.get(url,{
                headers: {
                    Authororization:`token ${process.env.GITHUB_TOKEN}`
                }
            });
            const repoData = response.data;

            //Map the response data to our model file

            const repositories = repoData.map((repo)=>({
                    name: repo.name,
                    full_name:repo.full_name,
                    description : repo.description,
                    language :repo.language,
                    url:repo.html_url,
                    created_at :new Date(repo.created_at),
                    updated_At:new Date(repo.updated_at)
                    
            }));

            //Insert repositories into Mongodb
            await Repository.insertMany(repositories);

            res.status(200).json({
                message:`Fetched and saved ${repositories.length} repositories for user ${username}`,
                data:repositories
            });

    }
    catch(err){
            console.error("Error fetchinhg repositories",err);
            res.status(500).json({error:"Failed to fetch repositories"});
    }
};

const addRepository = async (req, res) => {
    try {
        const { name, full_name, description, language, url, created_at, updated_at } = req.body;

        // Check if required fields are provided
        if (!name || !full_name || !url) {
            return res.status(400).json({ error: "Name, full_name, and URL are required fields" });
        }

        // Create new repository document
        const newRepo = new Repository({
            name,
            full_name,
            description,
            language,
            url,
            created_at: created_at ? new Date(created_at) : new Date(),
            updated_at: updated_at ? new Date(updated_at) : new Date(),
        });

     
        const savedRepo = await newRepo.save();

        res.status(201).json({
            message: "Repository added successfully",
            data: savedRepo,
        });

    } catch (error) {
        console.error("Error adding repository:", error);
        res.status(500).json({ error: "Failed to add repository" });
    }
};


module.exports = { getRepositories, addRepository};