# Loan Calculator App

Hey there! 👋 Welcome to the Loan Calculator App, a simple yet powerful tool to calculate your loan payments, view amortization schedules, and convert amounts into different currencies using live exchange rates. Whether you're planning a loan or just curious about exchange rates, this app has got you covered. It’s built with **React**, **Material-UI**, and **Vite**, and it’s deployed live on **GitHub Pages** for you to try out!

## 🚨 Live Deployment

🚨 You can check out the app in action here: 👉 [Loan Calculator Live Demo](https://iammihirsig.github.io/loan-calculator-app/#/home)

---

## 📖 What Does This App Do?

This app is designed to help you:

- **Calculate Loan Payments**: Enter your loan amount, interest rate, and term to get your monthly EMI, total interest, and an amortization schedule.
- **Convert Currencies**: Switch between currencies (USD, EUR, INR, GBP, JPY, AUD, CAD) with live exchange rates powered by the ExchangeRate-API.
- **View Exchange Rates**: See current exchange rates for multiple currencies in a neat table, with a refresh button to get the latest rates.
- **Toggle Themes**: Switch between light and dark modes for a better viewing experience.
- **Responsive Design**: Use the app seamlessly on mobile, tablet, or desktop.

---

## 🛠️ Tech Stack

- **React**: For building the UI.
- **Material-UI (MUI)**: For beautiful, responsive components and theming.
- **React Router**: For client-side routing.
- **Axios**: For making API requests to fetch exchange rates.
- **Vite**: For a fast development and build experience.
- **GitHub Pages**: For hosting the live deployment.

---

## 🚀 Getting Started

Want to run this app locally or contribute? Here’s how to set it up:

### Prerequisites

- Node.js (v16 or higher) and npm installed on your machine.
- A free API key from ExchangeRate-API. Sign up and grab your key from the dashboard.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/iammihirsig/loan-calculator.git
   cd loan-calculator

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   ```bash
   touch .env
   ```

   Add your ExchangeRate-API key to `.env`:

   ```env
   VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
   ```

   Check `.env.example` for reference.

4. **Run the App Locally**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser to see the app running!

---

## 🎯 Features

* **Loan Calculator**: Calculate monthly EMI, total interest, and total amount with a detailed amortization schedule.
* **Currency Conversion**: Convert loan amounts into 7 currencies using live exchange rates.
* **Exchange Rates Table**: View and refresh exchange rates on the Rates page.
* **Light/Dark Mode**: Toggle between themes for better usability.
* **Responsive Design**: Works on all devices—mobile, tablet, and desktop.
* **Error Handling**: Gracefully handles invalid inputs and API errors with user-friendly messages.

---

## 🙌 Acknowledgments

* Thanks to **ExchangeRate-API** for providing the exchange rate data.
* Big shoutout to the **Material-UI** team for their awesome components.
* And of course, the **React** and **Vite** communities for making development a breeze!

---
