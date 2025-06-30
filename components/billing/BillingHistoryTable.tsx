import React from 'react';

interface BillingHistoryTableProps {
  billingHistory: any[]; // Replace 'any' with a more specific type when available
}

const BillingHistoryTable: React.FC<BillingHistoryTableProps> = ({ billingHistory }) => {
  if (!billingHistory || billingHistory.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Billing History</h2>
        <p className="text-gray-600">No billing history found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Placeholder rows */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2024-06-01
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Monthly Subscription
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$10.00</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2024-05-01
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Monthly Subscription
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$10.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistoryTable;