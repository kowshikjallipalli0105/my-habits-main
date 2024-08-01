document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-habits")
  const nlwSetup = new NLWSetup(form)
  const button = document.querySelector(
    "header button:not(#theme-toggle-btn, #add-task-btn, #username, #logout-btn)"
  )
  const addTaskBtn = document.getElementById("add-task-btn")
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const logoutBtn = document.getElementById("logout-btn")
  const usernameDisplay = document.getElementById("username-display")

  // Load theme from localStorage or set to dark by default
  const currentTheme = localStorage.getItem("theme") || "dark"
  document.documentElement.setAttribute("data-theme", currentTheme)

  themeToggleBtn.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark"
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  })

  button.addEventListener("click", add)
  form.addEventListener("change", save)

  function add() {
    const today = new Date().toLocaleDateString("pt-br").slice(0, -5)
    const dayExists = nlwSetup.dayExists(today)

    if (dayExists) {
      alert("Already created!")
      return
    }

    // Add the new day and its checkboxes
    nlwSetup.addDay(today)
  }

  function save() {
    localStorage.setItem("Habits", JSON.stringify(nlwSetup.data))
  }

  addTaskBtn.addEventListener("click", () => {
    const newHabitName = prompt("Enter the name of the new habit:")
    if (newHabitName) {
      const newHabitNameFormatted = newHabitName
        .toLowerCase()
        .replace(/ /g, "-")

      // Replace this with the correct icon path or dynamic icon selection logic
      const fixedIcon = "cover.jpg"

      const newHabitDiv = document.createElement("div")
      newHabitDiv.classList.add("habit")
      newHabitDiv.setAttribute("data-name", newHabitNameFormatted)
      newHabitDiv.innerHTML = `<img src="./assets/${fixedIcon}" alt="${newHabitName}" title="${newHabitName}">`

      const habitsContainer = document.querySelector(".habits")
      habitsContainer.appendChild(newHabitDiv)

      addCheckboxesForNewHabit(newHabitNameFormatted)
    }
  })

  function addCheckboxesForNewHabit(habitName) {
    const days = document.querySelectorAll(".days .day")
    days.forEach((day) => {
      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.id = `${habitName}-completion-${day.dataset.date}`
      checkbox.name = `${habitName}-completion-${day.dataset.date}`
      day.appendChild(checkbox)
    })
  }

  // Display username
  const username = localStorage.getItem("username") || "User@gmail.com"
  if (usernameDisplay) {
    usernameDisplay.textContent = username
  } else {
    console.error("Username display element not found.")
  }

  // Logout button logic
  logoutBtn.addEventListener("click", () => {
    // Clear user data (if any) and redirect to login page
    localStorage.removeItem("username")
    window.location.href = "login.html"
  })

  const data = JSON.parse(localStorage.getItem("Habits")) || {}
  nlwSetup.setData(data)
  nlwSetup.load()
})
document.addEventListener('DOMContentLoaded', function() {
      const usernameDisplay = document.getElementById('username-display');
      const username = localStorage.getItem('username');

      if (username) {
        usernameDisplay.textContent = username;
      }

      document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
      });

      document.getElementById('add-task-btn').addEventListener('click', function() {
        document.getElementById('add-task-form').classList.toggle('hidden');
      });

      document.getElementById('add-task-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const taskName = document.getElementById('task-name').value;
        const taskFrequency = document.getElementById('task-frequency').value;

        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskName} - ${taskFrequency}`;
        taskList.appendChild(taskItem);

        document.getElementById('add-task-form').reset();
        document.getElementById('add-task-form').classList.add('hidden');
      });
    });
addTaskBtn.addEventListener("click", () => {
  const newHabitName = prompt("Enter the name of the new habit:")
  if (newHabitName) {
    const newHabitNameFormatted = newHabitName.toLowerCase().replace(/ /g, "-")

    // Replace this with the correct icon path or dynamic icon selection logic
    const fixedIcon = "cover.jpg"

    const newHabitDiv = document.createElement("div")
    newHabitDiv.classList.add("habit")
    newHabitDiv.setAttribute("data-name", newHabitNameFormatted)
    newHabitDiv.innerHTML = `
      <img src="./assets/${fixedIcon}" alt="${newHabitName}" title="${newHabitName}">
      <span class="habit-name">${newHabitName}</span>
    `

    const habitsContainer = document.querySelector(".habits")
    habitsContainer.appendChild(newHabitDiv)

    addCheckboxesForNewHabit(newHabitNameFormatted)
  }
})
