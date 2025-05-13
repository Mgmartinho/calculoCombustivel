import { useState, type FormEvent } from "react";
import "./App.css";

import logoImg from "./assets/logo.png";

interface InfoProps {
  title: string;
  gasolina: number | string;
  alcool: number | string;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();

    let calculo = alcoolInput / gasolinaInput;
    console.log(calculo);

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa Usar Alcool",
        gasolina: formatarMoedas(gasolinaInput),
        alcool: formatarMoedas(alcoolInput),
      });
    } else {
      setInfo({
        title: "Use Gasolina =X...",
        gasolina: gasolinaInput,
        alcool: alcoolInput,
      });
    }
  }

  function formatarMoedas(valor: Number){
    let valorFormatado = valor.toLocaleString("pt-br",
      {
      style: "currency",
      currency: "brl"
    })

    return valorFormatado
  }

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="Logo da calculadora de gasolina ou alcool"
        />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
            required
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,13"
            min="1"
            step="0.01"
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
            required
          />

          <input className="button" type="submit" value="Calcular" />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2>{info.title}</h2>
            <span>Alcool: R$ {info.alcool}</span>
            <span>Gasolina: R$ {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
