
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const userAuthOptions = [
  { id: 'none', label: 'No Login Required', description: 'The website is publicly accessible without user accounts.' },
  { id: 'email', label: 'Email & Password Login', description: 'Users can sign up and log in with an email and password.' },
  { id: 'social', label: 'Social Media Login (Google, etc.)', description: 'Allow users to log in using their existing social media accounts.' },
];

const userContentOptions = [
  { id: 'profiles', label: 'User Profiles', description: 'Users have their own customizable profile pages.' },
  { id: 'posting', label: 'User Content Posting', description: 'Users can create and publish their own content like articles or listings.' },
  { id: 'comments', label: 'Commenting System', description: 'Allow users to comment on content.' },
  { id: 'ratings', label: 'Reviews and Ratings', description: 'Users can leave reviews and ratings for products or content.' },
];

const adminFeaturesOptions = [
    { id: 'userManagement', label: 'Manage Users', description: 'Ability to view, edit, and delete user accounts.' },
    { id: 'contentManagement', label: 'Manage Content', description: 'A dashboard to create, update, and delete site content.' },
    { id: 'analytics', label: 'Site Analytics', description: 'View reports on website traffic and user engagement.' },
    { id: 'notifications', label: 'Email Notifications', description: 'Automatically send emails for events like registration or purchases.' },
];

const ecommerceOptions = [
    { id: 'none', label: 'Not an e-commerce site', description: 'The website will not be used for selling products or services directly.' },
    { id: 'digital', label: 'Sell Digital Products', description: 'Offer downloadable files, software, or other digital goods.' },
    { id: 'physical', label: 'Sell Physical Products', description: 'Manage inventory, shipping, and sales of physical items.' },
    { id: 'subscriptions', label: 'Subscription Services', description: 'Offer recurring billing for access to content or services.' },
    { id: 'cart', label: 'Shopping Cart & Checkout', description: 'A standard shopping cart and payment processing system.' },
];

const themeColorOptions = [
  { value: 'Deep Indigo', className: 'bg-indigo-600' },
  { value: 'Forest Green', className: 'bg-green-600' },
  { value: 'Royal Purple', className: 'bg-purple-600' },
  { value: 'Sunset Orange', className: 'bg-orange-500' },
  { value: 'Crimson Red', className: 'bg-red-600' },
  { value: 'Ocean Teal', className: 'bg-teal-500' },
  { value: 'Hot Pink', className: 'bg-pink-500' },
  { value: 'Sunny Yellow', className: 'bg-yellow-400' },
  { value: 'Slate Gray', className: 'bg-slate-500' },
  { value: 'Classic Black & White', className: 'bg-black border border-gray-300' },
];

const formSchema = z.object({
  websiteName: z.string().min(2, "Please enter a website name."),
  businessType: z.string().min(1, "Please select a business type."),
  userAuthentication: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one authentication option.",
  }),
  userGeneratedContent: z.array(z.string()).optional(),
  adminDashboardFeatures: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select at least one admin feature.",
  }),
  ecommerceFeatures: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Please select your e-commerce needs.",
  }),
  thirdPartyIntegrations: z.string(),
  designPreferences: z.string().min(1, "Please select a design preference."),
  themeColor: z.string().min(1, "Please select a theme color."),
  clientEmail: z.string().email("Please enter a valid email address."),
});

type DynamicFormValues = z.infer<typeof formSchema>;

