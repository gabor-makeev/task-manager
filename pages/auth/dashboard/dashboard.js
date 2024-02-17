import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { addDoc, collection, onSnapshot, query, orderBy, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import { auth } from "../../../firebase/auth.js"
import { db } from "../../../firebase/db.js"

const addLogOutButtonAction = () => {
  const logOutButton = document.getElementById("header__sign-out-button")
  logOutButton.addEventListener("click", (e) => {
    signOut(auth)
      .then(() => {
        window.location.href = window.location.protocol + "//" + window.location.host + "/task-manager-front/pages/login/login.html"
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

const showUserDisplayName = () => {
  const userDisplayName = document.getElementById("dashboard-sidebar__user-display-name")

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userDisplayName.textContent = user.displayName
    }
  })
}

const removeAddTaskForm = () => {
  const addTaskOverlay = document.getElementById('dashboard-main__add-task-overlay')

  if (addTaskOverlay) {
    addTaskOverlay.remove()
  }
}

const showAddTaskForm = () => {
  const dashboardMain = document.getElementById("dashboard-main")
  const addTaskOverlay = document.createElement("div")

  addTaskOverlay.id = "dashboard-main__add-task-overlay"
  addTaskOverlay.innerHTML = "<button id='dashboard-main__add-task-overlay__close-button'>X</button>" +
    "<form id='dashboard-main__add-task-overlay__form'>" +
    "<label for='dashboard-main__add-task-overlay__form__name-input' class='dashboard-main__add-task-overlay__form__name-label'>Task name</label>" +
    "<input type='text' id='dashboard-main__add-task-overlay__form__name-input' required>" +
    "<label for='dashboard-main__add-task-overlay__form__description-input' class='dashboard-main__add-task-overlay__form__description-label'>Task description</label>" +
    '<textarea cols="30" rows="10" id="dashboard-main__add-task-overlay__form__description-input" required></textarea>' +
    "<label for='dashboard-main__add-task-overlay__form__start-date-input' class='dashboard-main__add-task-overlay__form__start-date-label'>Start date</label>" +
    "<input type='date' id='dashboard-main__add-task-overlay__form__start-date-input'>" +
    "<label for='dashboard-main__add-task-overlay__form__due-date-input' class='dashboard-main__add-task-overlay__form__due-date-label'>Due date</label>" +
    "<input type='date' id='dashboard-main__add-task-overlay__form__due-date-input'>" +
    "<input type='submit' value='Add' id='dashboard-main__add-task-overlay__form__submit-input'>" +
    "</form>"

  dashboardMain.appendChild(addTaskOverlay)

  const addTaskOverlayCloseButton = document.getElementById("dashboard-main__add-task-overlay__close-button")

  addTaskOverlayCloseButton.addEventListener("click", (e) => {
    removeAddTaskForm()
  })

  const addTaskForm = document.getElementById('dashboard-main__add-task-overlay__form')

  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const form = e.target
    const formInputs = form.elements
    const task = {
      name: formInputs['dashboard-main__add-task-overlay__form__name-input'].value,
      description: formInputs['dashboard-main__add-task-overlay__form__description-input'].value,
      startDate: Math.floor(new Date(formInputs['dashboard-main__add-task-overlay__form__start-date-input'].value).getTime() / 1000),
      dueDate: Math.floor(new Date(formInputs['dashboard-main__add-task-overlay__form__due-date-input'].value).getTime() / 1000),
      createdAt: Math.floor(new Date().getTime() / 1000),
      userId: auth.currentUser.uid
    }

    addDoc(collection(db, 'tasks'), task).then(() => {
      removeAddTaskForm()
    })
  })

  const addTaskFormTaskNameInput = document.getElementById("dashboard-main__add-task-overlay__form__name-input")

  addTaskFormTaskNameInput.focus()

  addTaskOverlay.addEventListener('click', (e) => {
    if (e.target.id === "dashboard-main__add-task-overlay") {
      removeAddTaskForm()
    }
  })
}

const addAddTaskButtonAction = () => {
  const addTaskButton = document.getElementById("dashboard-view__header__add-task-button")

  addTaskButton.addEventListener("click", (e) => {
    showAddTaskForm()
  })
}

const getFormattedDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000)
  const dayString = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const monthString = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const yearString = date.getFullYear()

  return `${dayString} / ${monthString} / ${yearString}`
}

