import { ActionTypes } from './actions';

const initialState = {
    tasks: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };

        case ActionTypes.EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };

        case ActionTypes.TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload ? { ...task, done: !task.done } : task
                ),
            };

        default:
            return state;
    }
}
