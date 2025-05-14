'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  User,
  ClipboardList,
  Database,
  Users,
  Bell,
  FileText,
  Building2,
  Phone,
  LayoutList,
  BadgeDollarSign,
  Gift,
  Briefcase,
  DollarSign,
  CreditCard,
  CheckCircle,
  PenLine,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../utils/methods';

const navItems = [
  { label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
  { label: 'Profile', icon: User, path: '/admin/profile' },
  { label: 'Admin', icon: ShieldCheck, path: '/admin' },
  { label: 'Tasks Managements', icon: ClipboardList, path: '/admin/tasks' },
  { label: 'Database Managements', icon: Database, path: '/admin/database' },
  { label: 'Ground Lead Management', icon: Users, path: '/admin/ground-leads' },
  { label: 'Remainder Management', icon: Bell, path: '/admin/remainders' },
  { label: 'Employees', icon: Users, path: '/employee' },
  { label: 'Clients', icon: User, path: '/admin/clients' },
  { label: 'User & Admission Enquiry', icon: Phone, path: '/admin/admission-enquiry' },
  { label: 'Colleges', icon: Building2, path: '/admin/colleges' },
  { label: 'Enquiry', icon: Phone, path: '/admin/enquiry' },
  { label: 'Invoices', icon: FileText, path: '/admin/invoices' },
  { label: 'Document Format', icon: LayoutList, path: '/admin/documents' },
  { label: 'Salary Slip', icon: BadgeDollarSign, path: '/admin/salary-slip' },
  { label: 'Offers', icon: Gift, path: '/admin/offers' },
  { label: 'Jobs', icon: Briefcase, path: '/admin/jobs' },
  { label: 'Forex', icon: DollarSign, path: '/admin/forex' },
  { label: 'Loan', icon: CreditCard, path: '/admin/loan' },
  { label: 'Paid', icon: CheckCircle, path: '/admin/paid' },
  { label: 'Blogs', icon: PenLine, path: '/admin/blogs' },
  { label: 'Leave', icon: Bell, path: '/admin/leave' },

];

type NavbarProps = {
  userRole: 'admin' | 'employee';
  userPermissions: string[]; // paths assigned to this user (only used if employee)
};

function Navbar({ userRole, userPermissions }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const visibleItems =
    userRole === 'admin'
      ? navItems
      : navItems.filter(item => userPermissions.includes(item.path));

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r flex flex-col p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>

      <nav className="space-y-1 flex-1">
        {visibleItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={label}
            href={path}
            className={cn(
              'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100',
              pathname === path ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-700'
            )}
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </button>
    </aside>
  );
}

export default Navbar;
