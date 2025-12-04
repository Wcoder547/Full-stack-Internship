// src/App.js
import React, { useState } from 'react';
import BookList from './components/BookList.jsx';
import AddBookForm from './components/AddBookForm.jsx';


function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [alert, setAlert] = useState(null);


  const triggerRefresh = () => setRefreshFlag(f => !f);

  const showAlert = (type, message, timeout = 3500) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), timeout);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Books Manager</h1>
      </header>

      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <main className="main">
        <section className="left">
          <AddBookForm onAdded={() => { showAlert('success', 'Book added successfully'); triggerRefresh(); }} onError={(msg) => showAlert('error', msg)} />
        </section>

        <section className="right">
          <BookList refreshFlag={refreshFlag} onError={(msg) => showAlert('error', msg)} />
        </section>
      </main>

      <footer className="footer">Frontend Integration — React + Axios</footer>
    </div>
  );
}

export default App;
