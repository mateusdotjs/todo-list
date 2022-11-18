
class Todo {
    constructor(text) {
        this.text = text,
            this.done = false
    }
}

let list = []
listAll();

function listAll() {
    let taskList = document.querySelector('.tasks')
    taskList.innerHTML = '';

    if (localStorage.database) {
        list = JSON.parse(localStorage.database)
    }

    for (i = 0; i < list.length; i++) {
        let p = list[i].done == true ? `<p id="text"><s>${list[i].text}</s></p>` : `<p id="text">${list[i].text}</p>`
        let input = list[i].done == true ? `<input type="checkbox" id="checkbox" onclick="check(${i})" checked>` : `<input type="checkbox" id="checkbox" onclick="check(${i}, this)"></input>`
        taskList.innerHTML += `<div class="to-do" id="div${i}"> 
                                ${input}
                                ${p}
                                <img src="delete.svg" style="width:30px;height:30px" class="icon" onclick="deleteTask(${i})"></img> 
                                 </div>`
    }
}

function add() {
    let task = document.querySelector('#input')
    if (task.value != '') {
        //checa se há chave database ativa no localstorage
        if (localStorage.database) {
            list = JSON.parse(localStorage.database)
        }

        list.push(new Todo(task.value))
        task.value = ''
        localStorage.database = JSON.stringify(list)
        listAll()
    }
    else {
        alert('preencha o campo')
    }
}

function deleteTask(index) {
    list.splice(index, 1)
    localStorage.database = JSON.stringify(list)
    listAll()
}


function check(index) {
    if (list[index].done == false) {
        list[index].done = true
    }
    else {
        list[index].done = false
    }

    localStorage.database = JSON.stringify(list);
    listAll();
}

function clearAll() {
    localStorage.clear()
    list = []
    listAll()
}