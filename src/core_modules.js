import { format, formatDistanceToNowStrict, isFuture } from "date-fns";

// Core functions of To Do

// creates to do object with named properties
export const createToDo = (
	title,
	description,
	dueDate,
	dueTime,
	priority,
	checklist,
	complete = false,
) => ({ title, description, dueDate, dueTime, priority, checklist, complete });

// creates a project with a default to do for users to edit
// returns an array which we can append to dos to
export const createProject = (title, desc) => {
	const project = { title, desc, toDoItems: [] };
	return project;
};

// combines date and time inputs to a date object
export const combineDateTime = (dateInput, timeInput) => {
	const dateTime = `${dateInput} ${timeInput}`;
	return new Date(dateTime);
};

// returns a human readable date for displaying due date
export const returnHumanDate = (combinedDateTime) => {
	const date = format(combinedDateTime, "do MMM yyyy");
	const time = format(combinedDateTime, "HH:mm");
	return `${date} at ${time}`;
};

// returns a human readable duration for time to due date
export const returnHumanDuration = (combinedDateTime) => {
	const duration = formatDistanceToNowStrict(combinedDateTime);
	if (isFuture(combinedDateTime)) {
		return `Due in ${duration}`;
	}
	return `Overdue by ${duration}`;
};
