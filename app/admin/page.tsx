'use client';

import Link from 'next/link';
import Navbar from '../components/navbar';
import Table from '../components/table';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AddressIndia {
  state: string;
  city: string;
  address: string;
  pincode: string;
}

interface AddressAbroad {
  cityName: string;
  pincode: string;
  localAddress: string;
  landmark: string;
}

interface Address {
  country: string;
  india?: AddressIndia;
  abroad?: AddressAbroad;
}

interface CompanyContact {
  name: string;
  email: string;
  number: string;
}

interface CompanyAddress {
  country: string;
  india?: AddressIndia;
  abroad?: AddressAbroad;
}

interface CompanyDetails {
  companyName: string;
  companyPanNumber: string;
  companyGstNumber: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDomainName: string;
  companyContactPerson: CompanyContact;
  companyAddress: CompanyAddress;
}

interface Admin {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  panCardNumber?: string;
  aadharCardNumber?: string;
  address: Address;
  companyDetails: CompanyDetails;
  gstFile?: string | null;
  registrationFile?: string | null;
  permissions?: Record<string, boolean>;
  limits?: Record<string, number>;
}

const AdminPage: React.FC = () => {
  const userRole = 'admin';
  const userPermissions: string[] = [];

  const columns = [
    { header: 'Name', accessor: 'fullName' as keyof Admin },
    { header: 'Email', accessor: 'email' as keyof Admin },
    { header: 'Phone', accessor: 'phone' as keyof Admin },
    { header: 'Role', accessor: 'role' as keyof Admin },
  ];

  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedAdmins = localStorage.getItem('admins');
    if (storedAdmins) {
      setAdminData(JSON.parse(storedAdmins));
    }

    const handleStorageChange = () => {
      const updatedAdmins = localStorage.getItem('admins');
      if (updatedAdmins) {
        setAdminData(JSON.parse(updatedAdmins));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDeleteConfirmation = (admin: Admin) => {
    setAdminToDelete(admin);
    setIsConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
    setAdminToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (adminToDelete && !isDeleting) {
      setIsDeleting(true);

      try {
        const updatedAdmins = adminData.filter(admin => admin.email !== adminToDelete.email);
        localStorage.setItem('admins', JSON.stringify(updatedAdmins));
        setAdminData(updatedAdmins);
        setIsConfirmationOpen(false);
        setAdminToDelete(null);
      } catch (error) {
        console.error('Error deleting admin:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleViewAdmin = (admin: Admin) => {
    router.push(`/admin/${encodeURIComponent(admin.email)}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar userRole={userRole} userPermissions={userPermissions} />

      <div style={{ flex: 1, padding: '40px', backgroundColor: '#f9fafb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827' }}>Admin Panel</h1>

          <Link href="/admin/add" passHref>
            <button
              type="button"
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            >
              + Create Admin
            </button>
          </Link>
        </div>

        <p style={{ marginTop: '20px', color: '#6b7280' }}>
          Manage your admin team, roles and permissions here.
        </p>

        {/* Admin Table */}
        <div style={{ marginTop: '40px' }}>
          <Table
            columns={columns}
            data={adminData}
            onDelete={handleDeleteConfirmation}
            onView={handleViewAdmin}
          />
        </div>

        {/* Delete Confirmation Modal */}
        {isConfirmationOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '500px',
                maxWidth: '90%',
              }}
            >
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
                Confirm Delete
              </h2>
              <p style={{ marginBottom: '20px' }}>
                Are you sure you want to delete <b>{adminToDelete?.fullName}</b>?
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleCancelDelete}
                  style={{
                    backgroundColor: '#6b7280',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  style={{
                    backgroundColor: isDeleting ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: isDeleting ? 0.7 : 1,
                  }}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;