const removeTaskModalWindow = () => {
  const taskModalWindow = document.getElementById("dashboard-main__show-task-overlay")

  if (taskModalWindow) {
    taskModalWindow.remove()
  }
}

const showTaskModalWindow = (task) => {
  const dashboardMain = document.getElementById("dashboard-main")
  const showTaskOverlay = document.createElement("div")

  showTaskOverlay.id = "dashboard-main__show-task-overlay"
  showTaskOverlay.innerHTML = "<button id='dashboard-main__show-task-overlay__close-button'>X</button>" +
      "<div id='dashboard-main__show-task-overlay__content-box'>" +
      `<p><b>Task name:</b> ${task.name}</p>` +
      `<p><b>Task description:</b> ${task.description}</p>` +
      `<p><b>Start date:</b> ${task.startDate ? getFormattedDate(task.startDate) : "Not set"}</p>` +
      `<p><b>Due date:</b> ${task.dueDate ? getFormattedDate(task.dueDate) : "Not set"}</p>` +
      "</div>"

  dashboardMain.appendChild(showTaskOverlay)

  const showTaskOverlayCloseButton = document.getElementById("dashboard-main__show-task-overlay__close-button")

  showTaskOverlayCloseButton.addEventListener("click", (e) => {
    removeTaskModalWindow()
  })

  showTaskOverlay.addEventListener("click", (e) => {
    if (e.target.id === "dashboard-main__show-task-overlay") {
      removeTaskModalWindow()
    }
  })
}

const deleteTask = (taskId) => {
  deleteDoc(doc(db, "tasks", taskId))
}

const showTasks = () => {
  const contentContainer = document.getElementById("dashboard-view__content")
  const tasksTable = document.createElement("table")
  const tasksTableHead = document.createElement("thead")
  const tasksTableHeadTr = document.createElement("tr")
  const tasksTableHeadThName = document.createElement("th")
  tasksTableHeadThName.textContent = "Name"
  const tasksTableHeadThStartDate = document.createElement("th")
  tasksTableHeadThStartDate.textContent = "Start date"
  const tasksTableHeadThDueDate = document.createElement("th")
  tasksTableHeadThDueDate.textContent = "Due date"
  const tasksTableBody = document.createElement("tbody")

  tasksTable.appendChild(tasksTableHead)
  tasksTable.appendChild(tasksTableBody)
  tasksTableHead.appendChild(tasksTableHeadTr)
  tasksTableHeadTr.appendChild(tasksTableHeadThName)
  tasksTableHeadTr.appendChild(tasksTableHeadThStartDate)
  tasksTableHeadTr.appendChild(tasksTableHeadThDueDate)

  contentContainer.appendChild(tasksTable)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"), where("userId", "==", user.uid))

      onSnapshot(q, (querySnapshot) => {
        tasksTableBody.innerHTML = ""
        querySnapshot.forEach((doc) => {
          const task = doc.data()
          const formattedStartDate = task.startDate ? getFormattedDate(task.startDate) : null
          const formattedDueDate = task.dueDate ? getFormattedDate(task.dueDate) : null

          const taskElement = document.createElement("tr")
          const taskElementName = document.createElement("td")
          taskElementName.textContent = task.name
          const taskElementStartDate = document.createElement("td")
          taskElementStartDate.textContent = formattedStartDate ? formattedStartDate : "Not set"
          const taskElementDueDate = document.createElement("td")
          taskElementDueDate.textContent = formattedDueDate ? formattedDueDate : "Not set"
          const taskElementOpenButton = document.createElement("button")
          taskElementOpenButton.textContent = "🔎"
          taskElementOpenButton.title = "Open the task"
          const taskElementDeleteButton = document.createElement("button")
          taskElementDeleteButton.textContent = "🗑"
          taskElementDeleteButton.title = "Delete the task"

          taskElementOpenButton.addEventListener("click", () => {
            showTaskModalWindow(task)
          })

          taskElementDeleteButton.addEventListener("click", () => {
            deleteTask(doc.id)
          })

          taskElement.append(taskElementName, taskElementStartDate, taskElementDueDate, taskElementOpenButton, taskElementDeleteButton)

          tasksTableBody.appendChild(taskElement)
        })
      })
    }
  })
}

showTasks()
addLogOutButtonAction()
showUserDisplayName()
addAddTaskButtonAction()
