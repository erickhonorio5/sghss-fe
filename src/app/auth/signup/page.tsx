import { SignUpCard } from '@/components/auth/SignUp/SignUpCard';
import { AuthLayout } from '@/components/auth/AuthLayout';

export default function SignUpPage() {
    return (
        <AuthLayout>
            <SignUpCard />
        </AuthLayout>
    );
}