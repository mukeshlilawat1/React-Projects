
import './App.css';
import Header from './Header';
import Recommended from './Recommended';
import Sidebar from './Sidebar';

function App() {
  return (

    <div className="app">
      {/* <h1>Hello Let's build YouTube Clone</h1> */}

      {/* Header -> <Header/> */}
      <Header />

      {/* sidebar -> <SideBar/> */}
      <div className='app_page'>
        <Sidebar />
        <Recommended />
      </div>
      {/* RecommendedVideos -> <RecommendedVideos/> */}

    </div>
  );
}

export default App;
