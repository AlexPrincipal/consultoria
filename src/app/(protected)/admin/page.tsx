'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateHomePageContent } from './actions';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

const homeContentSchema = z.object({
  heroHeadline: z.string().min(1, "El titular es requerido."),
  heroSubhead: z.string().min(1, "El subtítulo es requerido."),
  heroPrimaryCtaText: z.string().min(1, "El texto del botón es requerido."),
  heroSecondaryCtaText: z.string().min(1, "El texto del botón es requerido."),
  servicesOverviewTitle: z.string().min(1, "El título de servicios es requerido."),
  service1Title: z.string().min(1, "El título es requerido."),
  service1Description: z.string().min(1, "La descripción es requerida."),
  service2Title: z.string().min(1, "El título es requerido."),
  service2Description: z.string().min(1, "La descripción es requerida."),
  service3Title: z.string().min(1, "El título es requerido."),
  service3Description: z.string().min(1, "La descripción es requerida."),
  contactUsTitle: z.string().min(1, "El título de contacto es requerido."),
});

type HomeContentForm = z.infer<typeof homeContentSchema>;

export default function AdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const homePageContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'homePageContent', 'main') : null),
    [firestore]
  );
  
  const { data: homePageData, isLoading } = useDoc(homePageContentRef);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<HomeContentForm>({
    resolver: zodResolver(homeContentSchema),
  });

  useEffect(() => {
    if (homePageData) {
      reset(homePageData as HomeContentForm);
    }
  }, [homePageData, reset]);

  async function onSubmit(data: HomeContentForm) {
    toast({ title: 'Guardando...', description: 'Actualizando el contenido de la página de inicio.' });
    
    const result = await updateHomePageContent(data);

    if (result.success) {
      toast({ title: '¡Éxito!', description: result.message });
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  }

  if (isLoading) {
    return (
        <Card className="bg-card/50 border-border/50">
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                 <Skeleton className="h-10 w-32" />
            </CardFooter>
        </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Gestionar Contenido de la Página de Inicio</CardTitle>
          <CardDescription>
            Modifique los textos que se muestran en la página principal. Los cambios se reflejarán inmediatamente después de guardar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 p-4 border rounded-md border-border/50">
            <h3 className="text-lg font-semibold text-primary">Sección Principal (Hero)</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="heroHeadline">Titular Principal</Label>
                <Input id="heroHeadline" {...register('heroHeadline')} />
                {errors.heroHeadline && <p className="text-destructive text-sm">{errors.heroHeadline.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="heroSubhead">Subtítulo</Label>
                    <Textarea id="heroSubhead" {...register('heroSubhead')} />
                    {errors.heroSubhead && <p className="text-destructive text-sm">{errors.heroSubhead.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="heroPrimaryCtaText">Texto Botón Primario</Label>
                    <Input id="heroPrimaryCtaText" {...register('heroPrimaryCtaText')} />
                    {errors.heroPrimaryCtaText && <p className="text-destructive text-sm">{errors.heroPrimaryCtaText.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="heroSecondaryCtaText">Texto Botón Secundario</Label>
                    <Input id="heroSecondaryCtaText" {...register('heroSecondaryCtaText')} />
                    {errors.heroSecondaryCtaText && <p className="text-destructive text-sm">{errors.heroSecondaryCtaText.message}</p>}
                </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4 p-4 border rounded-md border-border/50">
            <h3 className="text-lg font-semibold text-primary">Sección de Servicios</h3>
            <div className="space-y-2">
                <Label htmlFor="servicesOverviewTitle">Título General de Servicios</Label>
                <Input id="servicesOverviewTitle" {...register('servicesOverviewTitle')} />
                {errors.servicesOverviewTitle && <p className="text-destructive text-sm">{errors.servicesOverviewTitle.message}</p>}
            </div>
             <div className="grid md:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2 p-2 border rounded-sm border-border/30">
                    <Label htmlFor="service1Title">Servicio 1: Título</Label>
                    <Input id="service1Title" {...register('service1Title')} />
                    {errors.service1Title && <p className="text-destructive text-sm">{errors.service1Title.message}</p>}
                    <Label htmlFor="service1Description">Servicio 1: Descripción</Label>
                    <Textarea id="service1Description" {...register('service1Description')} rows={3} />
                    {errors.service1Description && <p className="text-destructive text-sm">{errors.service1Description.message}</p>}
                </div>
                 <div className="space-y-2 p-2 border rounded-sm border-border/30">
                    <Label htmlFor="service2Title">Servicio 2: Título</Label>
                    <Input id="service2Title" {...register('service2Title')} />
                    {errors.service2Title && <p className="text-destructive text-sm">{errors.service2Title.message}</p>}
                    <Label htmlFor="service2Description">Servicio 2: Descripción</Label>
                    <Textarea id="service2Description" {...register('service2Description')} rows={3} />
                    {errors.service2Description && <p className="text-destructive text-sm">{errors.service2Description.message}</p>}
                </div>
                 <div className="space-y-2 p-2 border rounded-sm border-border/30">
                    <Label htmlFor="service3Title">Servicio 3: Título</Label>
                    <Input id="service3Title" {...register('service3Title')} />
                    {errors.service3Title && <p className="text-destructive text-sm">{errors.service3Title.message}</p>}
                    <Label htmlFor="service3Description">Servicio 3: Descripción</Label>
                    <Textarea id="service3Description" {...register('service3Description')} rows={3} />
                    {errors.service3Description && <p className="text-destructive text-sm">{errors.service3Description.message}</p>}
                </div>
            </div>
          </div>
          
           {/* Contact Section */}
           <div className="space-y-4 p-4 border rounded-md border-border/50">
             <h3 className="text-lg font-semibold text-primary">Sección de Contacto (CTA Final)</h3>
             <div className="space-y-2">
                <Label htmlFor="contactUsTitle">Título</Label>
                <Input id="contactUsTitle" {...register('contactUsTitle')} />
                {errors.contactUsTitle && <p className="text-destructive text-sm">{errors.contactUsTitle.message}</p>}
             </div>
           </div>

        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
