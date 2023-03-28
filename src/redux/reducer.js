const initialState = {
    tasks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return { ...state, tasks: action.payload };

        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };

        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
            };

        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
            };

        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
            };

        default:
            return state;
    }
};

export default reducer;
