import React from 'react';
import AssignmentsTable from './components/AssignmentsTable';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '1rem' }}>Project Assignments Dashboard</h1>
      <AssignmentsTable />
    </div>
  );
}

export default App;
