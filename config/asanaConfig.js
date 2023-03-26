const asana = require('asana');
const dotenv = require('dotenv');
dotenv.config();

const apiToken = process.env.ASANA_API_TOKEN;

const asanaClient = asana.Client.create({
    //To remove annoying messages resulting from Asana's api migration
    "defaultHeaders": {"asana-enable": "new_memberships, new_user_task_lists, new_goal_memberships"}
}).useAccessToken(apiToken);

module.exports = asanaClient