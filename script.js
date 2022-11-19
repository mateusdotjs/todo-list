
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
        //operações ternárias que retornam texto riscado e checkbox assinalado
        let p = list[i].done == true ? `<p id="text"><s>${list[i].text}</s></p>` : `<p id="text">${list[i].text}</p>`
        let input = list[i].done == true ? `<input type="checkbox" id="checkbox" onclick="check(${i})" checked>` : `<input type="checkbox" id="checkbox" onclick="check(${i}, this)"></input>`
        taskList.innerHTML += `<div class="to-do" id="div${i}"> 
                                ${input}
                                ${p}
                                <img src="img/edit.svg" style="width:30px;height:30px" class="icon" onclick="openModal(${i})"></img>
                                <img src="img/delete.svg" style="width:30px;height:30px" class="icon" onclick="deleteTask(${i})"></img> 
                                 </div>`
    }
}

function addTask() {
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

function openModal(index) {
    let modal = document.querySelector('.modal-bg')
    modal.style.display = 'flex'

    modal.onclick = e => {
        let btnEdit = document.querySelector('#edit')
        let btnExit = document.querySelector('#exit')
        if (e.target == btnEdit) {
            let inputEdit = document.querySelector('#inputEdit')
            list[index].text = inputEdit.value
            inputEdit.value = ''
            modal.style.display = 'none'
            localStorage.database = JSON.stringify(list)
            listAll()
        } else if (e.target == btnExit) {
            inputEdit.value = ''
            modal.style.display = 'none'
        }
    }
}


function closeModal() {
    let modal = document.querySelector('.modal-bg')
    modal.style.display = 'none'
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

function deleteTask(index) {
    list.splice(index, 1)
    localStorage.database = JSON.stringify(list)
    listAll()
}

function clearAll() {
    localStorage.clear()
    list = []
    listAll()
}