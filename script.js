//variaveis
const btnAddTask = document.querySelector('#add-task')
const taskForm = document.querySelector('#task-form')
const btnTaskSave = document.querySelector('#task-save')
const taskNameForm = document.querySelector('#task-name-form')
const taskDateForm = document.querySelector('#task-date-form')
const taskDescriptionForm = document.querySelector('#task-description-form')
const test = document.querySelector('#teste')
const taskListElement = document.querySelector('#task-list')
//const btnDeleteTask = document.querySelector('#delete-task')

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
        tasksHtml += `<li> <div> <h2>${taskList[i].name}</h2> <h2>${taskList[i].date}</h2> <button id="delete-task">delete</button> </div> <p>${taskList[i].description}</p> </li>`
    }
    taskListElement.innerHTML = tasksHtml
    createEventListener()
}

function createEventListener() {
    let btnsDeleteTask = document.querySelectorAll('#delete-task')
    let taskListItem = document.querySelectorAll('li')
    for (let i = 0; i < btnsDeleteTask.length; i++) {
        btnsDeleteTask[i].addEventListener('click', () => {
            taskList.splice(i)
            taskListItem[i].remove()
            localStorage.clear()
            localStorage.setItem('taskList', JSON.stringify(taskList))
        })
    }
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
    createEventListener()
})

//reload page
receiveFromLocalStorage()
constructor()