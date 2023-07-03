import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

export default function Home() {
  const user = useUser();
  return (
    <>
      <Head>
        <title>Bilal</title>
        <meta
          name="description"
          content="Bilal is a twitter clone until elon gets his shit together"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{!user.isSignedIn ? <SignInButton /> : <SignOutButton />}</main>
    </>
  );
}
