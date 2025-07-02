"use client";

import { useState, useMemo } from 'react';
// Replaced shadcn/ui components with standard HTML and Tailwind CSS

const ROIEstimator = () => {
  const [monthlyAdBudget, setMonthlyAdBudget] = useState<number>(1000);
  const [cpc, setCpc] = useState<number>(2.5);
  const [conversionRate, setConversionRate] = useState<number>(5);
  const [revenuePerSale, setRevenuePerSale] = useState<number>(150);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const calculatedMetrics = useMemo(() => {
    const budget = monthlyAdBudget > 0 ? monthlyAdBudget : 0;
    const costPerClick = cpc > 0 ? cpc : 0;
    const convRate = conversionRate > 0 ? conversionRate : 0;
    const revenue = revenuePerSale > 0 ? revenuePerSale : 0;

    const numberOfClicks = costPerClick > 0 ? budget / costPerClick : 0;
    const numberOfSales = numberOfClicks * (convRate / 100);
    const costPerLead = numberOfSales > 0 ? budget / numberOfSales : 0;
    const totalRevenue = numberOfSales * revenue;
    const roas = budget > 0 ? (totalRevenue - budget) / budget : 0;

    return {
      numberOfSales: Math.floor(numberOfSales),
      costPerLead: isFinite(costPerLead) ? formatCurrency(costPerLead) : '$0.00',
      estimatedRoas: `${(roas * 100).toFixed(0)}%`,
    };
  }, [monthlyAdBudget, cpc, conversionRate, revenuePerSale]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-4 md:p-8">
      <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">ROI & Budget Estimator</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="ad-budget" className="font-semibold text-gray-700 dark:text-gray-300">Monthly Ad Budget</label>
            <input
              id="ad-budget"
              type="number"
              value={monthlyAdBudget}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonthlyAdBudget(parseFloat(e.target.value) || 0)}
              placeholder="$1,000"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cpc" className="font-semibold text-gray-700 dark:text-gray-300">Average Cost Per Click (CPC)</label>
            <input
              id="cpc"
              type="number"
              value={cpc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpc(parseFloat(e.target.value) || 0)}
              placeholder="$2.50"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="conversion-rate" className="font-semibold text-gray-700 dark:text-gray-300">Average Conversion Rate %</label>
            <input
              id="conversion-rate"
              type="number"
              value={conversionRate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConversionRate(parseFloat(e.target.value) || 0)}
              placeholder="5%"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="revenue-per-sale" className="font-semibold text-gray-700 dark:text-gray-300">Revenue Per Sale</label>
            <input
              id="revenue-per-sale"
              type="number"
              value={revenuePerSale}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRevenuePerSale(parseFloat(e.target.value) || 0)}
              placeholder="$150"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl flex flex-col justify-center rounded-xl p-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Estimated Results</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-lg font-medium text-indigo-200">Number of Sales</p>
            <p className="text-4xl font-bold">{calculatedMetrics.numberOfSales}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-indigo-200">Cost Per Lead</p>
            <p className="text-4xl font-bold">{calculatedMetrics.costPerLead}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-indigo-200">Estimated ROAS</p>
            <p className="text-4xl font-bold">{calculatedMetrics.estimatedRoas}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIEstimator;