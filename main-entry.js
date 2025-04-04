// Este arquivo contém o código do main.tsx diretamente
// evitando problemas de importação no ambiente Vercel
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

// Importação dinâmica para App através do proxy para evitar problemas de caminhos
const App = React.lazy(() => import('./app-proxy.js').then(module => ({ default: module.default })));

// Importar CSS através do proxy
import('./css-proxy.js').catch(err => console.error('Erro ao carregar CSS:', err));

// Função de renderização
function renderApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Elemento root não encontrado!');
    return;
  }

  // Tentar usar a API moderna, com fallback para a clássica
  try {
    const root = ReactDOMClient.createRoot(rootElement);
    root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          React.Suspense,
          { fallback: React.createElement('div', null, 'Carregando...') },
          React.createElement(App, null)
        )
      )
    );
  } catch (err) {
    console.warn('Usando ReactDOM.render como fallback:', err);
    ReactDOM.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          React.Suspense,
          { fallback: React.createElement('div', null, 'Carregando...') },
          React.createElement(App, null)
        )
      ),
      rootElement
    );
  }
}

// Iniciar a renderização
renderApp(); 