import "./styles.css";
import * as sel from "./selectors.js";
import close from "./Icons/close.svg";
import add from "./Icons/addCheck.svg";

const today = new Date().toISOString().split('T')[0];
sel.date.setAttribute('min', today);

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        Task.loadFromLocalStorage(key)
    }
});

sel.addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = sel.form.elements['title'].value;
    const date = sel.form.elements['date'].value;
    const priority = sel.form.elements['priority'].value;
    const description = sel.form.elements['description'].value;
        if (sel.form.checkValidity()) {
            const newTask = new Task(title, date, priority, description);
            newTask.createTask();
            newTask.saveToLocalStorage();
        } else alert('Invalid form. Please fill the form with all the necessary values.');
    
})

class Task {
    constructor(title, date, priority, description) {
        this.title = title
        this.date = date
        this.priority = priority
        this.description = description
        this.checklist = []
        this.notes = [];
    }

    toJSON() {
        return {
            title: this.title,
            date: this.date,
            priority: this.priority,
            description: this.description,
            checklist: this.checklist,
            notes: this.notes,
        }
    };

    static loadFromLocalStorage(name) {
        const task = JSON.parse(localStorage.getItem(name));
        const newtask = new Task(task.title, task.date, task.priority, task.description, task.checklist, task.notes);
        newtask.createTask();
    }

    saveToLocalStorage() {
        const key = this.title;
        const value = JSON.stringify(this);
        localStorage.setItem(key, value);
    }

    createTask() {
    const task = createElement('div', 'task');

    const taskHeader = createElement('div', 'taskHeader');

    const title = createElement('div', 'title');
    title.textContent = `"${this.title}"`;

    const date = createElement('div', 'date');
    createPseudo(date, 'Date:');
    date.textContent = this.date;
    
    const priority = createElement('div', 'priority');
    createPseudo(priority, 'Priority:');
    priority.textContent = `${this.priority}/5`;
    
    const taskDesc = createElement('div', 'taskDesc');
    createPseudo(taskDesc, 'Description:');
    taskDesc.innerHTML = `<br>${this.description}`;

    const list = createElement('div', 'checklist');
    createPseudo(list, 'To-do List:');
    const addCheck = createElement('button', 'addCheck');
    addCheck.addEventListener('click', () => {
        const modal = createElement('dialog');
        const form = createElement('form');

        const label = createElement('label');
        label.textContent = 'Add a new task';
        label.setAttribute = ('for', 'add');

        const input = createElement('input');
        input.setAttribute = ('id', 'add');

        const saveBtn = createElement('button', 'save');

        form.append(label, input, saveBtn);

        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const value = input.value;
            if (value == false) {
                modal.close();
                return;
            };

            this.checklist.push(input.value);
            
            const label = createElement('label');
            label.setAttribute('for', `${value}`);
            label.textContent = `${value}`;

            const check = createElement('input');
            check.setAttribute('type', 'checkbox');

            check.addEventListener('change', () => {
                if (check.checked == true) label.style.textDecoration = 'line-through';
                else label.style.textDecoration = 'none';
            });

            const inputGroup = createElement('div', 'inputGroup');

            inputGroup.append(label, check);
            list.append(inputGroup);
            modal.close();
        });

        modal.append(form);
        list.append(modal);

        modal.showModal()
    });

    list.append(addCheck);
   
    const notes = createElement('div', 'notes');
    createPseudo(notes, 'Notes:');
    const addNote = createElement('button', 'addNote');

    addNote.addEventListener('click', () => {
        const modal = createElement('dialog');
        const form = createElement('form');

        const label = createElement('label');
        label.textContent = 'Add notes:';
        label.setAttribute = ('for', 'add');

        const saveBtn = createElement('button', 'save');
        
        const input = createElement('input');
        input.setAttribute = ('id', 'add');

        form.append(label, input, saveBtn);
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const value = input.value;

            if (value == false) {
                modal.close();
                return;
            };

            notesList.classList.remove('hidden');
            this.notes.push(value);

            const content = createElement('li', 'note');
            const contentFlex = createElement('span', 'liFlex');
            contentFlex.textContent = `${value}`;

            const removeBtn = createElement('button', 'remove');
            removeBtn.addEventListener('click', () => {
                content.remove();
                const index = this.notes.indexOf(value);
                this.notes.splice(index, 1);
                if (this.notes.length < 1 ) notesList.classList.add('hidden');
            });

            contentFlex.append(removeBtn);
            content.append(contentFlex);
            notesList.append(content);
            modal.close();
        });

        modal.append(form);
        notes.append(modal);
        modal.showModal()
    });
    
    notes.append(addNote);
    
    const removeBtn = createElement('button', 'remove');
    removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        task.remove();
        localStorage.removeItem(this.title);
    });

    const notesList = createElement('ul', 'notesList', 'hidden');
    taskHeader.append(title, date, priority, removeBtn);
    task.append(taskHeader, taskDesc, list, notes, notesList);
    sel.board.append(task);
    };

};

function createElement(type, ...classes) {
    const element = document.createElement(type);
    element.classList.add(...classes);
    return element;
}

function createPseudo(target, value) {
    target.style.setProperty('--pseudo', `"${value}"`);
}

