import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";
import "~/styles/globals.css";

const mainFont = Nunito({
  subsets: ["latin"],
  variable: "--font-main",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <main className={`${mainFont.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
