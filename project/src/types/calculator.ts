export interface ROIInputs {
  customerServiceHours: number;
  leadNurturingHours: number;
  hourlyWage: number;
}

export interface ROICalculation {
  monthlyTimeSaved: number;
  annualTimeSaved: number;
  monthlyCostSaved: number;
  annualCostSaved: number;
  automationEfficiency: number;
  timeToValue: number;
  productivityGain: number;
}

export interface EfficiencyFactors {
  taskComplexity: number;
  repetitiveTaskRatio: number;
  automationPotential: number;
}