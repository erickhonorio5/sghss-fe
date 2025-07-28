import { AuthLayout } from '@/components/auth/AuthLayout';
import {SignInCard} from "@/components/auth/SignIn/SignInCard";

export default function SignUpPage() {
    return (
        <AuthLayout>
            <SignInCard />
        </AuthLayout>
    );
}