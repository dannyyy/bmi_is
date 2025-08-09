export interface BMIData {
  weight: number
  height: number
  bmi: number
  targetVariable: 'weight' | 'height' | 'bmi'
}

export interface BMICategory {
  name: string
  color: string
  bgColor: string
  range: string
}

export const useBMI = () => {
  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  const calculateWeight = (bmi: number, height: number): number => {
    const heightInMeters = height / 100
    return bmi * (heightInMeters * heightInMeters)
  }

  const calculateHeight = (bmi: number, weight: number): number => {
    return Math.sqrt(weight / bmi) * 100
  }

  const getBMICategory = (bmi: number): BMICategory => {
    if (bmi < 18.5) {
      return {
        name: 'Underweight',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        range: '< 18.5'
      }
    } else if (bmi < 25) {
      return {
        name: 'Normal weight',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        range: '18.5 - 24.9'
      }
    } else if (bmi < 30) {
      return {
        name: 'Overweight',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        range: '25.0 - 29.9'
      }
    } else {
      return {
        name: 'Obese',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        range: '≥ 30.0'
      }
    }
  }

  const getHealthyWeightRange = (height: number): { min: number; max: number } => {
    const heightInMeters = height / 100
    const minWeight = 18.5 * (heightInMeters * heightInMeters)
    const maxWeight = 24.9 * (heightInMeters * heightInMeters)
    return { min: minWeight, max: maxWeight }
  }

  return {
    calculateBMI,
    calculateWeight,
    calculateHeight,
    getBMICategory,
    getHealthyWeightRange
  }
}