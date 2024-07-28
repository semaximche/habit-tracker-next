import { AuthValidation } from '@/contexts/AuthContext';
import MTWSupport from '@/components/MTWsupport';

export default function MainLayout({ children }) {
    return (
        <div>
            <AuthValidation>
                {children}
            </AuthValidation>
        </div>
    );
}
