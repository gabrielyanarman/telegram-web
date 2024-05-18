"use client"

import { Inter } from 'next/font/google';
import '../globals.css';
import '../firebase';
import '../../middleware';
import AuthHeader from '../components/Auth/AuthHeader';
import Providers from '../redux/provider';
import { createContext, useRef, useState } from 'react';
import { ThemeProvider } from '../components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const OnChatContext = createContext(null)

export default function RootLayout({ children }) {
  const [onChat, setOnChat] = useState(false);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-[#212121]`}
      >
        <ThemeProvider>
          <div
            className={`${onChat ? 'pt-0 sm:pt-3' : 'pt-3'} flex flex-col mx-auto max-w-[100%]`}
          >
            <Providers>
              <OnChatContext.Provider value={{ onChat, setOnChat }}>
                <AuthHeader />
                {children}
              </OnChatContext.Provider>
            </Providers>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
