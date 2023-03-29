import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const renderTaskCard = (task) => (
    <div key={task._id} className="card mb-3" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body task-card">
            <div className="d-flex align-items-start">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={task.done}
                />
                <span
                    className={task.done ? 'done' : ''}
                >
            {task.text}
          </span>

            </div>
            <div className="text-muted text-right" style={{ fontSize: '0.8rem' }}>
                    {task.user}
            </div>
        </div>
    </div>
);

export default renderTaskCard;