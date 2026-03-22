const PERFORMANCE_RATIO = 0.80;
const COST_PER_KW = 50000;
const GRID_EMISSION_FACTOR = 0.82;
const SQ_FT_PER_KW = 100;
const USABLE_ROOF_RATIO = 0.75;
const PM_SURYA_GHAR_SUBSIDY = 78000;

function calculate({ monthlyBill, roofSizeSqFt, peakSunHours, electricityRate }) {

  const monthlyConsumption = monthlyBill / electricityRate;

  const usableRoof = roofSizeSqFt * USABLE_ROOF_RATIO;
  const systemCapacityKW = usableRoof / SQ_FT_PER_KW;

  const annualGeneration = systemCapacityKW * peakSunHours * 365 * PERFORMANCE_RATIO;

  const annualSavings = annualGeneration * electricityRate;

  const installationCost = systemCapacityKW * COST_PER_KW;
  const costAfterSubsidy = Math.max(0, installationCost - PM_SURYA_GHAR_SUBSIDY);
  const paybackYears = costAfterSubsidy / annualSavings;

  const co2OffsetKg = annualGeneration * GRID_EMISSION_FACTOR;
  const treesEquivalent = Math.round(co2OffsetKg / 21);

  return {
    monthlyConsumption: monthlyConsumption.toFixed(1),
    systemCapacityKW: systemCapacityKW.toFixed(2),
    annualGeneration: Math.round(annualGeneration),
    annualSavings: Math.round(annualSavings),
    installationCost: Math.round(installationCost),
    costAfterSubsidy: Math.round(costAfterSubsidy),
    paybackYears: paybackYears.toFixed(1),
    co2OffsetKg: Math.round(co2OffsetKg),
    treesEquivalent,
    lifeTimeSavings: Math.round(annualSavings * 25 - costAfterSubsidy),
  };
}

module.exports = { calculate };