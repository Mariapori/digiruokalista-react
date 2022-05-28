import React, {useState, useEffect} from 'react';
import { Card, CardGroup } from 'react-bootstrap';
function Ravintolalista() {
  
  const [ravintolat,setRavintolat] = useState([]);
  const [ravintola,setRavintola] = useState([]);
  useEffect(()=>{
    fetch("https://digiruokalista.com/api/v1/HaeYritykset")  
    .then(response => response.json())
    .then(data => setRavintolat(data))
    .catch(() => alert("Ruokalistoja ei voitu hakea."));
    document.getElementById("ravintola").style = "display: none;";
  },[]);

  function nakkivene(rafla){
    document.getElementById("titteli").textContent = rafla.nimi;
    document.getElementById("ravintolalista").style = "display: none;";
    setRavintola(rafla.ruokalista.kategoriat);
    document.getElementById("ravintola").style = "display: block;";
  }
  function Palaa(){
    document.getElementById("titteli").textContent = "Ravintolat";
    document.getElementById("ravintola").style = "display: none;"
    document.getElementById("ravintolalista").style = "display: block;";
  }
  return (
    <div>
    <div class="jumbotron">
      <h1 class="display-4">Digiruokalista + React</h1>
      <p class="lead">Ravintoloiden ruokalistat diginä.</p>
    </div>
      <section>
        <h2 id="titteli">Ravintolat</h2>
        <div id="ravintolalista">
          <table className='table table-dark'>
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Kaupunki</th>
              </tr>
            </thead>
            <tbody>
              {ravintolat.map((rafla) =>
                <tr key={rafla.id} onClick={() => nakkivene(rafla)}>
                  <td>{rafla.nimi}</td>
                  <td>{rafla.kaupunki}</td> 
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div id="ravintola">
          <h3 className='btn btn-primary' onClick={() => Palaa()}>Palaa listaan</h3>
          <CardGroup>
          {ravintola.map((kat)=>
          <Card style={{ width: "18rem", margin: "0.5rem"}} bg="dark" text="light" key={kat.id}>
            <Card.Body>
            <Card.Title>{kat.nimi}</Card.Title>
            <Card.Text>
            {kat.ruuat.map((ruoka) =>
            <div> 
            <p>{ruoka.annosNumero === 0 ? "" : ruoka.annosNumero + "."} {ruoka.nimi}</p>
            <p>{ruoka.kuvaus}</p>
            <p>{ruoka.hinta.toFixed(2)}€</p>
            <hr></hr>
            </div>
            )}
            </Card.Text>
            </Card.Body>
          </Card>
          )}  
          </CardGroup>
        </div>
      </section>
    </div>
  );
}

export default Ravintolalista;
