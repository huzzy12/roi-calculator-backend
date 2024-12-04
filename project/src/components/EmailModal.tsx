import React, { useState } from 'react';
import { Mail, X, Loader } from 'lucide-react';

interface EmailModalProps {
  onSubmit: (email: string) => void;
  onClose: () => void;
  isSubmitting?: boolean;
  error?: string | null;
  formData: {
    customerServiceHours: number;
    leadNurturingHours: number;
    hourlyWage: number;
    monthlyTimeSaved: number;
    annualCostSaved: number;
    productivityGain: number;
  };
}

export function EmailModal({ onSubmit, onClose, isSubmitting, error, formData }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    onSubmit(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Mail className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            View Your ROI Analysis
          </h2>
          <p className="text-gray-600">
            Enter your email to receive your detailed ROI analysis and unlock the results
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          data-netlify="true"
          name="roi-calculator"
          method="POST"
        >
          <input type="hidden" name="form-name" value="roi-calculator" />
          <input type="hidden" name="customerServiceHours" value={formData.customerServiceHours} />
          <input type="hidden" name="leadNurturingHours" value={formData.leadNurturingHours} />
          <input type="hidden" name="hourlyWage" value={formData.hourlyWage} />
          <input type="hidden" name="monthlyTimeSaved" value={formData.monthlyTimeSaved} />
          <input type="hidden" name="annualCostSaved" value={formData.annualCostSaved} />
          <input type="hidden" name="productivityGain" value={formData.productivityGain} />
          
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError('');
              }}
              disabled={isSubmitting}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
            {validationError && (
              <p className="text-red-500 text-sm mt-1">{validationError}</p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'View Results'
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            We'll never share your email with anyone else.
          </p>
        </form>
      </div>
    </div>
  );
}