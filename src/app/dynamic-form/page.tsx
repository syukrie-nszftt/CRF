
import { DynamicWebsiteForm } from '@/components/DynamicWebsiteForm';
import { Database } from 'lucide-react';

export default function DynamicFormPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <Database className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
            Dynamic Website Request Form
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Describe your dynamic project. This form covers interactive features, user accounts, and data management.
          </p>
        </div>
        <DynamicWebsiteForm />
      </div>
    </div>
  );
}
