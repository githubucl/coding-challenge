import React, { useEffect, useState } from 'react';
import metrics from './helpers/calculator';
import Question from './components/Question';
import './App.css'
import logo from './logo.svg'

function App() {
  //store all the information in state
  const [results, setResults] = useState(metrics);

  return (
    <main>
      <div className='container'>
        <img src={logo} />

        <section className='info'>
          {results.map((metric) => {
            return (
              <Question key={metric.id} {...metric}
              />
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
