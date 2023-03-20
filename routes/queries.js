const pgTasks = require('../controllers/pgsql')
const jiraTasks = require('../controllers/jira')
const asanaTasks = require('../controllers/asana')

// GET all tasks
const getTasks = async function (request, response) {
  var pgGetResult = await pgTasks.pgGet();
  var jiraGetResult = await jiraTasks.jiraGet();
  var asanaGetResult = await asanaTasks.asanaGet();

  var results = [...pgGetResult, ...jiraGetResult,...asanaGetResult];

  response.status(200).json(results)
  }

//   POST a new Task
const createTask = async (request, response) => {
    const { task, platform } = request.body;

    if(platform === 'Jira'){
      jiraTasks.jiraPost(task, response);
    }
    else if (platform === 'Asana') {
      asanaTasks.asanaPost(task, response);
    }
    else {
      pgTasks.pgPost(task, platform, response);
    }  
  }

  
//   PUT updated data in an existing Task
const updateTask = (request, response) => {
    const id = parseInt(request.params.id)
    const { task, platform } = request.body

    if (platform === 'Jira') {
      jiraTasks.jiraPut(id, task, response)
    } else if (platform === 'Asana') {
      asanaTasks.asanaPut(id, task, response);
    }
    else {
     pgTasks.pgPut(id, task, platform, response)
    } 
  }

//   DELETE a Task
const deleteTask = (request, response) => {
    const id = parseInt(request.params.id)
    const platform = request.params.platform

    if (platform === 'Jira') {
      jiraTasks.jiraDelete(id,response)
    }else if (platform === 'Asana') {
      asanaTasks.asanaDelete(id, response);
    } else {
      pgTasks.pgDelete(id, response)
    }
  }

  module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }