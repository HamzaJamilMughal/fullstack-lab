import React, { useEffect, useState } from 'react';

function AssignmentsTable() {
  const [assignments, setAssignments] = useState([]);
  const [sortField, setSortField] = useState('start_date');
  const [ascending, setAscending] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:5070/api/project_assignments");
      const data = await res.json();
      setAssignments(data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 60000);
    return () => clearInterval(interval);
  }, []);

  const sortBy = (field) => {
    const sorted = [...assignments].sort((a, b) => {
      const aValue = field.split('.').reduce((o, k) => o?.[k], a);
      const bValue = field.split('.').reduce((o, k) => o?.[k], b);
      if (aValue > bValue) return ascending ? 1 : -1;
      if (aValue < bValue) return ascending ? -1 : 1;
      return 0;
    });

    setAssignments(sorted);
    setSortField(field);
    setAscending(!ascending);
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th onClick={() => sortBy('employee_id.employee_id')}>Employee ID</th>
            <th onClick={() => sortBy('employee_id.full_name')}>Employee Name</th>
            <th onClick={() => sortBy('project_code.project_name')}>Project Name</th>
            <th onClick={() => sortBy('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, index) => (
            <tr key={index}>
              <td>{a.employee_id?.employee_id}</td>
              <td>{a.employee_id?.full_name}</td>
              <td>{a.project_code?.project_name}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsTable;
