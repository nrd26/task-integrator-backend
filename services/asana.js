const dotenv = require('dotenv');
dotenv.config();
const asanaClient = require('../config/asanaConfig')

const workspace = process.env.ASANA_WORKSPACE;
const assignee = process.env.ASANA_ASSIGNEE;

//Asana GET request
async function asanaGet(response) {
    var results = []
    try {
      await asanaClient.tasks.getTasks({workspace:workspace, assignee:assignee, opt_pretty: true})
  .then((result) => {
    for (let index = 0; index < result.data.length; index++) {
      results.push({id: result.data[index].gid ,task: result.data[index].name, platform: 'Asana'})
    }})} catch (error) {
      response.send(`Could not fetch data from Asana due to error ${error}`)
    }
    
    return results;
}

//Asana POST request
async function asanaPost(task, response) {
  try {
    await asanaClient.tasks.createTask({name: task, workspace:workspace.toString(), assignee:assignee.toString(), pretty: true})
  } catch (error) {
    response.send(`Could not add task ${task} in Asana due to error ${error}`)
  }
    
      response.status(201).send('Task added in Asana')
  }
  
  //Asana PUT request
  async function asanaPut(taskGid, task, response){
    try {
      await asanaClient.tasks.updateTask(taskGid, {name: task, workspace:workspace.toString(), assignee:assignee.toString(), pretty: true})
    } catch (error) {
      response.send(`Could not edit task ${task} with id ${taskGid} in Asana due to error ${error}`)
    }
    
      response.status(200).send(`Task modified with ID: ${taskGid}`)
  }
  
  // Asana DELETE request
  async function asanaDelete(taskGid, response){
    try {
      await asanaClient.tasks.deleteTask(taskGid);
    } catch (error) {
      response.send(`Could not delete task with id ${taskGid} in Asana due to error ${error}`)
    }
    
    response.status(200).send(`Task modified with ID: ${taskGid}`)
  }

  module.exports = {
   asanaGet,
   asanaPost,
   asanaPut,
   asanaDelete
  }