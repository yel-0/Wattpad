import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";

const ContactWattpadPage = () => (
  <div className="min-h-screen flex items-center justify-center py-16">
    <div className="w-full max-w-screen-xl mx-auto px-6 xl:px-0">
      <b className="text-primary">Contact Wattpad Team</b>
      <h2 className="mt-3 text-2xl text-orange-500 md:text-4xl font-black tracking-tight">
        Get in touch with us
      </h2>
      <p className="mt-4 text-base sm:text-lg">
        We'd love to hear from you! Please fill out the form or shoot us an
        email.
      </p>
      <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MailIcon />
            </div>
            <h3 className="mt-6 font-bold text-xl">Email</h3>
            <p className="my-2.5 text-muted-foreground">
              Our support team is here to assist.
            </p>
            <Link
              className="font-bold text-primary tracking-tight"
              href="mailto:support@wattpad.com"
            >
              support@wattpad.com
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MessageCircle />
            </div>
            <h3 className="mt-6 font-bold text-xl">Live chat</h3>
            <p className="my-2.5 text-muted-foreground">
              Chat with us for instant support.
            </p>
            <Link className="font-bold text-primary tracking-tight" href="#">
              Start new chat
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MapPinIcon />
            </div>
            <h3 className="mt-6 font-bold text-xl">Office</h3>
            <p className="my-2.5 text-muted-foreground">
              Visit us at our headquarters.
            </p>
            <Link
              className="font-bold text-primary tracking-tight"
              href="https://www.google.com/maps?q=wattpad+headquarters"
              target="_blank"
            >
              123 Wattpad Street, Toronto, ON <br /> Canada
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <PhoneIcon />
            </div>
            <h3 className="mt-6 font-bold text-xl">Phone</h3>
            <p className="my-2.5 text-muted-foreground">
              Available from 9am to 6pm.
            </p>
            <Link
              className="font-bold text-primary tracking-tight"
              href="tel:+1-800-555-1234"
            >
              +1 (800) 555-1234
            </Link>
          </div>
        </div>

        {/* Simplified Contact Form */}
        <Card className="shadow-none">
          <CardContent className="p-6 md:p-10">
            <form>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    placeholder="First name"
                    id="firstName"
                    className="mt-1 bg-white h-11 border border-gray-300"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    placeholder="Last name"
                    id="lastName"
                    className="mt-1 bg-white h-11 border border-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="mt-1 bg-white h-11 border border-gray-300"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here"
                    className="mt-1 bg-white border border-gray-300"
                    rows={6}
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox id="acceptTerms" />
                  <Label htmlFor="acceptTerms">
                    You agree to our{" "}
                    <Link href="#" className="underline">
                      terms and conditions
                    </Link>
                    .
                  </Label>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white"
                size="lg"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default ContactWattpadPage;
