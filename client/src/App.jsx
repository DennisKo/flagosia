import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="container mx-auto px-4 mt-8">
      <Outlet />
    </div>
  );
}

export default App;
