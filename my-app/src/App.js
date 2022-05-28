import React, {useState} from 'react';
import './App.css';

function App() {
  const [ravintolat,setRavintolat] = useState([]);
  function loadData(){
    fetch("https://digiruokalista.com/api/v1/HaeYritykset")  
    .then(response => response.json())
    .then(data => setRavintolat(data));
  }
  loadData();
  return (
    <div className="App" onLoad={loadData}>
      <header>
        <h1>Digiruokalista React</h1>
      </header>
      <section>
        <h2>Ravintolat</h2>
        <div id="ravintolalista">
          <table>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kaupunki</th>
              </tr>
            </thead>
            <tbody>
              {ravintolat.map((rafla) =>
                <tr key={rafla.id}>
                  <td>{rafla.nimi}</td>
                  <td>{rafla.kaupunki}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
