'use client';

import React, { useState, ChangeEvent, memo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import SubscriptionLimits from '../../components/SubscriptionLimits';

const allTabs = [
  'dashboard', 'clients', 'invoices', 'reports', 'employees',
  'attendance', 'payroll', 'leaves', 'settings', 'analytics',
];

const stepTitles = [
  'Admin personal details',
  'Admin company or consultancy details',
  'Admin Tab access details',
  'Subscription limits and Dates',
  'Final Confirmation',
];

const baseInputClass = "w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2";
const inputClass = `${baseInputClass} border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`;

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
  country: '' | 'India' | 'Abroad';
  india?: IndiaAddress;
  abroad?: AbroadAddress;
}

interface CompanyDetails {
  companyName: string;
  companyPanNumber: string;
  companyGstNumber: string;
  companyAddress: Address;
  companyEmail: string;
  companyPhoneNumber: string;
  companyDomainName: string;
  companyContactPerson: {
    name: string;
    number: string;
    email: string;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  password: string;
  panCardNumber: string;
  aadharCardNumber: string;
  address: Address;
  gstFile: File | null;
  registrationFile: File | null;
  companyDetails: CompanyDetails;
}

function AddAdminPageComponent() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(allTabs.map(tab => [tab, false]))
  );
  const [limits, setLimits] = useState<{ [key: string]: number }>(
    Object.fromEntries(allTabs.map(tab => [tab, 0]))
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    password: '',
    panCardNumber: '',
    aadharCardNumber: '',
    address: {
      country: '',
    },
    gstFile: null,
    registrationFile: null,
    companyDetails: {
      companyName: '',
      companyPanNumber: '',
      companyGstNumber: '',
      companyAddress: {
        country: '',
      },
      companyEmail: '',
      companyPhoneNumber: '',
      companyDomainName: '',
      companyContactPerson: {
        name: '',
        number: '',
        email: '',
      },
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;

    // Define a type for the possible values of FormData fields
    type FormDataValue =
      string |
      File |
      null |
      IndiaAddress |
      AbroadAddress |
      Address |
      CompanyDetails |
      CompanyDetails['companyContactPerson']; // Add other possible types as needed

    const updateFormData = <T extends object>(
      currentFormData: T,
      keys: string[],
      newValue: FormDataValue // Use the new type here
    ): T => {
      if (keys.length === 1) {
        return { ...currentFormData, [keys[0]]: newValue };
      }

      const key = keys[0] as keyof T;  // Assert keyof T to ensure the key exists in T
      const updatedValue = updateFormData(
        (currentFormData[key] as object) || {},  // Cast to object to satisfy recursive call
        keys.slice(1),
        newValue
      );

      return {
        ...currentFormData,
        [key]: updatedValue,
      };
    };

    if (files && files.length > 0) {
      setFormData(prev => updateFormData(prev, name.split('.'), files[0]));
    } else {
      setFormData(prev => updateFormData(prev, name.split('.'), value));
    }
  };



  const handlePermissionChange = (tab: string) => {
    setPermissions(prev => ({ ...prev, [tab]: !prev[tab] }));
  };

  const nextStep = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // You would typically send formData, permissions, and limits to your backend here
    const adminData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.designation,
      panCardNumber: formData.panCardNumber,
      aadharCardNumber: formData.aadharCardNumber,
      address: formData.address,
      companyDetails: formData.companyDetails,
      gstFile: formData.gstFile?.name || null, // Save file name or handle upload
      registrationFile: formData.registrationFile?.name || null, // Save file name or handle upload
      permissions,
      limits,
    };

    // Example: Store in localStorage (replace with API call)
    const existing = JSON.parse(localStorage.getItem('admins') || '[]');
    localStorage.setItem('admins', JSON.stringify([...existing, adminData]));

    console.log('Submitted Data:', adminData);
    alert('Admin successfully submitted!');
    router.push('/admin'); // Redirect to admin list or dashboard
  };

  return (
    <div className="flex h-screen overflow-auto bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar userRole="admin" userPermissions={[]} />
      <div className="min-h-screen p-8 flex-1">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md transition-all"
          >
            ← Back
          </button>
        </div>

        <div className="flex items-center justify-center h-full">
          <div className="max-w-4xl w-full">
            {/* Stepper */}
            <div className="flex space-x-4 mb-8">
              {stepTitles.map((title, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index <= currentStep ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                  <span className="mr-2 font-semibold">{index + 1}.</span>
                  <span className="capitalize">{title}</span>
                  {index < stepTitles.length - 1 && <span className="mx-2">→</span>}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
              {currentStep === 0 && (
                <div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                    <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
                    <InputField label="Password" name="password" value={formData.password} type="password" onChange={handleChange} />
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                    <InputField label="Role / Designation" name="designation" value={formData.designation} onChange={handleChange} />
                    <InputField label="Pan Card Number" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} />
                    <InputField label="Aadhar Card Number" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange} />

                    {/* Country Field - inline with Aadhar */}
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">Country</label>
                      <select
                        name="address.country"
                        value={formData.address?.country || ''}
                        onChange={handleChange}
                        className={`${inputClass} w-full`}
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="Abroad">Abroad</option>
                      </select>
                    </div>
                  </div>

                  {formData.address?.country === 'India' && (
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                      <InputField label="State" name="address.india.state" value={formData.address.india?.state || ''} onChange={handleChange} />
                      <InputField label="City" name="address.india.city" value={formData.address.india?.city || ''} onChange={handleChange} />
                      <InputField label="Address" name="address.india.address" value={formData.address.india?.address || ''} onChange={handleChange} />
                      <InputField label="Pincode" name="address.india.pincode" value={formData.address.india?.pincode || ''} onChange={handleChange} />
                    </div>
                  )}

                  {formData.address?.country === 'Abroad' && (
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                      <InputField label="City Name" name="address.abroad.cityName" value={formData.address.abroad?.cityName || ''} onChange={handleChange} />
                      <InputField label="Pincode" name="address.abroad.pincode" value={formData.address.abroad?.pincode || ''} onChange={handleChange} />
                      <InputField label="Local Address" name="address.abroad.localAddress" value={formData.address.abroad?.localAddress || ''} onChange={handleChange} />
                      <InputField label="Landmark" name="address.abroad.landmark" value={formData.address.abroad?.landmark || ''} onChange={handleChange} />
                    </div>
                  )}
                </div>
              )}

              {currentStep === 1 && (
                <div>
                   <div className="grid md:grid-cols-2 gap-6">
                    <InputField label="Company Name" name="companyDetails.companyName" value={formData.companyDetails?.companyName || ''} onChange={handleChange} />
                    <InputField label="Company Pan Number" name="companyDetails.companyPanNumber" value={formData.companyDetails?.companyPanNumber || ''} onChange={handleChange} />
                    <InputField label="Company GST Number" name="companyDetails.companyGstNumber" value={formData.companyDetails?.companyGstNumber || ''} onChange={handleChange} />
                    <InputField label="Company Email" name="companyDetails.companyEmail" value={formData.companyDetails?.companyEmail || ''} type="email" onChange={handleChange} />
                    <InputField label="Company Phone Number" name="companyDetails.companyPhoneNumber" value={formData.companyDetails?.companyPhoneNumber || ''} onChange={handleChange} />
                    <InputField label="Company Domain Name" name="companyDetails.companyDomainName" value={formData.companyDetails?.companyDomainName || ''} onChange={handleChange} />

                    {/* Company Address Country */}
                     <div>
                      <label className="block text-sm font-bold text-black mb-2">Company Country</label>
                      <select
                        name="companyDetails.companyAddress.country"
                        value={formData.companyDetails?.companyAddress?.country || ''}
                        onChange={handleChange}
                        className={`${inputClass} w-full`}
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="Abroad">Abroad</option>
                      </select>
                    </div>
                  </div>

                  {formData.companyDetails?.companyAddress?.country === 'India' && (
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                      <InputField label="Company State" name="companyDetails.companyAddress.india.state" value={formData.companyDetails?.companyAddress?.india?.state || ''} onChange={handleChange} />
                      <InputField label="Company City" name="companyDetails.companyAddress.india.city" value={formData.companyDetails?.companyAddress?.india?.city || ''} onChange={handleChange} />
                      <InputField label="Company Address" name="companyDetails.companyAddress.india.address" value={formData.companyDetails?.companyAddress?.india?.address || ''} onChange={handleChange} />
                      <InputField label="Company Pincode" name="companyDetails.companyAddress.india.pincode" value={formData.companyDetails?.companyAddress?.india?.pincode || ''} onChange={handleChange} />
                    </div>
                  )}

                  {formData.companyDetails?.companyAddress?.country === 'Abroad' && (
                    <div className="mt-4 grid md:grid-cols-2 gap-6">
                      <InputField label="Company City Name" name="companyDetails.companyAddress.abroad.cityName" value={formData.companyDetails?.companyAddress?.abroad?.cityName || ''} onChange={handleChange} />
                      <InputField label="Company Pincode" name="companyDetails.companyAddress.abroad.pincode" value={formData.companyDetails?.companyAddress?.abroad?.pincode || ''} onChange={handleChange} />
                      <InputField label="Company Local Address" name="companyDetails.companyAddress.abroad.localAddress" value={formData.companyDetails?.companyAddress?.abroad?.localAddress || ''} onChange={handleChange} />
                      <InputField label="Company Landmark" name="companyDetails.companyAddress.abroad.landmark" value={formData.companyDetails?.companyAddress?.abroad?.landmark || ''} onChange={handleChange} />
                    </div>
                  )}

                  {/* File Uploads */}
                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <FileInputField label="Organization GST (PDF/File)" name="gstFile" onChange={handleChange} />
                    <FileInputField label="Organization Registration (PDF/File)" name="registrationFile" onChange={handleChange} />
                  </div>

                   {/* Company Contact Person Details */}
                   <div className="mt-8">
                    <h3 className="text-lg font-semibold text-black mb-4">Company Contact Person Details</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField label="Contact Person Name" name="companyDetails.companyContactPerson.name" value={formData.companyDetails?.companyContactPerson?.name || ''} onChange={handleChange} />
                      <InputField label="Contact Person Number" name="companyDetails.companyContactPerson.number" value={formData.companyDetails?.companyContactPerson?.number || ''} onChange={handleChange} />
                      <InputField label="Contact Person Email" name="companyDetails.companyContactPerson.email" value={formData.companyDetails?.companyContactPerson?.email || ''} type="email" onChange={handleChange} />
                    </div>
                  </div>


                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(permissions).map(key => (
                    <label key={key} className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={permissions[key]}
                        onChange={() => handlePermissionChange(key)}
                        className="w-5 h-5 text-indigo-600 rounded"
                      />
                      <span className="capitalize text-black">{key}</span>
                    </label>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <SubscriptionLimits
                  allTabs={allTabs}
                  limits={limits}
                  setLimits={setLimits}
                />
              )}

              {currentStep === 4 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <h2 className="text-lg font-semibold text-black md:col-span-2 mb-4">Admin Personal Details:</h2>
                  <ConfirmationDetail label="Full Name" value={formData.fullName} />
                  <ConfirmationDetail label="Email" value={formData.email} />
                  <ConfirmationDetail label="Phone" value={formData.phone} />
                  <ConfirmationDetail label="Designation" value={formData.designation} />
                  <ConfirmationDetail label="Pan Card Number" value={formData.panCardNumber} />
                  <ConfirmationDetail label="Aadhar Card Number" value={formData.aadharCardNumber} />
                  <ConfirmationDetail label="Country" value={formData.address?.country || ''} />
                  {/* Password is not typically confirmed for security reasons */}
                  {/* <ConfirmationDetail label="Password" value="********" /> */}

                  {formData.address?.country === 'India' && (
                    <>
                      <ConfirmationDetail label="State" value={formData.address.india?.state || ''} />
                      <ConfirmationDetail label="City" value={formData.address.india?.city || ''} />
                      <ConfirmationDetail label="Address" value={formData.address.india?.address || ''} />
                      <ConfirmationDetail label="Pincode" value={formData.address.india?.pincode || ''} />
                    </>
                  )}
                  {formData.address?.country === 'Abroad' && (
                    <>
                      <ConfirmationDetail label="City Name" value={formData.address.abroad?.cityName || ''} />
                      <ConfirmationDetail label="Pincode" value={formData.address.abroad?.pincode || ''} />
                      <ConfirmationDetail label="Local Address" value={formData.address.abroad?.localAddress || ''} />
                      <ConfirmationDetail label="Landmark" value={formData.address.abroad?.landmark || ''} />
                    </>
                  )}

                  {/* Add empty div if needed to maintain grid alignment */}
                   {(formData.address?.country === 'India' && Object.keys(formData.address.india || {}).length % 2 !== 0) && <div />}
                   {(formData.address?.country === 'Abroad' && Object.keys(formData.address.abroad || {}).length % 2 !== 0) && <div />}


                  <h2 className="text-lg font-semibold text-black mt-4 md:col-span-2 mb-4">Company Details:</h2>
                  <ConfirmationDetail label="Company Name" value={formData.companyDetails.companyName} />
                  <ConfirmationDetail label="Company Pan Number" value={formData.companyDetails.companyPanNumber} />
                  <ConfirmationDetail label="Company GST Number" value={formData.companyDetails.companyGstNumber} />
                  <ConfirmationDetail label="Company Email" value={formData.companyDetails.companyEmail} />
                  <ConfirmationDetail label="Company Phone Number" value={formData.companyDetails.companyPhoneNumber} />
                  <ConfirmationDetail label="Company Domain Name" value={formData.companyDetails.companyDomainName} />
                  <ConfirmationDetail label="Company Country" value={formData.companyDetails.companyAddress?.country || ''} />

                   {/* Add empty div if needed to maintain grid alignment */}
                   {(Object.keys(formData.companyDetails).filter(key => key !== 'companyAddress' && key !== 'companyContactPerson').length % 2 !== 0) && <div />}
                  {formData.companyDetails.companyAddress?.country === 'India' && (
                    <>
                      <ConfirmationDetail label="Company State" value={formData.companyDetails.companyAddress.india?.state || ''} />
                      <ConfirmationDetail label="Company City" value={formData.companyDetails.companyAddress.india?.city || ''} />
                      <ConfirmationDetail label="Company Address" value={formData.companyDetails.companyAddress.india?.address || ''} />
                      <ConfirmationDetail label="Company Pincode" value={formData.companyDetails.companyAddress.india?.pincode || ''} />
                    </>
                  )}

                  {formData.companyDetails.companyAddress?.country === 'Abroad' && (
                    <>
                      <ConfirmationDetail label="Company City Name" value={formData.companyDetails.companyAddress.abroad?.cityName || ''} />
                      <ConfirmationDetail label="Company Pincode" value={formData.companyDetails.companyAddress.abroad?.pincode || ''} />
                      <ConfirmationDetail label="Company Local Address" value={formData.companyDetails.companyAddress.abroad?.localAddress || ''} />
                      <ConfirmationDetail label="Company Landmark" value={formData.companyDetails.companyAddress.abroad?.landmark || ''} />
                    </>
                  )}
                   {/* Add empty div if needed to maintain grid alignment for company address*/}
                   {(formData.companyDetails.companyAddress?.country === 'India' && Object.keys(formData.companyDetails.companyAddress.india || {}).length % 2 !== 0) && <div />}
                   {(formData.companyDetails.companyAddress?.country === 'Abroad' && Object.keys(formData.companyDetails.companyAddress.abroad || {}).length % 2 !== 0) && <div />}

                  <h3 className="text-md font-semibold text-black mt-4 md:col-span-2 mb-4">Company Contact Person Details</h3>
                   {/* Add empty div if needed to maintain grid alignment for company details before contact person*/}
                   {(formData.companyDetails.companyAddress?.country === '' && (Object.keys(formData.companyDetails).filter(key => key !== 'companyAddress' && key !== 'companyContactPerson').length + 1) % 2 !== 0) && <div />}


                  <ConfirmationDetail label="Contact Person Name" value={formData.companyDetails.companyContactPerson.name} />
                  <ConfirmationDetail label="Contact Person Number" value={formData.companyDetails.companyContactPerson.number} />
                  <ConfirmationDetail label="Contact Person Email" value={formData.companyDetails.companyContactPerson.email} />

                  {/* Add empty div if needed to maintain grid alignment for contact person */}
                   {(Object.keys(formData.companyDetails.companyContactPerson).length % 2 !== 0) && <div />}


                   <h3 className="text-md font-semibold text-black mt-4 md:col-span-2 mb-4">Documents and Access</h3>

                  <ConfirmationDetail label="GST File" value={formData.gstFile?.name || 'Not uploaded'} />
                  <ConfirmationDetail label="Registration File" value={formData.registrationFile?.name || 'Not uploaded'} />

                  {/* Add empty div if needed to maintain grid alignment for files */}
                  {( (formData.gstFile ? 1 : 0) + (formData.registrationFile ? 1 : 0) ) % 2 !== 0 && <div />}

                  <h3 className="text-md font-semibold text-black mt-4 md:col-span-2 mb-4">Permissions and Limits</h3>

                  {/* Display Permissions */}
                  {Object.entries(permissions).map(([key, value]) => (
                   value && <ConfirmationDetail key={key} label={`${key} Permission`} value="Enabled" />
                  ))}
                   {/* Add empty div if needed to maintain grid alignment for permissions */}
                   {(Object.values(permissions).filter(v => v).length % 2 !== 0) && <div />}

                  {/* Display Limits */}
                   {Object.entries(limits).map(([key, value]) => (
                     value > 0 && <ConfirmationDetail key={key} label={`${key} Limit`} value={value.toString()} />
                   ))}
                   {/* Add empty div if needed to maintain grid alignment for limits */}
                   {(Object.values(limits).filter(v => v > 0).length % 2 !== 0) && <div />}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className={`mt-8 flex ${currentStep === 0 ? 'justify-end' : 'justify-between'}`}>
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 shadow-md hover:scale-105 transition-transform"
                  >
                    Back
                  </button>
                )}
                {currentStep < stepTitles.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 shadow-md hover:scale-105 transition-transform"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-md hover:scale-105 transition-transform"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoized InputField component (no changes needed)
const InputField = ({ label, name, value, type = "text", onChange }: InputFieldProps) => (
  <div>
    <label className="block text-sm font-bold text-black mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={inputClass}
      placeholder={label}
    />
  </div>
);

// Memoized FileInputField component (no changes needed)
const FileInputField = ({ label, name, onChange }: FileInputFieldProps) => {
  const fileInputClass = `${baseInputClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer`;
  return (
    <div>
      <label className="block text-sm font-bold text-black mb-2">{label}</label>
      <input
        type="file"
        name={name}
        accept=".pdf,application/pdf"
        onChange={onChange}
        className={`w-full text-sm text-gray-700 border border-gray-300 rounded-lg bg-white ${fileInputClass}`}
      />
    </div>
  );
};

// Memoized ConfirmationDetail component (no changes needed)
const ConfirmationDetail = ({ label, value }: ConfirmationDetailProps) => (
  <div>
    <strong className="text-black">{label}:</strong> <span className="text-black">{value}</span>
  </div>
);

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface FileInputFieldProps {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface ConfirmationDetailProps {
  label: string;
  value: string;
}

const AddAdminPage = memo(AddAdminPageComponent);
export default AddAdminPage;