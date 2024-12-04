import React from 'react';
import { Lightbulb, Brain, Calculator, TrendingUp } from 'lucide-react';
import type { ROICalculation } from '../types/calculator';

interface ExplanationSectionProps {
  results: ROICalculation;
}

export function ExplanationSection({ results }: ExplanationSectionProps) {
  const generatePersonalizedTips = (results: ROICalculation) => {
    const weeklyHoursSaved = results.monthlyTimeSaved / 4;
    const tips = [
      {
        title: "Quick Wins First",
        content: `Start by automating your top ${Math.min(5, Math.ceil(weeklyHoursSaved))} most frequent customer inquiries to see immediate impact.`
      },
      {
        title: "Strategic Timeline",
        content: `With ${results.timeToValue} months to full implementation, focus on training your team in phases while the AI learns from your existing processes.`
      },
      {
        title: "Resource Optimization",
        content: `Redirect ${weeklyHoursSaved.toFixed(1)} weekly hours into ${weeklyHoursSaved > 10 ? 'strategic planning and team development' : 'improving customer satisfaction metrics'}.`
      }
    ];

    // Add conditional tips based on savings
    if (results.annualCostSaved > 50000) {
      tips.push({
        title: "Expansion Strategy",
        content: "Your high ROI potential suggests expanding automation to sales and marketing workflows."
      });
    }

    if (results.monthlyTimeSaved > 80) {
      tips.push({
        title: "Team Development",
        content: "Consider upskilling your team in AI management and advanced customer experience strategies."
      });
    }

    if (results.productivityGain > 70) {
      tips.push({
        title: "Integration Opportunity",
        content: "Your workflow is highly suitable for automation. Consider integrating with CRM and support platforms."
      });
    }

    return tips;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-blue-500" />
          ROI Breakdown
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Current Process Analysis</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Monthly manual workload: {(results.monthlyTimeSaved / 0.57).toFixed(1)} hours</li>
              <li>Automation potential: {results.productivityGain.toFixed(1)}%</li>
              <li>Implementation timeline: {results.timeToValue} months</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Projected Benefits</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Monthly hours saved: {results.monthlyTimeSaved.toFixed(1)} hours</li>
              <li>Monthly cost reduction: ${results.monthlyCostSaved.toFixed(2)}</li>
              <li>Annual savings: ${results.annualCostSaved.toFixed(2)}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-500" />
          How We Calculate This
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <p className="text-gray-600">Our ROI calculations consider three key factors:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><span className="font-medium">Task Complexity (85%):</span> Percentage of tasks simple enough for AI handling</li>
            <li><span className="font-medium">Repetitive Tasks (75%):</span> Portion of work that follows predictable patterns</li>
            <li><span className="font-medium">Automation Success (90%):</span> AI's accuracy in handling automated tasks</li>
          </ul>
          <p className="text-gray-600 mt-2">These factors combine to determine your unique automation efficiency of {results.productivityGain.toFixed(1)}%</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
          Your Personalized Action Plan
        </h2>
        <div className="grid gap-4">
          {generatePersonalizedTips(results).map((tip, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-amber-400">
              <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
              <p className="text-gray-600">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}