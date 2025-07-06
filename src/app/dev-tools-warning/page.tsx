
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TriangleAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DevToolsWarningPage() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bypassCode, setBypassCode] = useState('');

  useEffect(() => {
    let sequence: string[] = [];
    const targetSequence = ['d', 't', 'd'];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDialogOpen) return;

      const key = e.key.toLowerCase();
      sequence.push(key);

      if (sequence.length > targetSequence.length) {
        sequence.shift();
      }

      if (
        sequence.length === targetSequence.length &&
        sequence.join('') === targetSequence.join('')
      ) {
        setIsDialogOpen(true);
        sequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, isDialogOpen]);

  const handleBypassSubmit = () => {
    if (bypassCode === '2305') {
      try {
        sessionStorage.setItem('devToolsBypass', 'true');
        router.replace('/');
      } catch (error) {
        console.error('Could not set sessionStorage item:', error);
      }
    } else {
      alert('Incorrect code.');
      setBypassCode('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setBypassCode('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-black p-4 dark">
      <Card className="w-full max-w-md text-center shadow-lg bg-black border-destructive">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
            <TriangleAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="font-headline text-3xl text-destructive">
            Developer Tools Detected
          </CardTitle>
          <CardDescription className="text-lg text-destructive-foreground/90">
            Please close your browser's developer tools to continue using this
            application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This feature is disabled for security and privacy reasons. Pressing the F12 key can trigger this message.
          </p>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bypass Developer Tools Check</DialogTitle>
            <DialogDescription>
              Please enter the bypass code to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              placeholder="Enter code..."
              value={bypassCode}
              onChange={(e) => setBypassCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleBypassSubmit();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleBypassSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
