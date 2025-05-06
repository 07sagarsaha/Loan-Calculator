# Loan Calculator App

A modern, single-page web application built using React JS and Material UI that allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.

## Live Demo

[View Live](https://lone-calculator-dev-sagar.netlify.app/)

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

4. Create a `.env` file in the root directory and add your Exchange Rate API key:
   ```
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
```

This will create a `dist` folder with the production build of the app.

## Project Structure

```
loan-calculator/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (gitignored)
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## Key Features Explained

### EMI Calculator
The core functionality allows users to input loan details and calculate monthly payments. The calculator handles validation and provides real-time feedback.

### Amortization Schedule
A detailed breakdown of each payment showing how much goes toward principal vs. interest, and the remaining balance after each payment.

### Currency Conversion
Users can view their EMI in different currencies using real-time exchange rates from the Exchange Rate API.

### Responsive Design
The application is fully responsive and works seamlessly on mobile, tablet, and desktop devices with an adaptive layout.

### Theme Switching
Users can toggle between light and dark modes for comfortable viewing in different environments.

### Error Handling
Comprehensive error handling with fallback UI components and informative error messages.

## Deployment

The application is deployed on Netlify. Any push to the main branch triggers an automatic deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

