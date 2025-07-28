import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
    <Link href="/" className="flex items-center">
        <Image
            src="/images/logo/logo-light.svg"
            alt="Logo"
            width={120}
            height={30}
            className="dark:hidden"
            priority
        />
        <Image
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            width={120}
            height={30}
            className="hidden dark:block"
            priority
        />
    </Link>
);