import React from 'react';
import ProductComponent from './pages/Product';
import logo from './assets/stackline_logo.svg';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f0f8ff', textAlign: 'center' }}>
      <header className="App-header" style={{ backgroundColor: '#282c34', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '0 0 100px' }}>
          <img src={logo} className="App-logo" alt="logo" style={{ width: '100%', height: 'auto' }} />
        </div>
      </header>
      <div className="product-container" style={{ marginTop: '20px' }}>
        <ProductComponent />
      </div>
    </div>
  );
}

export default App;
