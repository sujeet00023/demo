'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const userRole = 'admin';
  const userPermissions: string[] = []; // Admin sees all tabs
  const employees = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'HR Executive' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Consultant' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Sales Rep' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar userRole={userRole} userPermissions={userPermissions} />
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f9f9f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>Employees</h1>
          <button
            onClick={() => alert('Add Employee clicked')}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            + Add Employee
          </button>
        </div>
        <div style={{ margin: '20px 0' }}>
          <input
            type="text"
            placeholder="Search employee by name or email"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              width: '100%',
              maxWidth: '400px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
              outline: 'none',
              transition: 'border 0.2s ease-in-out'
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <div
                key={emp.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{emp.name}</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>{emp.email}</p>
                <p style={{ fontSize: '13px', marginTop: '5px', color: '#4b5563' }}>
                  Role: <span style={{ fontWeight: '500' }}>{emp.role}</span>
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: '#6b7280' }}>No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
