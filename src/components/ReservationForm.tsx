"use client";

import { Client, Databases, ID, Query } from "appwrite";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  contact: z.string().email({ message: "Please enter a valid email address." }),
  date: z.date({ required_error: "A date is required." }),
  time: z.string({ required_error: "Please select a time." }),
  guests: z.string({ required_error: "Please select the number of guests." }),
  notes: z.string().optional(),
});

export function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", contact: "", notes: "" },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  // Appwrite
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
        "https://nyc.cloud.appwrite.io/v1"
    )
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "YOUR_PROJECT_ID"
    );

  const databases = new Databases(client);
  const DATABASE_ID =
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "YOUR_DATABASE_ID";
  const COLLECTION_ID =
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "YOUR_COLLECTION_ID";

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // react-hook-form sets isSubmitting; button is disabled, but guard anyway
    if (isSubmitting) return;

    try {
      // check duplicate slot
      const existing = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.equal("date", values.date.toISOString().split("T")[0]),
          Query.equal("time", values.time),
        ]
      );
      if (existing.total > 0) {
        alert("This time is already booked. Please choose another.");
        return;
      }

      const cancelToken = ID.unique();

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, cancelToken, {
        name: values.name,
        contact: values.contact,
        date: values.date.toISOString().split("T")[0],
        time: values.time,
        guests: parseInt(values.guests, 10),
        notes: values.notes || "",
        cancelToken,
        cancelExpires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          date: values.date.toISOString().split("T")[0],
          bookingId: Math.random().toString(36).substring(2, 10).toUpperCase(),
          cancelToken,
        }),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
      alert("Something went wrong. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <Card className="text-center p-8">
        <CardContent>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-headline mb-2">
            Reservation Confirmed!
          </h2>
          <p className="text-muted-foreground">
            Thank you for your reservation. We look forward to welcoming you at
            Blue Bird Haus. A confirmation has been sent to your contact
            details.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="mt-6">
            Make Another Reservation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            aria-busy={isSubmitting}
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pt-2.5">Date</FormLabel>
                    <DatePicker field={field} disabled={isSubmitting} />
                    <FormMessage className="pt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array(8)].map((_, i) => (
                        <SelectItem key={i + 1} value={`${i + 1}`}>
                          {i + 1} guest{i > 0 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. anniversary, dietary restrictions"
                      className="resize-none"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Let us know if you have any special requirements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </span>
              ) : (
                "Confirm Reservation"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
