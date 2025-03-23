import React, { useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const FinanceCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState(0);
  const [variableCosts, setVariableCosts] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
  const [yieldPerHectare, setYieldPerHectare] = useState(0);
  const [totalArea, setTotalArea] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);

  const totalCost = Number(fixedCosts) + Number(variableCosts);
  const totalRevenue = Number(yieldPerHectare) * Number(totalArea) * Number(pricePerUnit);
  const profitOrLoss = totalRevenue - totalCost;
  const roi = ((profitOrLoss / totalCost) * 100).toFixed(2);

  const r = interestRate / 100 / 12;
  const n = loanTenure * 12;
  const emi = loanAmount ? ((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(2) : 0;

  const costData = [
    { name: "Fixed Costs", value: fixedCosts },
    { name: "Variable Costs", value: variableCosts }
  ];

  const revenueData = [
    { name: "Revenue", value: totalRevenue },
    { name: "Total Cost", value: totalCost }
  ];

  return (
    <div className="p-8 space-y-6 bg-green-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 text-center">Agriculture Finance Calculator</h1>
      
      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">
        <Input type="number" placeholder="Fixed Costs" onChange={(e) => setFixedCosts(e.target.value)} />
        <Input type="number" placeholder="Variable Costs" onChange={(e) => setVariableCosts(e.target.value)} />
        <Input type="number" placeholder="Loan Amount" onChange={(e) => setLoanAmount(e.target.value)} />
        <Input type="number" placeholder="Interest Rate (%)" onChange={(e) => setInterestRate(e.target.value)} />
        <Input type="number" placeholder="Loan Tenure (Years)" onChange={(e) => setLoanTenure(e.target.value)} />
        <Input type="number" placeholder="Yield per Hectare" onChange={(e) => setYieldPerHectare(e.target.value)} />
        <Input type="number" placeholder="Total Area" onChange={(e) => setTotalArea(e.target.value)} />
        <Input type="number" placeholder="Price per Unit" onChange={(e) => setPricePerUnit(e.target.value)} />
      </div>
      
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-green-700">Results:</h2>
        <p className="text-gray-700">Total Cost: <span className="font-bold text-green-600">INR{totalCost}</span></p>
        <p className="text-gray-700">Total Revenue: <span className="font-bold text-green-600">INR{totalRevenue}</span></p>
        <p className="text-gray-700">Profit/Loss: <span className="font-bold text-green-600">INR{profitOrLoss}</span></p>
        <p className="text-gray-700">ROI: <span className="font-bold text-green-600">{roi}%</span></p>
        <p className="text-gray-700">EMI: <span className="font-bold text-green-600">INR{emi}</span></p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={costData} dataKey="value" nameKey="name" outerRadius={100} fill="#2D6A4F" label>
              {costData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#2D6A4F" : "#95D5B2"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#74C69D" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceCalculator;