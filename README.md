# AirAware: Your Personal Air Quality Companion

> **Note:** This is a prototype application built for the **Firebase App Hosting & Genkit AI Competition**.

AirAware is a sleek, modern web application designed to provide users with real-time air quality information, personalized health recommendations, and an AI-powered assistant. It helps users understand their environment and make informed decisions to protect their health.

## Features

- **Real-Time AQI:** Get the current Air Quality Index (AQI) for your location or any searched city.
- **Detailed Pollutant Info:** See a breakdown of key pollutants like PM2.5, PM10, O3, NO2, and more.
- **Personalized Health Advisories:** Receive tailored advice based on the current AQI and your selected health profile (e.g., Normal, Child, Asthma).
- **Sensitivity Awareness:** Learn how current air quality can affect specific sensitivities like breathing, heart conditions, or allergies.
- **City Rankings:** Compare air quality across major Indian cities.
- **AI-Powered Assistant:** A conversational chat assistant, powered by Google's Gemini model via Genkit, answers your questions about air quality, health, and more.
- **Responsive Design:** A seamless experience on both desktop and mobile devices.

## Google Technologies Used

This project leverages a powerful suite of Google technologies to deliver a comprehensive and intelligent user experience:

*   **Firebase App Hosting:** The entire Next.js application is deployed and served globally using Firebase App Hosting, providing a secure, scalable, and fast user experience.
*   **Gemini API (via Genkit):** The "AirAware Assistant" is powered by Google's Gemini model. It provides users with conversational, context-aware answers to their questions about air quality and health.
*   **Genkit:** The integration with the Gemini API is managed using Genkit, Google's open-source framework that simplifies building robust, production-quality AI features.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **AI Backend:** [Genkit](https://firebase.google.com/docs/genkit)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/hosting)

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/airaware.git
    cd airaware
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your API key for the air quality data service.
    ```
    OPENWEATHER_API_KEY=your_waqi_api_key_here
    ```
    *Note: The app uses the [World Air Quality Index (WAQI) API](https://aqicn.org/api/). You will need to register for a free API token.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## Disclaimer

The information provided in this app is for awareness and educational purposes only and should not be considered medical advice. The data is sourced from third-party APIs and its accuracy cannot be guaranteed. Always consult a healthcare professional for any health concerns.
