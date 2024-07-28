import './globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/contexts/AuthContext';
import MainTopbar from '@/components/MainTopbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Habit-Tracker',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <script src="https://morethanwallet.com/appstore/index.js"/> {/* MoreThanWallet Support */}
                <AuthContextProvider>
                    <MainTopbar />
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    );
}
