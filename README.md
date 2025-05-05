# Loan Calculator App

A modern, single-page web application built using React JS and Material UI that allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.

## Live Demo

[View Live Demo](https://your-deployment-url-here.com)

## Features

- Calculate loan EMI based on principal amount, interest rate, and loan term
- View detailed amortization schedule showing principal, interest, and remaining balance for each month
- Real-time currency conversion using Exchange Rate API
- Light and dark mode support
- Fully responsive design for all screen sizes
- Error handling with custom error boundary

## Technologies Used

- React (Hooks, Routing, Context API)
- Material UI for styling and responsive components
- Axios for API calls
- Exchange Rate API for real-time currency conversion

## EMI Formula Used

The EMI (Equated Monthly Installment) is calculated using the standard formula:

```
EMI = [P * R * (1+R)^N] / [(1+R)^N - 1]
```

Where:
- P = Principal loan amount
- R = Monthly interest rate (annual rate/12/100)
- N = Loan duration in months

## Installation and Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/loan-calculator.git
   ```

2. Navigate to the project directory
   ```
   cd loan-calculator
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
```

This will create a `dist` folder with the production build of the app.

## License

MIT
