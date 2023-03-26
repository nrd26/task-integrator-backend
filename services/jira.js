const fetch = require('node-fetch')
const jiraClient = require('../config/jiraConfig')
const jiraUtils = require('../utils/jiraUtils')

  //Jira GET
  async function jiraGet(response){
    var results = []
    try {
      await fetch(jiraUtils.getLink, {
        method: 'GET',
        headers: jiraUtils.headers
      })
        .then(response => response.json())
        .then(result =>  {
          for (let index = 0; index < result.issues.length; index++) {
            results.push({id: result.issues[index].id ,task: result.issues[index].fields.summary, platform: 'Jira'})
          }
        })
    } catch (error) {
      response.send(`Could not fetch data from Jira due to error ${error}`)
    }
    return results;
  }

  //Jira POST
  async function jiraPost(task, response) {
    const projects = await jiraClient.projects.getAllProjects();
  
    if (projects.length) {
      const project = projects[1];
  
        const { id } = await jiraClient.issues.createIssue({
          fields: {
            summary: `${task}`,
            issuetype: {name: 'Task'},
            project: {key: 'TT',}
          }
        });
  
      const issue = await jiraClient.issues.getIssue({ issueIdOrKey: id });
      response.status(201).send('Task added in Jira')
      console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project in Jira.`);
    } else {
      console.log("No projects")
      response.send(`Could not add task ${task} in Jira`)
    }
  }

  //Jira PUT
  async function jiraPut(id, task,response) {
    const bodyData = `{
        "update":{
            "summary":[
                {
                    "set":"${task}"
                }
            ]
        }
    }`;

    try {
      fetch(jiraUtils.putLink+`${id}`, {
        method: 'PUT',
        headers: jiraUtils.headers,
    body: bodyData
  })
    } catch (error) {
      response.send(`Could not edit task ${task} with id ${id} in Jira due to error ${error}`)
    }
    
response.status(200).send(`Task modified with ID: ${id}`)
  }

  //Jira DELETE
  async function jiraDelete(id,response) {
    fetch(jiraUtils.deleteLink+`${id}`, {
  method: 'DELETE',
  headers: jiraUtils.headers
}).catch(err => response.send(`Could not delete task with id ${id} in Jira due to error ${err}`));
    response.status(200).send(`Task deleted on Jira with ID: ${id}`)
  }

  module.exports = {
    jiraGet,
    jiraPost,
    jiraPut,
    jiraDelete
  }