const dotenv = require('dotenv');
dotenv.config();

const host = process.env.JIRA_HOST;
const email = process.env.JIRA_EMAIL;
const apiToken = process.env.JIRA_API_TOKEN;

const headers = {
    'Authorization': `Basic ${Buffer.from(
      email+':'+apiToken
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
const getLink = host+'/rest/agile/1.0/board/2/issue'
const putLink = host+`/rest/api/3/issue/`
const deleteLink = host+`/rest/api/3/issue/`

module.exports = {
    headers,
    getLink,
    putLink,
    deleteLink
}
