import { createTRPCRouter, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { getUserInitials } from "~/utils/initials";

/**
 * @description the clerk `User` Object returns a lot of data that we don't need
 * this function filters out all the unnecessery data
 */
function filterUserData(user: User) {
  return {
    username: user.username,
    profilePic: user.profileImageUrl,
    id: user.id,
    initials: getUserInitials(user),
  };
}

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });
    /**
     * @description retrieves all the user data
     * from users who have created posts.
     *
     * This is done by passing an array of IDs
     * from the database to the `getUserList` clerk function
     * @see https://clerk.com/docs/nextjs/user-object
     */

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
      })
    ).map(filterUserData);

    /**
     * @description `joinedUsersAndPosts` maps through all of the posts
     * and joins the corresponding author to each post
     */

    const joinedUsersAndPosts = posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author || !author.username)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No Author was Found",
        });
      return {
        post,
        author: {
          ...author,
          username: author.username,
        },
      };
    });
    return joinedUsersAndPosts;
  }),
});
