import React, { useState } from 'react';
import { data } from './data.json';
import Revenue from './components/Revenue';
import Expenses from './components/Expenses';
import GrossProfitMargin from './components/GrossProfitMargin'
import NetProfitMargin from './components/NetProfitMargin'
import WorkingCapitalRatio from './components/WorkingCapitalRatio'
function App() {


  return (
    <main>
      <div className='container'>
        <h3>9SPOKES</h3>
        <section className='info'>
          <Revenue title='Revenue' />
          {/* <Expenses title='Expenses'/>
          <GrossProfitMargin title='Gross Profit Margin' />
          <NetProfitMargin title='NetProfitMargin'/>
          <WorkingCapitalRatio title='WorkingCapitalRatio' /> */}

        </section>
      </div>
    </main>
  );
}

export default App;
