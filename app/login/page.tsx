import { Metadata } from 'next';
import AuthNav from '@/components/AuthNav/AuthNav';
import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './login.module.css';

export const metadata: Metadata = {
    title: 'Вхід | Relax Map',
    description: 'Авторизація користувача у сервісі Relax Map',
};

export default function LoginPage() {
    return (
        <main className={styles.pageWrapper}>
            <div className={styles.card}>
                <AuthNav />
                <h1 className={styles.title}>Вхід</h1>
                <LoginForm />
                <footer className={styles.footer}>
                    © 2025 Relax Map
                </footer>
            </div>
        </main>
    );
}