//variaveis
const btnAddTask = document.querySelector('#add-task')
const taskForm = document.querySelector('#task-form')
const btnTaskSave = document.querySelector('#task-save')
const taskNameForm = document.querySelector('#task-name-form')
const taskDateForm = document.querySelector('#task-date-form')
const taskDescriptionForm = document.querySelector('#task-description-form')
const test = document.querySelector('#teste')
const taskListElement = document.querySelector('#task-list')

let taskList = []

//funcoes
function sendToLocalStorage() {
    const task = {
        name: taskNameForm.value,
        date: taskDateForm.value,
        description: taskDescriptionForm.value,
    }
    taskList.push(task)
    localStorage.setItem('taskList', JSON.stringify(taskList))

    taskForm.reset()
    taskForm.classList.add('hidden')
    constructor()
}

function receiveFromLocalStorage() {
    const taskListExist = JSON.parse(localStorage.getItem('taskList'))
    if (taskListExist) {
        taskList = JSON.parse(localStorage.getItem('taskList'))
    }
    
}

function constructor() {
    let tasksHtml = ""
    for (i = 0; i < taskList.length; i++) {
        tasksHtml += `<li> <h2>${taskList[i].name}</h2> <h2>${taskList[i].date}</h2> <p>${taskList[i].description}</p>  </li>`
    }
    taskListElement.innerHTML = tasksHtml
}



//eventos
btnAddTask.addEventListener('click', () => {
    console.log('afsaf')
    taskForm.classList.toggle('hidden')
})

taskForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    sendToLocalStorage()
})

test.addEventListener('click', () => {
    receiveFromLocalStorage()
    constructor()
})


//reload page
receiveFromLocalStorage()
constructor()