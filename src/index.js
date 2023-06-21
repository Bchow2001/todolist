// Core functions of To Do

// Creates to do object with named properties
const createToDo = (
	title,
	description,
	dueDate,
	priority,
	notes,
	checklist,
	complete = false,
) => ({ title, description, dueDate, priority, notes, checklist, complete });

// Creates a project with a default to do for users to edit
// Returns an array which we can append to dos to
const createProject = () => {
	const placeHolderToDo = createToDo(
		"Create Your First To Do Now!",
		"Include your description...",
		"Set the due date...",
		1,
		"Add additional notes...",
		{},
	);
	return [placeHolderToDo];
};

// Sets completeness of to do item
const setComplete = (toDoItem) => {
	// eslint-disable-next-line no-param-reassign
	toDoItem.complete = !toDoItem.complete;
};

// Sets priority of to do item
const setPriority = (toDoItem, newPriority) => {
	toDoItem.priority = newPriority;
};

const setChecklist = (toDoItem, checklistItem) => {
	if (toDoItem.checklist[checklistItem] !== undefined) {
		toDoItem.checklist[checklistItem] = toDoItem.checklist[checklistItem]
			? 0
			: 1;
	}
};

const addChecklistItem = (toDoItem, checklistItem) => {
	if (toDoItem.checklist[checklistItem] === undefined) {
		toDoItem.checklist[checklistItem] = 0;
	} else {
		return `${checklistItem} already exists`;
	}
};

const defaultProject = createProject();

console.log(defaultProject);
