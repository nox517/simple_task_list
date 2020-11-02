//UI Vars

const form = document.querySelector('#task-form'),
    taskList = document.querySelector('.collection'),
    clearBtn = document.querySelector('.clear-tasks'),
    filter = document.querySelector('#filter'),
    taskInput = document.querySelector('#task'),
    modal = document.querySelector('#modal1');




    //Load all event Listeners
loadEventListeners();

    //Load all event Listeners

function loadEventListeners() {

    //Dom load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add Task event
    form.addEventListener('submit', addTask);

    //Remove Task Event
    taskList.addEventListener('click', removeTask);


    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Tasks event
    filter.addEventListener('keyup', filterTasks);
}

//get Tasks from LocalStorage

function getTasks() { 
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) { 
    // Create the Li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create Text node and append it to li
    li.appendChild(document.createTextNode(task));

    // Create new Link element (Delect icon)
    const link = document.createElement('a');

    //Add class for link element
    link.className = 'delete-item secondary-content';

    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link (delete button) to li
    li.appendChild(link);

    //append the link (delete button) to li
    li.appendChild(update);

    //append the li to ul
    taskList.appendChild(li);
    })
}


//Add Task
function addTask(e) { 
    if (taskInput.value === '') { 
        alert('Please, Add a task...');
    }
    // Create the Li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create Text node and append it to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new Link element (Delect icon)
    const link = document.createElement('a');

    //Add class for link element
    link.className = 'delete-item secondary-content';

    //Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link (delete button) to li
    li.appendChild(link);

    //append the li to ul
    taskList.appendChild(li);


    //Store in localStorage
    storeTasksInLocalStorage(taskInput.value);

    //Clear input after adding
    taskInput.value = '';

    e.preventDefault();
}


//Store Task In LocalStorage

function storeTasksInLocalStorage(task) { 
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task
function removeTask(e) { 
    if (e.target.parentElement.classList.contains('delete-item')) { 
        if (window.confirm('Are You Sure?')) { 
            e.target.parentElement.parentElement.remove();
            
            //Remove Task From Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}


//Remove from local storage
function removeTaskFromLocalStorage(taskItem) { 
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else { 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks
function clearTasks() { 
    while (taskList.firstChild) { 
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

//Clear Tasks From local storage

function clearTasksFromLocalStorage() { 
    localStorage.clear();
}

//filter Tasks

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) { 
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })

}
