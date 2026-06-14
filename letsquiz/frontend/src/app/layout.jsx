import '../index.css';
import '../App.css';

export const metadata = {
  title: 'LetsQuiz',
  description: 'A platform to quiz yourself and others.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
