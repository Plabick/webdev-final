import axios from 'axios';

const apiUrl = 'http://localhost:5002/tasks';

export const fetchTasks = () => async dispatch => {
    const { data } = await axios.get(apiUrl);
    dispatch({ type: 'FETCH_TASKS', payload: data });
};

export const addTask = task => async dispatch => {
    const { data } = await axios.post(`${apiUrl}/add`, task);
    dispatch({ type: 'ADD_TASK', payload: { ...task, _id: data._id } }); // Spread the task object and add the _id from the response
};

export const toggleTask = id => async dispatch => {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    data.done = !data.done;
    await axios.post(`${apiUrl}/update/${id}`, data);
    dispatch({ type: 'TOGGLE_TASK', payload: data });
};

export const editTask = task => async dispatch => {
    await axios.post(`${apiUrl}/update/${task._id}`, task);
    dispatch({ type: 'EDIT_TASK', payload: task });
};

export const deleteTask = id => async dispatch => {
    await axios.delete(`${apiUrl}/${id}`);
    dispatch({ type: 'DELETE_TASK', payload: id });
};
