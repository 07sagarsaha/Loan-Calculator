import { useState, useCallback } from 'react';

const useEmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(5);
  const [emi, setEmi] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const calculateEmi = useCallback(() => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyInterestRate = interestRate / 12 / 100;
    // Convert loan term from years to months
    const loanTermMonths = loanTerm * 12;
    
    // EMI formula: [P * R * (1+R)^N] / [(1+R)^N - 1]
    const emiValue = 
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
    
    setEmi(emiValue);
    
    // Calculate amortization schedule
    let balance = loanAmount;
    const schedule = [];
    
    for (let month = 1; month <= loanTermMonths; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        principalPayment,
        interestPayment,
        balance: balance > 0 ? balance : 0,
      });
    }
    
    setAmortizationSchedule(schedule);
    
    return emiValue;
  }, [loanAmount, interestRate, loanTerm]);

  const resetCalculator = useCallback(() => {
    setLoanAmount(100000);
    setInterestRate(8.5);
    setLoanTerm(5);
    setEmi(0);
    setAmortizationSchedule([]);
  }, []);

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    emi,
    amortizationSchedule,
    calculateEmi,
    resetCalculator,
  };
};

export default useEmiCalculator;
