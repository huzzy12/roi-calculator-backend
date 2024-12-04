import { ROIInputs, ROICalculation, EfficiencyFactors } from '../types/calculator';

// Industry standard efficiency factors based on research
const EFFICIENCY_FACTORS: EfficiencyFactors = {
  taskComplexity: 0.85,      // 85% of tasks are simple enough for automation
  repetitiveTaskRatio: 0.75, // 75% of tasks are repetitive
  automationPotential: 0.90  // 90% success rate for automated responses
};

// Calculate the overall automation efficiency
export function calculateAutomationEfficiency(factors: EfficiencyFactors): number {
  return factors.taskComplexity * 
         factors.repetitiveTaskRatio * 
         factors.automationPotential;
}

export function calculateROI(inputs: ROIInputs): ROICalculation {
  // Calculate base time metrics
  const totalWeeklyHours = inputs.customerServiceHours + inputs.leadNurturingHours;
  const monthlyHours = totalWeeklyHours * 4.33; // Average weeks per month
  const annualHours = monthlyHours * 12;
  
  // Calculate automation efficiency
  const automationEfficiency = calculateAutomationEfficiency(EFFICIENCY_FACTORS);
  
  // Calculate time savings with efficiency factor
  const monthlyTimeSaved = monthlyHours * automationEfficiency;
  const annualTimeSaved = annualHours * automationEfficiency;
  
  // Calculate cost savings
  const monthlyCostSaved = monthlyTimeSaved * inputs.hourlyWage;
  const annualCostSaved = annualTimeSaved * inputs.hourlyWage;
  
  // Additional ROI metrics
  const timeToValue = 2; // Estimated months to achieve full automation benefits
  const productivityGain = automationEfficiency * 100; // Convert to percentage
  
  return {
    monthlyTimeSaved,
    annualTimeSaved,
    monthlyCostSaved,
    annualCostSaved,
    automationEfficiency,
    timeToValue,
    productivityGain
  };
}