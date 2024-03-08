
import './index.css';

function AppBar() {
    return (
      <div>
        <header className="app-header">
          <nav className="app-nav">
            <ul className="app-menu">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }

  export default AppBar