const axios = require('axios');
const Repository = require('../model/repoModel');

const getRepositories =async(req,res)=>{
    try{
            const username = req.query.username ??"shiv-coder";
            const url = `https://api.github.com/users/${username}/repos`;
            const response = await axios.get(url,{
                headers: {
                    Authororization:`token ${process.env.GITHUB_TOKEN}`;
                }
            });
            const repoData = response.data;

            //Map the response data to our model file

            const repositories = repoData.map((repo)=>({
                    name: repo.name,
                    full_name:repo.full_name;
                    description = repo.description;
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

module.exports = { getRepositories};