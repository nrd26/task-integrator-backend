const jira = require('jira.js')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.JIRA_HOST;
const email = process.env.JIRA_EMAIL;
const apiToken = process.env.JIRA_API_TOKEN;

const jiraClient = new jira.Version3Client({
    host: host,
    authentication:{
      basic:{
        email: email,
        apiToken: apiToken
      }
    },
    strictSSL: false,
    newErrorHandling: true,
  })

  //Jira GET
  async function jiraGet(){
    var results = []
    await fetch(host+'/rest/agile/1.0/board/2/issue', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        email+':'+apiToken
      ).toString('base64')}`,
      'Accept': 'application/json',
    }
  })
    .then(response => response.json())
    .then(result =>  {
      for (let index = 0; index < result.issues.length; index++) {
        results.push({id: result.issues[index].id ,task: result.issues[index].fields.summary, platform: 'Jira'})
      }
    })
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
          issuetype: {
            name: 'Task'
          },
          project: {
            key: 'TT',
          }
        }
      });
  
      const issue = await jiraClient.issues.getIssue({ issueIdOrKey: id });
      response.status(201).send('Task added in Jira')
      console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project in Jira.`);
    } else {
      console.log("No projects")
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

    fetch(host+`/rest/api/3/issue/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(
          email+':'+apiToken
        ).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
  body: bodyData
})
response.status(200).send(`Task modified with ID: ${id}`)
  }

  //Jira DELETE
  async function jiraDelete(id,response) {
    fetch(host+`/rest/api/3/issue/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      email+':'+apiToken
    ).toString('base64')}`
  }
}).catch(err => console.error(err));
    response.status(200).send(`Task deleted on Jira with ID: ${id}`)
  }

  module.exports = {
    jiraGet,
    jiraPost,
    jiraPut,
    jiraDelete
  }