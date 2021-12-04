import { useDispatch } from "react-redux";
import { clearErrors } from "../state/actions/errorActions";

const ErrorMessage = ({ error }) => {
    const dispatch = useDispatch();

    const capitalize = str => str[0].toUpperCase() + str.slice(1);

    return (
        <div className='error'>
            {capitalize(error.message)}
            <span className='dismiss' onClick={() => dispatch(clearErrors())}>&times;</span>
        </div>
    );
};

export default ErrorMessage;