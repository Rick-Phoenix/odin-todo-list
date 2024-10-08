import "./styles.css";
import * as sel from "./selectors.js";

sel.addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    test.createTask();
})

class Task {
    constructor(title, date, priority, description, [...checklist], notes) {
        this.title = title
        this.date = date
        this.priority = priority
        this.description = description
        this.checklist = [...checklist]
        this.notes = notes
    }

    
    createTask() {
    const task = createElement('div', 'task');

    const taskHeader = createElement('div', 'taskHeader');

    const title = createElement('div', 'title');
    title.textContent = this.title;

    const date = createElement('div', 'date');
    createPseudo(date, 'Date:');
    date.textContent = this.date;
    
    const priority = createElement('div', 'priority');
    createPseudo(priority, 'Priority:');
    priority.textContent = this.priority;
    
    const taskDesc = createElement('div', 'taskDesc');
    createPseudo(taskDesc, 'Description:');
    taskDesc.innerHTML = `<br>${this.description}`;

    const list = createElement('div', 'checklist');
    for (const i of this.checklist) {
        const label = createElement('label');
        label.setAttribute('for', `${i}`);
        label.textContent = `${i}`;
        const check = createElement('input');
        check.setAttribute('type', 'checkbox');
        list.append(label, check);
    };
    
    const notes = createElement('div', 'notes');
    createPseudo(notes, 'Notes:');
    notes.innerHTML = `<br>${this.notes}`;
    
    taskHeader.append(title, date, priority);
    task.append(taskHeader, taskDesc, list, notes);
    sel.board.append(task);
    };
}

const test = new Task('Do the laundry', 'Today', '3/5', 'Self-explanatory...', ['check1', 'check2', 'check3'], 'So exciting!');

function createElement(type, ...classes) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    return element;
}

function createPseudo(target, value) {
    target.style.setProperty('--pseudo', `"${value}"`);
}