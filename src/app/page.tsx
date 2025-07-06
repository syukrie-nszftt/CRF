
import { WebsiteForm } from '@/components/WebsiteForm';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
            Static Website Request Form
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Detail your project needs below. We'll transform your input into a comprehensive brief for our developers.
          </p>
        </div>
        <WebsiteForm />
      </div>
    </div>
  );
}
