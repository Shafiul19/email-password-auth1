import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Registor</Link>
            <Link to='/register-rbs'>Registor RBS</Link>
            <Link to='/register-bs'>Registor BS</Link>
        </nav>
    );
};

export default Header;