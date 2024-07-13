import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider } from '@arcblock/ux/lib/Theme';
// import { SessionProvider } from './libs/session';

import Profile from './pages/profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    // <ThemeProvider>
    //   <SessionProvider serviceHost={basename}>
    <Router basename={basename}>
      <App />
    </Router>
    //   </SessionProvider>
    // </ThemeProvider>
  );
}
