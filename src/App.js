import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './Components/Layout/DefaultLayout/DefaultLayout';
import Home from './Pages/Home/Home';
import Result from './Pages/Result/Result';
import SignIn from './Pages/SignIn/SignIn';
import Watch from './Pages/Watch/Watch';

import { useDispatch, useSelector } from 'react-redux';
import { getSystemTheme } from './redux/themeSlice';
import { useEffect, useState } from 'react';

const useThemeDetector = () => {
  const getMatchMedia = () => window.matchMedia('(prefers-color-scheme: dark)');

  const [isDarkTheme, setIsDarkTheme] = useState(getMatchMedia().matches);

  const mqListener = (e) => {
    setIsDarkTheme(e.matches);
  };

  useEffect(() => {
    const mq = getMatchMedia();
    mq.addListener(mqListener);
    return () => mq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

function App() {
  const themeSystem = useThemeDetector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSystemTheme(themeSystem));
  }, [themeSystem]);

  const { theme } = useSelector((state) => state.theme);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={<DefaultLayout children={<Home type="random" />} />}
          />
          <Route
            path="/feed/trend"
            element={<DefaultLayout children={<Home type="trend" />} />}
          />
          <Route
            path="/feed/subscription"
            element={<DefaultLayout children={<Home type="sub" />} />}
          />
          <Route
            path="/watch"
            element={<DefaultLayout children={<Watch />} />}
          />
          <Route
            path="/result"
            element={<DefaultLayout children={<Result />} />}
          />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
