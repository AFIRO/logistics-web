import "./globals.css";
import Navbar from "./components/NavBar";
import { Providers } from "./providers";

export const metadata = {
  title: "Delaware dashboard",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="delaware">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
