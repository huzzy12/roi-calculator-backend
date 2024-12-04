import * as React from 'react';
import { useState, useEffect } from 'react';
import { Bot, Clock, DollarSign } from 'lucide-react';
import { InputField } from './InputField';
import { ROIChart } from './ROIChart';
import { ExplanationSection } from './ExplanationSection';
import { EmailModal } from './EmailModal';
import { calculateROI } from '../utils/calculatorUtils';
import type { ROIInputs, ROICalculation } from '../types/calculator';

export function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    customerServiceHours: 0,
    leadNurturingHours: 0,
    hourlyWage: 0,
  });
  const [results, setResults] = useState<ROICalculation | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    const newResults = calculateROI(inputs);
    setResults(newResults);
    if (inputs.customerServiceHours || inputs.leadNurturingHours) {
      setShowEmailModal(true);
    }
  };

  const handleEmailSubmit = async (email: string) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const submission = {
        email,
        inputs,
        results
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save submission');
      }

      setShowEmailModal(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to save your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Chatbot ROI Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Discover how much time and money you could save by automating your customer service
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Time Investment
            </h2>
            <InputField
              label="Weekly Customer Service Hours"
              value={inputs.customerServiceHours}
              onChange={(value) => handleInputChange('customerServiceHours', value)}
              placeholder="Enter hours per week"
            />
            <InputField
              label="Weekly Lead Nurturing Hours"
              value={inputs.leadNurturingHours}
              onChange={(value) => handleInputChange('leadNurturingHours', value)}
              placeholder="Enter hours per week"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Cost Analysis
            </h2>
            <InputField
              label="Average Hourly Wage"
              value={inputs.hourlyWage}
              onChange={(value) => handleInputChange('hourlyWage', value)}
              placeholder="Enter hourly wage"
            />
            <button
              onClick={handleCalculate}
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Bot className="w-5 h-5 mr-2" />
              Calculate ROI
            </button>
          </div>
        </div>
      </div>

      {showResults && results && (
        <>
          <ROIChart
            monthlySavings={results.monthlyCostSaved}
            annualSavings={results.annualCostSaved}
          />
          <ExplanationSection results={results} />
        </>
      )}

      {showEmailModal && results && (
        <EmailModal
          onSubmit={handleEmailSubmit}
          onClose={() => setShowEmailModal(false)}
          isSubmitting={isSubmitting}
          error={error}
          formData={{
            ...inputs,
            monthlyTimeSaved: results.monthlyTimeSaved,
            annualCostSaved: results.annualCostSaved,
            productivityGain: results.productivityGain
          }}
        />
      )}
    </div>
  );
}