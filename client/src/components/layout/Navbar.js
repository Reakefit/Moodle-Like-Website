import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar-fixed'>
            <nav className='z-depth-0'>
                <div className='nav-wrapper'>
                    <Link
                        to='/'
                        style={{
                            fontFamily: 'monospace'
                        }}
                        className='col s5 brand-logo center black-text'>
                        <i className='material-icons' style={{ fontSize: 30 }}>school</i>
                        BLACKBOARD
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;