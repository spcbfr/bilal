import { api } from "~/utils/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "./ui/skeleton";

function BlobSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-7 w-64 rounded-full"></Skeleton>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-full"></Skeleton>
        <Skeleton className="h-7 w-full"></Skeleton>
        <Skeleton className="h-7 w-[calc(100%-20%)]"></Skeleton>
      </div>
    </div>
  );
}
export default function Feed() {
  const { data, isLoading } = api.posts.getAll.useQuery();
  if (isLoading) return <BlobSkeleton />;
  return (
    <section className="mt-4 space-y-2">
      {data?.map(({ post, author }) => (
        <Card key={post.id} className="">
          <CardHeader>
            <Avatar>
              <AvatarImage src={author.profilePic} />
              <AvatarFallback>{author.username[0]}</AvatarFallback>
            </Avatar>
            <CardTitle>Blob by {author.username}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter>
            <p>{post.createdAt.toDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
