 export const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];



  // A function to render tasks in correct columns
  function renderTasks(tasks) {
    // This makes sure task containers are empty before input
    document
      .querySelectorAll(".tasks-container")
      .forEach((el) => (el.innerHTML = ""));
    // Create a task and append to the correct column
    tasks.forEach((task) => {
      const column = document.querySelector(
        `.column-div[data-status="${task.status}"] .tasks-container`
      );
      const card = document.createElement("div");
      card.className = "task-div";
      card.textContent = task.title;
      card.dataset.taskId = task.id;
      //  Add click event to open modal for editing
      card.addEventListener("click", () => openModal(task.id));
      column.appendChild(card);
    });

    // Update column headers with counts
    ["todo", "doing", "done"].forEach((status) => {
      const count = tasks.filter((t) => t.status === status).length;
      document.getElementById(
        status === "todo" ? "toDoText" : status + "Text"
      ).textContent = `${status.toUpperCase()} (${count})`;
    });
  }

  // Function to create the modal for editing tasks
  function createModal() {
    // Only create if it does not exist
    if (document.getElementById("modal-backdrop")) return;

    const backdrop = document.createElement("div");
    backdrop.id = "modal-backdrop";
    backdrop.style.cssText = `position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:none;z-index:1000;justify-content:center;align-items:center;`;

    const modal = document.createElement("div");
    modal.id = "task-modal";
    modal.style.cssText = `background:#fff;border-radius:8px;max-width:400px;width:90vw;padding:24px;box-shadow:0 10px 20px rgba(54,78,126,0.15);display:flex;flex-direction:column;gap:16px;`;

    // Modal HTML structure for editing task details
    modal.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h3>Task</h3>
      <button id="close-modal" style="background:none;border:none;font-size:1.5rem;cursor:pointer;">&times;</button>
    </div>
    <label>Title<input id="modal-title" style="width:100%;margin-top:4px;" /></label>
    <label>Description<textarea id="modal-desc" rows="3" style="width:100%;margin-top:4px;"></textarea></label>
    <label>Status
      <select id="modal-status" style="width:100%;margin-top:4px;">
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </select>
    </label>
    <button id="save-task-btn" style="background:#4CAF50;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;">
        Save
    </button>
  `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    // Close modal on click outside or on the X button
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
    document.getElementById("close-modal").onclick = closeModal;
    document.getElementById("save-task-btn").addEventListener("click",saveModal);
  }

  // Stores the id of the current task
  let currentTaskId = null;

  // A function to open the modal and popukate it with task data
  function openModal(taskId) {
    createModal();
    currentTaskId = taskId;
    const task = initialTasks.find((t) => t.id === taskId);
    // Console log
    console.log(initialTasks.find((t) => t.id === taskId));
    if (!task) return;
    // Populate modal fields with task data
    document.getElementById("modal-title").value = task.title;
    document.getElementById("modal-desc").value = task.description;
    document.getElementById("modal-status").value = task.status;
    // Show the modal
    document.getElementById("modal-backdrop").style.display = "flex";

    // Save changes on input blur or status change
    document.getElementById("modal-title").onblur = saveModal;
    document.getElementById("modal-desc").onblur = saveModal;
    document.getElementById("modal-status").onchange = saveModal;
  }

  // Function to save changges from modal back to the task list
  function saveModal() {
    if (currentTaskId === null) return;
    const task = initialTasks.find((t) => t.id === currentTaskId);
    if (!task) return;
    task.title = document.getElementById("modal-title").value;
    task.description = document.getElementById("modal-desc").value;
    task.status = document.getElementById("modal-status").value;
    renderTasks(initialTasks);
    closeModal();
  }

  // Function to close the modal
  function closeModal() {
    document.getElementById("modal-backdrop").style.display = "none";
    currentTaskId = null;
    closeModal();
  }

  // Initial rendering of tasks when page loads
  renderTasks(initialTasks);
;
