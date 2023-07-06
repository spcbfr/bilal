import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const { data } = api.posts.getAll.useQuery();
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
      <main>
        {!user.isSignedIn ? <SignInButton /> : <SignOutButton />}
        <section>
          {data?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </section>
      </main>
    </>
  );
}
