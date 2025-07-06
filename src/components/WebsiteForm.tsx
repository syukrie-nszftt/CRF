
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

const requiredFeaturesOptions = [
  { id: 'contactForm', label: 'Contact Form', description: 'A form for visitors to send you messages directly from the website.' },
  { id: 'photoGallery', label: 'Photo Gallery', description: 'A dedicated section to showcase a collection of images.' },
  { id: 'blog', label: 'Blog Section', description: 'A series of articles, news, or updates, displayed in reverse chronological order.' },
  { id: 'testimonials', label: 'Customer Testimonials', description: 'Showcase quotes from satisfied customers to build trust.' },
  { id: 'downloads', label: 'Downloadable Files', description: 'Allow visitors to download files like PDFs, documents, or guides.' },
  { id: 'map', label: 'Embedded Map', description: 'Display a map (e.g., Google Maps) showing your location.' },
  { id: 'social', label: 'Social Media Links', description: 'Links to your social media profiles (e.g., Facebook, Twitter, Instagram).' },
];

const contentSectionsOptions = [
    { id: 'home', label: 'Home', description: 'The main landing page of your website.' },
    { id: 'about', label: 'About Us', description: 'A page to describe your business, team, or history.' },
    { id: 'services', label: 'Services', description: 'A page detailing the services you offer.' },
    { id: 'products', label: 'Products', description: 'A page to display the products you sell.' },
    { id: 'portfolio', label: 'Portfolio', description: 'A showcase of your past work or projects.' },
    { id: 'blog', label: 'Blog', description: 'A section for articles, news, or updates.' },
    { id: 'testimonials', label: 'Testimonials', description: 'A dedicated page for customer reviews and feedback.' },
    { id: 'contact', label: 'Contact Us', description: 'A page with your contact information and a contact form.' },
    { id: 'faq', label: 'FAQ', description: 'A list of frequently asked questions and their answers.' },
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
  targetAudience: z.string().min(1, "Please select a target audience."),
  websitePurpose: z.string().min(1, "Please select the website's purpose."),
  requiredFeatures: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one feature.",
  }),
  contentSections: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one section.",
  }),
  designPreferences: z.string().min(1, "Please select a design preference."),
  themeColor: z.string().min(1, "Please select a theme color."),
  clientEmail: z.string().email("Please enter a valid email address."),
});

export function WebsiteForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: "",
      businessType: "",
      targetAudience: "",
      websitePurpose: "",
      requiredFeatures: [],
      contentSections: [],
      designPreferences: "",
      themeColor: "",
      clientEmail: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
          _subject: `New Static Site Request: ${values.websiteName}`,
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
                      <Input placeholder="e.g., The Cozy Corner Cafe" {...field} />
                    </FormControl>
                    <FormDescription>
                      What is the name of your new website?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Local Business (e.g., Cafe, Shop)">Local Business (e.g., Cafe, Shop)</SelectItem>
                          <SelectItem value="Service Provider (e.g., Agency, Consultant)">Service Provider (e.g., Agency, Consultant)</SelectItem>
                          <SelectItem value="Technology / Startup">Technology / Startup</SelectItem>
                          <SelectItem value="Personal / Portfolio">Personal / Portfolio</SelectItem>
                          <SelectItem value="Non-Profit / Community">Non-Profit / Community</SelectItem>
                          <SelectItem value="Creative / Arts">Creative / Arts</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a target audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Young Professionals">Young Professionals</SelectItem>
                          <SelectItem value="Local Families">Local Families</SelectItem>
                          <SelectItem value="Students">Students</SelectItem>
                          <SelectItem value="Businesses (B2B)">Businesses (B2B)</SelectItem>
                          <SelectItem value="General Consumers">General Consumers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="websitePurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Purpose of the Website</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the primary purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                          <SelectItem value="Portfolio/Showcase">Portfolio/Showcase</SelectItem>
                          <SelectItem value="Informational/Brochure">Informational/Brochure</SelectItem>
                          <SelectItem value="Blog/Content Publishing">Blog/Content Publishing</SelectItem>
                          <SelectItem value="Event Promotion">Event Promotion</SelectItem>
                          <SelectItem value="Online Resume / CV">Online Resume / CV</SelectItem>
                          <SelectItem value="Non-Profit / Cause Awareness">Non-Profit / Cause Awareness</SelectItem>
                          <SelectItem value="Educational Resource">Educational Resource</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredFeatures"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                       <div className="flex items-center gap-2">
                        <FormLabel>Required Features</FormLabel>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="max-h-[80svh]">
                              <DialogHeader>
                                <DialogTitle>Feature Explanations</DialogTitle>
                              </DialogHeader>
                               <div className="flex-1 min-h-0 overflow-y-auto">
                                <ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">
                                  {requiredFeaturesOptions.map(item => (
                                    <li key={item.id} className="text-sm text-muted-foreground">
                                      <strong className="text-foreground">{item.label}:</strong> {item.description}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </DialogContent>
                          </Dialog>
                      </div>
                      <FormDescription>
                        Select all the features you need for your website.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {requiredFeaturesOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="requiredFeatures"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.label
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="contentSections"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <FormLabel>Content Sections</FormLabel>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="max-h-[80svh]">
                              <DialogHeader>
                                <DialogTitle>Section Explanations</DialogTitle>
                              </DialogHeader>
                              <div className="flex-1 min-h-0 overflow-y-auto">
                                <ul className="list-disc pl-5 pr-6 pt-2 pb-4 space-y-4">
                                  {contentSectionsOptions.map(item => (
                                    <li key={item.id} className="text-sm text-muted-foreground">
                                      <strong className="text-foreground">{item.label}:</strong> {item.description}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </DialogContent>
                          </Dialog>
                      </div>
                      <FormDescription>
                        Select all the content sections your website will need.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {contentSectionsOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="contentSections"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.label
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    </div>
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
                            <SelectItem value="Minimalist & Clean">Minimalist & Clean</SelectItem>
                            <SelectItem value="Vibrant & Colorful">Vibrant & Colorful</SelectItem>
                            <SelectItem value="Professional & Corporate">Professional & Corporate</SelectItem>
                            <SelectItem value="Elegant & Sophisticated">Elegant & Sophisticated</SelectItem>
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
