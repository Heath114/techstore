// Relative path: /src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale (e.g., 'en')
  redirect('/en');
  return null;
}