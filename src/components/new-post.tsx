import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { getUserInitials } from "~/utils/initials";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  content: z
    .string()
    .min(2)
    .max(400, { message: "Blobs can't exceed more than 400 characters" }),
});
export function CreatePostWizard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const { user } = useUser();
  if (!user) return <div />;
  // 1. Define your form.
  return (
    <div className="flex flex-col">
      <Avatar className="block">
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Never gonna give you up, Never gonna let you down.."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What&apos;s on your mind today?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
