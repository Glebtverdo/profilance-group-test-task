import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from './components/header/header';
import News from './components/news/news';
import MainScreen from './components/main/main';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<MainScreen />}></Route>
        <Route path='/news' element={<News />}>  </Route>
        {/* <Route path='/*'></Route> */}
      </Routes>
    </div>
  );
}

export default App;
