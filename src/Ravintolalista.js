import React, {useState, useEffect} from 'react';
import './App.css';


function Ravintolalista() {
  const [ravintolat,setRavintolat] = useState([]);
  useEffect(()=>{
    fetch("https://digiruokalista.com/api/v1/HaeYritykset")  
    .then(response => response.json())
    .then(data => setRavintolat(data))
    .catch((reason) => alert(reason));
  },[]);
  return (
    <div>
      <header>
        <h1>Digiruokalista React</h1>
      </header>
      <section>
        <h2 id="titteli">Ravintolat</h2>
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

export default Ravintolalista;
