import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import ContextDemo from "./pages/ContextDemo/ContextDemo";
import { BasicSyncStoreDemo } from "./pages/SyncStoreDemo";

function App() {
  return (
    <div className="app-container">
      <header className="top-nav">
        <h1>Build Your Own Zustand</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Context + Refs + useEffect
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/basic-sync-store"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Basic useSyncExternalStore
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<ContextDemo />} />
          <Route path="/basic-sync-store" element={<BasicSyncStoreDemo />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
