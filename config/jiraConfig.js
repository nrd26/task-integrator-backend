const jira = require('jira.js')
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


module.exports = jiraClient