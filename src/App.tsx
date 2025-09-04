import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import ContextDemo from './pages/ContextDemo'
import BasicSyncStoreDemo from './pages/BasicSyncStoreDemo'
import ShallowCompareDemo from './pages/ShallowCompareDemo'
import DeepCompareDemo from './pages/DeepCompareDemo'

function App() {
  return (
    <div className="app-container">
      <header className="top-nav">
        <h1>Build Your Own Zustand</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Context + Refs + useEffect
              </NavLink>
            </li>
            <li>
              <NavLink to="/basic-sync-store" className={({ isActive }) => isActive ? 'active' : ''}>
                Basic useSyncExternalStore
              </NavLink>
            </li>
            <li>
              <NavLink to="/shallow-compare" className={({ isActive }) => isActive ? 'active' : ''}>
                Shallow Comparison
              </NavLink>
            </li>
            <li>
              <NavLink to="/deep-compare" className={({ isActive }) => isActive ? 'active' : ''}>
                Deep Comparison
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<ContextDemo />} />
          <Route path="/basic-sync-store" element={<BasicSyncStoreDemo />} />
          <Route path="/shallow-compare" element={<ShallowCompareDemo />} />
          <Route path="/deep-compare" element={<DeepCompareDemo />} />
        </Routes>
      </main>
    </div>
  )
}

export default App