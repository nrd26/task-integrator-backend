const asana = require('asana');
const dotenv = require('dotenv');
dotenv.config();

const workspace = process.env.ASANA_WORKSPACE;
const assignee = process.env.ASANA_ASSIGNEE;
const apiToken = process.env.ASANA_API_TOKEN;

const asanaClient = asana.Client.create({
    "defaultHeaders": {"asana-enable": "new_memberships, new_user_task_lists"}
}).useAccessToken(apiToken);



//Asana GET request
async function asanaGet() {
    var results = []
    await asanaClient.tasks.getTasks({workspace:workspace, assignee:assignee, opt_pretty: true})
  .then((result) => {
    for (let index = 0; index < result.data.length; index++) {
      results.push({id: result.data[index].gid ,task: result.data[index].name, platform: 'Asana'})
    }
})
    return results;
}

//Asana POST request
async function asanaPost(task, response) {
    await asanaClient.tasks.createTask({name: task, workspace:workspace.toString(), assignee:assignee.toString(), pretty: true})
      response.status(201).send('Task added in Asana')
  }
  
  //Asana PUT request
  async function asanaPut(taskGid, task, response){
    await asanaClient.tasks.updateTask(taskGid, {name: task, workspace:workspace.toString(), assignee:assignee.toString(), pretty: true})
      response.status(200).send(`Task modified with ID: ${taskGid}`)
  }
  
  // Asana DELETE request
  async function asanaDelete(taskGid, response){
    await asanaClient.tasks.deleteTask(taskGid);
    response.status(200).send(`Task modified with ID: ${taskGid}`)
  }

  module.exports = {
   asanaGet,
   asanaPost,
   asanaPut,
   asanaDelete
  }