export function DynamicWebsiteForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DynamicFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: "",
      businessType: "",
      userAuthentication: [],
      userGeneratedContent: [],
      adminDashboardFeatures: [],
      ecommerceFeatures: [],
      thirdPartyIntegrations: "",
      designPreferences: "",
      themeColor: "",
      clientEmail: "",
    },
  });

  const onSubmit = async (values: DynamicFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/syukrie@outlook.sg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            ...values,
            _subject: `New Dynamic Website Request: ${values.websiteName}`,
            _replyto: values.clientEmail,
        }),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        throw new Error('API submission failed');
      }

    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Client Requirements</CardTitle>
          <CardDescription>
            Fill in the details below. The information will be formatted into an email for you to send to our developers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="websiteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., InnovateSphere, Art-Verse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business or Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="E-commerce Store">E-commerce Store</SelectItem>
                          <SelectItem value="Social Network / Community Platform">Social Network / Community Platform</SelectItem>
                          <SelectItem value="SaaS (Software as a Service)">SaaS (Software as a Service)</SelectItem>
                          <SelectItem value="Booking / Reservation System">Booking / Reservation System</SelectItem>
                          <SelectItem value="Online Learning Platform">Online Learning Platform</SelectItem>
                          <SelectItem value="Content Management System (CMS)">Content Management System (CMS)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="userAuthentication"
                render={() => (
                  <FormItem>
                     <div className="flex items-center gap-2 mb-4">
                        <FormLabel>User Authentication</FormLabel>
                        <Dialog>
                            <DialogTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></DialogTrigger>
                            <DialogContent><DialogHeader><DialogTitle>Authentication Options</DialogTitle></DialogHeader><div className="overflow-y-auto"><ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">{userAuthOptions.map(i=><li key={i.id} className="text-sm text-muted-foreground"><strong className="text-foreground">{i.label}:</strong> {i.description}</li>)}</ul></div></DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userAuthOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="userAuthentication"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item.label]) : field.onChange(field.value?.filter((v) => v !== item.label))}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                        )}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userGeneratedContent"
                render={() => (
                  <FormItem>
                     <div className="flex items-center gap-2 mb-4">
                        <FormLabel>User-Generated Content</FormLabel>
                        <Dialog>
                            <DialogTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></DialogTrigger>
                            <DialogContent><DialogHeader><DialogTitle>User Content Options</DialogTitle></DialogHeader><div className="overflow-y-auto"><ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">{userContentOptions.map(i=><li key={i.id} className="text-sm text-muted-foreground"><strong className="text-foreground">{i.label}:</strong> {i.description}</li>)}</ul></div></DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {userContentOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="userGeneratedContent"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item.label]) : field.onChange(field.value?.filter((v) => v !== item.label))}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                        )}
                      />
                    ))}
                    </div>
                    <FormDescription>Select all content types users can create or interact with. (Optional)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminDashboardFeatures"
                render={() => (
                  <FormItem>
                     <div className="flex items-center gap-2 mb-4">
                        <FormLabel>Admin Dashboard Features</FormLabel>
                        <Dialog>
                            <DialogTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></DialogTrigger>
                            <DialogContent><DialogHeader><DialogTitle>Admin Feature Options</DialogTitle></DialogHeader><div className="overflow-y-auto"><ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">{adminFeaturesOptions.map(i=><li key={i.id} className="text-sm text-muted-foreground"><strong className="text-foreground">{i.label}:</strong> {i.description}</li>)}</ul></div></DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {adminFeaturesOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="adminDashboardFeatures"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item.label]) : field.onChange(field.value?.filter((v) => v !== item.label))}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                        )}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ecommerceFeatures"
                render={() => (
                  <FormItem>
                     <div className="flex items-center gap-2 mb-4">
                        <FormLabel>E-commerce Features</FormLabel>
                        <Dialog>
                            <DialogTrigger asChild><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></DialogTrigger>
                            <DialogContent><DialogHeader><DialogTitle>E-commerce Options</DialogTitle></DialogHeader><div className="overflow-y-auto"><ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">{ecommerceOptions.map(i=><li key={i.id} className="text-sm text-muted-foreground"><strong className="text-foreground">{i.label}:</strong> {i.description}</li>)}</ul></div></DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {ecommerceOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="ecommerceFeatures"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => checked ? field.onChange([...(field.value || []), item.label]) : field.onChange(field.value?.filter((v) => v !== item.label))}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                        )}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="thirdPartyIntegrations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Third-Party Integrations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Stripe for payments, Mailchimp for newsletters, Google Maps API" {...field} />
                    </FormControl>
                    <FormDescription>
                      List any external services you need to connect to. (Optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="designPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Preferences</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a design style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Modern & Sleek">Modern & Sleek</SelectItem>
                            <SelectItem value="Friendly & Playful">Friendly & Playful</SelectItem>
                            <SelectItem value="Professional & Trustworthy">Professional & Trustworthy</SelectItem>
                            <SelectItem value="Data-Rich & Utilitarian">Data-Rich & Utilitarian</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="themeColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Theme Color</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primary theme color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themeColorOptions.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              <div className="flex items-center gap-3">
                                <div className={`h-4 w-4 rounded-full ${color.className}`} />
                                <span>{color.value}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                     <FormDescription>
                      We'll use this to get in touch with you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader className="animate-spin" /> : <Send />}
                  <span className="ml-2">{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
