import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Feed from "~/components/feed";
import { CreatePostWizard } from "~/components/new-post";
import { Button } from "~/components/ui/button";
export default function Home() {
  const { isLoaded } = useUser();

  /**
   * User tends to load faster, return nothing until the user has loaded
   * Here we are using `!isLoaded` instead of `!user`
   * Because `isLoaded` would still evaluate to true even if the user wasn't logged in which is what we want
   * if we had used `!user` instead we'd get an empty page if the user is logged out
   */
  if (!isLoaded) return <div />;
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
      <main className="mt-2 flex h-screen justify-center">
        <div className="w-full max-w-2xl space-y-4">
          <CreatePostWizard />
          <div className="font-sans">
            <SignedOut>
              <SignInButton>
                <Button variant={"outline"}>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <Button variant="outline">Logout</Button>
              </SignOutButton>
            </SignedIn>
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
}
