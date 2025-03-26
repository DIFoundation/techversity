"use client";
import { useCurrency } from "@/contexts/currency-context";

export default function CurrencySelector() {
  const { selectedCurrency, setSelectedCurrency, currencies } = useCurrency();

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
      className="bg-transparent text-sm font-medium text-gray-700 border border-gray-300 rounded-md py-1 px-2 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {Object.entries(currencies).map(([code, { name }]) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))}
    </select>
  );
}
