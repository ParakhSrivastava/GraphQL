import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <FaExclamationTriangle size="5rem" className="text-danger" />
            <h1>
                404
            </h1>
            <p className="lead">
                Sorry, this page doesn't exists!
            </p>
            <Link className="btn btn-primary" to="/">
                Go Back
            </Link>
        </div>
    )
}

export default NotFound
