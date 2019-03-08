import React from 'react';
// import logo from './logo.svg';
import './App.css';

/**
 * importing files for our homepage ui components
 */
import RouteInfo from './components/route-info/index.js';
import Map from './components/map/index.js';

/**
 * import config files 
 */
// requring google maps;


const App = (props) => {
  return (
    <div className="App">
      <h1><b>Routing with Google Map</b></h1>
      <div className={{ "width": 100 + "%" }}>
        <RouteInfo />
          <Map />
      </div>
    </div>
  )
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

export default App;
