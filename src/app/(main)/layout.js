import { AuthValidation } from '@/contexts/AuthContext';
import { UserContextProvider } from '@/contexts/UserContext';

export default function MainLayout({ children }) {
    return (
        <div>
            <AuthValidation>
                <UserContextProvider>{children}</UserContextProvider>
            </AuthValidation>
        </div>
    );
}
