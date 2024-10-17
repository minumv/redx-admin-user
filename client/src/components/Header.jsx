
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <div>
          <h1 className="font-bold capitalize">redx-admin-user</h1>
        </div>
        <ul className="flex gap-3">
            <Link to="/">
                <li>Home</li>
            </Link>
             
            <Link to="/signin">
                <li>Sign in</li>
            </Link>             
                 
        </ul>
      </div>
    </div>
  );
}

export default Header