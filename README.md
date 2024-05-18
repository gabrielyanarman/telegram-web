# Telegram Web Clone

A web-based clone of the popular messaging app Telegram, built with modern web technologies. This project demonstrates the use of Next.js for the frontend, Firebase for backend services, Tailwind CSS for styling, and react-hook-form for form handling. The application is deployed on Vercel.

## Demo

Check out the live demo of the Telegram Web Clone [here](https://telegram-web-tan.vercel.app/).

## Features

- User Authentication: Sign up and log in with Firebase Authentication.
- Real-time Messaging: Send and receive messages in real-time using Firebase Firestore.
- Responsive Design: Fully responsive design using Tailwind CSS.
- Form Handling: Efficient form handling and validation with react-hook-form.
- Deployment: Deployed on Vercel for fast and reliable hosting.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered applications and static websites.
- [Firebase](https://firebase.google.com/): A comprehensive app development platform that provides backend services such as authentication and Firestore for real-time databases.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.
- [react-hook-form](https://react-hook-form.com/): A performant, flexible, and extensible form library for React.
- [Vercel](https://vercel.com/): A platform for frontend developers, providing hosting and serverless functions.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn

### Installation

1. Clone the repository:

shell
bash
   git clone https://github.com/gabrielyanarman/telegram-web
   cd telegram-web-clone
2. Install dependencies:
   shell
bash
   npm install
   # or
   yarn install
3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable Authentication (Email/Password).
   - Create a Firestore database.
   - Get your Firebase configuration object from the project settings.

4. Create a .env.local file in the root of your project and add your Firebase configuration:
   
env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
5. Run the development server:
   shell
bash
   npm run dev
   # or
   yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- /components: React components used throughout the project.
- /pages: Next.js pages.
- /styles: Global and component-specific styles using Tailwind CSS.
- /lib: Firebase configuration and initialization.
- /hooks: Custom React hooks, including form handling with react-hook-form.
- /utils: Utility functions.

## Deployment

This project is deployed using Vercel. For deploying your own version, follow these steps:

1. Connect your repository to Vercel.
2. Add your environment variables in the Vercel dashboard.
3. Deploy your application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [armangabrielyan08@gmail.com](mailto:armangabrielyan08@gmail.com).
