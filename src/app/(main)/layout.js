import { AuthValidation } from '@/contexts/AuthContext';

export default function MainLayout({ children }) {
    return (
        <div>
            <AuthValidation>
                {children}
            </AuthValidation>
        </div>
    );
}
