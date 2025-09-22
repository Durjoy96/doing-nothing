import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Do Nothing",
    template: "%s | Do Nothing",
  },
  description: "The hardest game you’ll ever play… by doing nothing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="forest">
      <body
        className={`${inter.variable} ${fredoka.variable} antialiased min-h-screen`}
      >
        <Provider>
          <NextTopLoader
            color="#ffb800"
            showSpinner={false}
            initialPosition={0.5}
          />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                zIndex: 999999,
              },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
