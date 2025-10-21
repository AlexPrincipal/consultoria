'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

type TeamMember = {
  name: string;
  title: string;
  slug: string;
  imageUrl: string;
  imageHint: string;
  bio: string;
};

export default function TeamCard({ member, className }: { member: TeamMember, className?: string }) {
  return (
    <Card className={cn("bg-card text-card-foreground border-border/50 shadow-xl text-center flex flex-col items-center pt-8 h-full transition-transform duration-300 hover:-translate-y-2", className)}>
      <CardHeader className="p-0 items-center">
        <Link href={`/quienes-somos/${member.slug}`}>
            <div className="relative h-40 w-40 rounded-lg overflow-hidden border-4 border-white/80">
              <Image
                src={member.imageUrl}
                alt={`Retrato de ${member.name}`}
                fill
                className="object-cover"
                data-ai-hint={member.imageHint}
              />
            </div>
        </Link>
          <div className="pt-4">
             <Link href={`/quienes-somos/${member.slug}`} className="group/link">
                <h3 className="text-xl font-bold font-headline text-white group-hover/link:text-primary">{member.name}</h3>
             </Link>
            <p className="text-primary font-medium">{member.title}</p>
          </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4 px-4">
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
      <div className="pb-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
