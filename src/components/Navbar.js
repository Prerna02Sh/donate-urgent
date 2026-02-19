import { Link } from "react-router-dom";
import './styles/Navbar.css';
export default function Navbar(){
    return(
        <div id="navbar">
            <ul>
                <li><Link class="options" to="/">Home</Link></li>
                <li><Link class="options"  to="/login">Login</Link></li>
             
            </ul>
        </div>
    );
}
