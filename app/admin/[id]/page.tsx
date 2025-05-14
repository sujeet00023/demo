'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import { ArrowLeft, Pencil } from 'lucide-react';

// Define types for nested structures
interface IndiaAddress {
  state: string;
  city: string;
  address: string;
  pincode: string;
}

interface AbroadAddress {
  cityName: string;
  pincode: string;
  localAddress: string;
  landmark: string;
}

interface Address {
  country: 'India' | 'Abroad';
  india?: IndiaAddress;
  abroad?: AbroadAddress;
}

interface CompanyAddress {
  country: 'India' | 'Abroad';
  india?: IndiaAddress;
  abroad?: AbroadAddress;
}

interface ContactPerson {
  name: string;
  email: string;
  number: string;
}

interface CompanyDetails {
  companyName: string;
  companyPanNumber: string;
  companyGstNumber: string;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDomainName: string;
  companyAddress: CompanyAddress;
  companyContactPerson: ContactPerson;
}

interface Admin {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  panCardNumber: string;
  aadharCardNumber: string;
  address: Address;
  companyDetails: CompanyDetails;
  gstFile: string | null;
  registrationFile: string | null;
  permissions: { [key: string]: boolean };
  limits: { [key: string]: number };
}

const AdminViewPage = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id && typeof id === 'string') {
      const decodedEmail = decodeURIComponent(id);
      const storedAdmins = localStorage.getItem('admins');
      if (storedAdmins) {
        try {
          const admins: Admin[] = JSON.parse(storedAdmins);
          const foundAdmin = admins.find(admin => admin.email === decodedEmail);
          if (foundAdmin) {
            setAdmin(foundAdmin);
          } else {
            router.push('/admin');
          }
        } catch (error) {
          console.error("Error parsing admins from localStorage:", error);
          router.push('/admin');
        }
      } else {
        router.push('/admin');
      }
    } else {
      router.push('/admin');
    }
  }, [id, router]);

  if (!admin) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar userRole="admin" userPermissions={[]} />
      <div className="flex-1 overflow-auto p-6">
        <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6 relative">
          {/* Top Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <button
              onClick={() => router.push(`/admin/edit/${encodeURIComponent(admin.email)}`)}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>

          <h1 className="text-3xl font-bold text-center text-indigo-600">Admin Details</h1>

          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Full Name:</strong> {admin.fullName}</div>
              <div><strong>Email:</strong> {admin.email}</div>
              <div><strong>Phone:</strong> {admin.phone}</div>
              <div><strong>Role:</strong> {admin.role}</div>
              <div><strong>PAN Card:</strong> {admin.panCardNumber}</div>
              <div><strong>Aadhar Card:</strong> {admin.aadharCardNumber}</div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              {admin.address?.country === 'India' ? (
                <>
                  <div><strong>State:</strong> {admin.address.india?.state}</div>
                  <div><strong>City:</strong> {admin.address.india?.city}</div>
                  <div><strong>Address:</strong> {admin.address.india?.address}</div>
                  <div><strong>Pincode:</strong> {admin.address.india?.pincode}</div>
                </>
              ) : (
                <>
                  <div><strong>City:</strong> {admin.address.abroad?.cityName}</div>
                  <div><strong>Pincode:</strong> {admin.address.abroad?.pincode}</div>
                  <div><strong>Local Address:</strong> {admin.address.abroad?.localAddress}</div>
                  <div><strong>Landmark:</strong> {admin.address.abroad?.landmark}</div>
                </>
              )}
            </div>
          </div>

          {/* Company Details */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Company Name:</strong> {admin.companyDetails.companyName}</div>
              <div><strong>Company PAN:</strong> {admin.companyDetails.companyPanNumber}</div>
              <div><strong>GST Number:</strong> {admin.companyDetails.companyGstNumber}</div>
              <div><strong>Email:</strong> {admin.companyDetails.companyEmail}</div>
              <div><strong>Phone:</strong> {admin.companyDetails.companyPhoneNumber}</div>
              <div><strong>Domain:</strong> {admin.companyDetails.companyDomainName}</div>
            </div>
          </div>

          {/* Company Address */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Company Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              {admin.companyDetails.companyAddress?.country === 'India' ? (
                <>
                  <div><strong>State:</strong> {admin.companyDetails.companyAddress.india?.state}</div>
                  <div><strong>City:</strong> {admin.companyDetails.companyAddress.india?.city}</div>
                  <div><strong>Address:</strong> {admin.companyDetails.companyAddress.india?.address}</div>
                  <div><strong>Pincode:</strong> {admin.companyDetails.companyAddress.india?.pincode}</div>
                </>
              ) : (
                <>
                  <div><strong>City:</strong> {admin.companyDetails.companyAddress.abroad?.cityName}</div>
                  <div><strong>Pincode:</strong> {admin.companyDetails.companyAddress.abroad?.pincode}</div>
                  <div><strong>Local Address:</strong> {admin.companyDetails.companyAddress.abroad?.localAddress}</div>
                  <div><strong>Landmark:</strong> {admin.companyDetails.companyAddress.abroad?.landmark}</div>
                </>
              )}
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact Person</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>Name:</strong> {admin.companyDetails.companyContactPerson.name}</div>
              <div><strong>Email:</strong> {admin.companyDetails.companyContactPerson.email}</div>
              <div><strong>Phone:</strong> {admin.companyDetails.companyContactPerson.number}</div>
            </div>
          </div>

          {/* Files */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Uploaded Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>GST File:</strong> {admin.gstFile || 'Not Uploaded'}</div>
              <div><strong>Registration File:</strong> {admin.registrationFile || 'Not Uploaded'}</div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Permissions</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {Object.entries(admin.permissions).map(([key, value]) => (
                <li key={key}>
                  {key}: <span className={value ? 'text-green-600' : 'text-red-500'}>{value ? 'Enabled' : 'Disabled'}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limits */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Usage Limits</h2>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {Object.entries(admin.limits).map(([key, value]) => (
                <li key={key}>{key}: {value}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminViewPage;
