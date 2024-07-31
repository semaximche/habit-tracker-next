import './globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { DarkModeProvider } from '@/contexts/DarkModeContext'; 
import Topbar from '@/components/MainLayout/Topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Habit-Tracker',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-background-light dark:bg-background-dark`}>
                <AuthContextProvider>
                    <DarkModeProvider>
                        <Topbar />
                        {children}
                    </DarkModeProvider>
                </AuthContextProvider>
            </body>
        </html>
    );
}
