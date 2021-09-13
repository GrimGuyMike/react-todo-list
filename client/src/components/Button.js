const Button = ({ text, color, onClick }) => {
    return (
        <button style={{ backgroundColor: color }} onClick={onClick} className='btn-add' >
            <h3 style={{ margin: '0' }}>{text}</h3>
        </button>
    );
};

export default Button;