import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminBespokeQueue } from './AdminBespokeQueue';
import { AdminCustomers } from './AdminCustomers';
import { AdminSettings } from './AdminSettings';

export const AdminRoot: React.FC = () => {
  const { adminTab } = useStore();

  const renderTabContent = () => {
    switch (adminTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'orders':
        return <AdminOrders />;
      case 'products':
        return <AdminProducts />;
      case 'bespoke':
        return <AdminBespokeQueue />;
      case 'customers':
        return <AdminCustomers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return <AdminLayout>{renderTabContent()}</AdminLayout>;
};
