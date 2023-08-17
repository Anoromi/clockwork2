import "./globals.scss";
// import "sanitize.css"
// import "sanitize.css/forms.css"
// import "sanitize.css/typography.css"
import "reset-css";

import { rubik } from "../styles/fonts";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useLocale } from "next-intl";
import classNames from "classnames";
import { Provider } from "react-redux";
import { store } from "../store";
import Providers from "../providers";
import { BottomAppBar } from "./components/bottomAppBar";
import PageResizer from "./pageResizer";
import styles from "@/app/[locale]/layout.module.scss";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang="en">
      <NextIntlClientProvider locale={params.locale} messages={messages}>
        <Providers>
          <PageResizer>
            <div className={styles.mainPage}>{children}</div>
            <BottomAppBar locale={params.locale} />
          </PageResizer>
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
