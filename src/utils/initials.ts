import { type User } from "@clerk/nextjs/dist/types/server/clerkClient";

export function getUserInitials(
  user: Pick<User, "username" | "firstName" | "lastName">
) {
  if (user.firstName) {
    const firstNameInitial = user.firstName.charAt(0);
    if (user.lastName) {
      const lastNameInitial = user.lastName.charAt(0);
      return `${firstNameInitial}${lastNameInitial}`;
    } else {
      return firstNameInitial;
    }
  } else if (user.lastName) {
    return user.lastName.charAt(0);
  } else if (user.username) {
    return user.username.charAt(0);
  } else {
    return "A";
  }
}
