import type { Metadata } from 'next';
import ThemeRegistry from './theme/ThemeRegistry';

export const metadata: Metadata = {
  title: 'Radiology SaaS Platform',
  description: 'A multi-tenant SaaS platform for radiology centers and hospitals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}