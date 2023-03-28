export const ActionTypes = {
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    TOGGLE_TASK: 'TOGGLE_TASK',
};

export function addTask(task) {
    return { type: ActionTypes.ADD_TASK, payload: task };
}

export function editTask(task) {
    return { type: ActionTypes.EDIT_TASK, payload: task };
}

export function toggleTask(id) {
    return { type: ActionTypes.TOGGLE_TASK, payload: id };
}
