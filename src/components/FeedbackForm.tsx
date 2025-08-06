import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  feedback: z
    .string()
    .min(1, "Feedback is required")
    .max(1000, "Feedback is too long"),
});

export type FormData = z.infer<typeof formSchema>;

const FeedbackForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      feedback: "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState.isSubmitSuccessful, form]);

  const onSubmit = (data: FormData) => {
    const { email, feedback } = data;
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email,
          message: feedback,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What do you think of the app? What would you like to see improved?"
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            !form.formState.isValid ||
            !form.formState.isDirty
          }
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
