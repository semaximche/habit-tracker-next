import './globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/contexts/AuthContext';
import MainTopbar from '@/components/MainTopbar';
import MTWSupport from '@/components/MTWsupport';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Habit-Tracker',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MTWSupport/>
                <AuthContextProvider>
                    <MainTopbar />
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    );
}
