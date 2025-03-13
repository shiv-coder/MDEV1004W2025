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

const createGitHubRepository = async (req, res) => {
    try {
        const { name, description, privateRepo } = req.body; 

        if (!name) {
            return res.status(400).json({ error: "Repository name is required" });
        }

        const githubToken = process.env.GITHUB_TOKEN; // GitHub Personal Access Token
        if (!githubToken) {
            return res.status(500).json({ error: "GitHub token not configured in environment variables" });
        }
        const username = req.query.username ??"shiv-coder";
        // GitHub API endpoint to create a new repository
        const url = `https://api.github.com/user/repos`;

        
        const response = await axios.post(
            url,
            {
                name: name,
                description: description || "",
                private: privateRepo || false, // Default is public
            },
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );

        const repoData = response.data; 

        // Save the repository details to MongoDB
        const newRepo = new Repository({
            name: repoData.name,
            full_name: repoData.full_name,
            description: repoData.description,
            language: repoData.language,
            url: repoData.html_url,
            created_at: new Date(repoData.created_at),
            updated_at: new Date(repoData.updated_at),
        });

        const savedRepo = await newRepo.save();

        res.status(201).json({
            message: "Repository created on GitHub and saved in MongoDB",
            data: savedRepo,
        });

    } catch (error) {
        console.error("Error creating repository on GitHub:", error.response?.data || error);
        res.status(500).json({ error: "Failed to create repository on GitHub" });
    }
};

module.exports = { getRepositories, addRepository,createGitHubRepository};