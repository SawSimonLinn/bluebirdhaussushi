import { ReservationForm } from "@/components/ReservationForm";

export default function ReservationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Book a Table</h1>
        <p className="text-lg text-muted-foreground mt-2">Reserve your spot for an unforgettable dining experience.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <ReservationForm />
      </div>
    </div>
  );
}
