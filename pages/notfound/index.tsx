'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4 bg-light">
      {/* ... mesmo conteúdo ... */}
      <button onClick={() => router.push('/')}>
        Go to Home
      </button>
    </div>
  );
}