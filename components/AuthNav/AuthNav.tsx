'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AuthNav.module.css';

export default function AuthNav() {
    const pathname = usePathname();

    return (
        <div className={styles.navContainer}>
            <Link
                href="/register"
                className={`${styles.tab} ${pathname === '/register' ? styles.active : ''}`}
            >
                Реєстрація
            </Link>
            <Link
                href="/login"
                className={`${styles.tab} ${pathname === '/login' ? styles.active : ''}`}
            >
                Вхід
            </Link>
        </div>
    );
}