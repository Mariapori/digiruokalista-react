import React, {useState, useEffect} from 'react';
import { Card, CardGroup, Alert } from 'react-bootstrap';

function Ravintolalista() {
  const [ravintolat, setRavintolat] = useState([]);
  const [ravintola, setRavintola] = useState([]);
  const [titteli, setTitteli] = useState("Ravintolat");
  const [naytaRavintola, setNaytaRavintola] = useState(false);
  const [virhe, setVirhe] = useState(null);

  useEffect(() => {
    fetch("https://digiruokalista.com/api/v1/HaeYritykset")
      .then(response => response.json())
      .then(data => setRavintolat(data))
      .catch(() => setVirhe("Ruokalistoja ei voitu hakea."));
  }, []);

  function nakkivene(rafla) {
    setTitteli(rafla.nimi);
    setRavintola(rafla.ruokalista.kategoriat);
    setNaytaRavintola(true);
  }

  function Palaa() {
    setTitteli("Ravintolat");
    setNaytaRavintola(false);
  }

  return (
    <div>
      <div className="jumbotron p-2">
        <h1 className="display-4">Digiruokalista + React</h1>
        <p className="lead">Ravintoloiden ruokalistat diginä.</p>
      </div>
      <section>
        <h2 className='p-2'>{titteli}</h2>
        {virhe && <Alert variant="danger">{virhe}</Alert>}
        {!naytaRavintola && (
          <div>
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
        )}
        {naytaRavintola && (
          <div>
            <h3 className='btn btn-primary m-2' onClick={() => Palaa()}>Palaa listaan</h3>
            <CardGroup>
              {ravintola.map((kat) =>
                <Card style={{ maxWidth: "20rem", margin: "0.5rem" }} bg="dark" text="light" key={kat.id}>
                  <Card.Body>
                    <Card.Title>{kat.nimi}</Card.Title>
                    <Card.Text>
                      {kat.ruuat.map((ruoka) =>
                        <div key={ruoka.id}>
                          <b>{ruoka.annosNumero === 0 ? "" : ruoka.annosNumero + "."} {ruoka.nimi}</b>
                          <p>{ruoka.kuvaus}</p>
                          <p>{typeof ruoka.hinta === 'number' ? ruoka.hinta.toFixed(2) : '–'}€</p>
                        </div>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </CardGroup>
          </div>
        )}
      </section>
    </div>
  );
}

export default Ravintolalista;
