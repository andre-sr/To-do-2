//variaveis
const btnAddTask = document.querySelector('#add-task')
const taskForm = document.querySelector('#task-form')
const btnTaskSave = document.querySelector('#task-save')
const taskNameForm = document.querySelector('#task-name-form')
const taskDateForm = document.querySelector('#task-date-form')
const taskTimeForm = document.querySelector('#task-time-form')
const taskDescriptionForm = document.querySelector('#task-description-form')
const test = document.querySelector('#teste')
const taskListElement = document.querySelector('#task-list')

let taskList = JSON.parse(localStorage.getItem('taskList')) || []

//funcoes
function sendToLocalStorage() {
    const task = {
        name: taskNameForm.value,
        date: taskDateForm.value,
        time: taskTimeForm.value,
        description: taskDescriptionForm.value,
        done: false,
        delay: false,
    }
    taskList.push(task)
    localStorage.setItem('taskList', JSON.stringify(taskList))

    taskForm.reset()
    taskForm.classList.add('hidden')
    delayValidation()
    constructor()
}

function constructor() {
    let tasksHtml = ""
    for (i = 0; i < taskList.length; i++) {
        tasksHtml += `<li> <div class="header-li" > <div> <input id="ended-task" type="checkbox" > <h2>${taskList[i].name}</h2> <h2>${taskList[i].date}</h2> </div>  <button id="delete-task">delete</button> </div> <p>${taskList[i].description}</p> </li>`
    }

    taskListElement.innerHTML = tasksHtml
    let taskListItem = document.querySelectorAll('li')
    
    for (i = 0; i < taskList.length; i++) {
        if(taskList[i].done === true) {
            taskListItem[i].style.color = "#98FB98"
    
        }

        if(taskList[i].delay === true) {
            taskListItem[i].style.color = "#d03a3a"
        }

    }

    createEventListener()
}

function createEventListener() {
    let btnsDeleteTask = document.querySelectorAll('#delete-task')
    let taskListItem = document.querySelectorAll('li')
    let btnEndedTask = document.querySelectorAll('#ended-task')
    for (let i = 0; i < btnsDeleteTask.length; i++) {
        btnsDeleteTask[i].addEventListener('click', () => {
            taskList.splice(i)
            taskListItem[i].remove()
            localStorage.clear()
            localStorage.setItem('taskList', JSON.stringify(taskList))
        })
        btnEndedTask[i].addEventListener('change', () => {
            if (taskList[i].done === false ) {
                taskListItem[i].style.color = "#98FB98" //color: #000000;
                taskList[i].done = true
                localStorage.clear()
                localStorage.setItem('taskList', JSON.stringify(taskList))
            } else {
                taskListItem[i].style.color = "#000000"
                taskList[i].done = false
                localStorage.clear()
                localStorage.setItem('taskList', JSON.stringify(taskList))
            }  
        })
    }
}

function delayValidation() {
    let actualDate = new Date()
    for (i = 0; i < taskList.length; i++) {
        let dateFormated = new Date(taskList[i].date + 'T' + taskList[i].time + ':00Z')
        console.log(dateFormated)
        if (dateFormated < actualDate) {
            console.log('a data é menor')
            taskList[i].delay = true
        } else {
            taskList[i].delay = false
        }
    }
}

//eventos
btnAddTask.addEventListener('click', () => {
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
delayValidation()
constructor()