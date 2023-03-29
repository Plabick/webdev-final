import {useContext} from "react";
import UserContext from "../UserContext";

function renderTaskCard(task) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user: loggedInUser} = useContext(UserContext);
    const isChecker = loggedInUser && loggedInUser.role === 'checker';
    const cardStyle = task.done ? 'list-group-item-success' : '';

    return (
        <div key={task._id} className={`card mb-3 ${cardStyle}`} style={{width: '100%', maxWidth: '500px'}}>
            <div className="card-body task-card">
                <div className="d-flex align-items-start">
                    {isChecker &&(
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={task.done}
                    />)}
                    <span
                        className={task.done ? 'done' : ''}
                    >
            {task.text}
          </span>

                </div>
                <div className="text-muted text-right" style={{fontSize: '0.8rem'}}>
                    {task.user}
                </div>
            </div>
        </div>
    );
}

export default renderTaskCard;