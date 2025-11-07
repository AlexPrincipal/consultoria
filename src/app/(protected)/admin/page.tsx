'use client';
import { updateHomePageContent } from '@/app/(protected)/admin/actions';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { useEffect, useState, useTransition } from 'react';

function AdminDashboard() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isPending, startTransition] = useTransition();

  const homePageContentRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'homePageContent', 'main') : null),
    [firestore]
  );
  
  const { data: homePageData, isLoading } = useDoc(homePageContentRef);

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (homePageData) {
      setFormData(homePageData);
    }
  }, [homePageData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateHomePageContent(formData);
      if (result.success) {
        toast({
          title: 'Éxito',
          description: result.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };
  
  const renderFormFields = () => {
    if (isLoading) {
      return (
         <div className="space-y-6">
          <div className="space-y-2 p-4 border rounded-md border-border/50">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 p-4 border rounded-md border-border/50">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-4">
               {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Hero Section */}
        <div className="space-y-2 p-4 border rounded-md border-border/50">
          <h3 className="font-headline text-lg text-primary">Sección Principal (Hero)</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroHeadline">Título Principal</Label>
              <Input name="heroHeadline" value={formData.heroHeadline || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="heroSubhead">Subtítulo</Label>
              <Textarea name="heroSubhead" value={formData.heroSubhead || ''} onChange={handleChange} />
            </div>
              <div>
              <Label htmlFor="heroBackgroundImageUrl">URL Imagen de Fondo</Label>
              <Input name="heroBackgroundImageUrl" value={formData.heroBackgroundImageUrl || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="heroPrimaryCtaText">Texto Botón Primario</Label>
              <Input name="heroPrimaryCtaText" value={formData.heroPrimaryCtaText || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="heroSecondaryCtaText">Texto Botón Secundario</Label>
              <Input name="heroSecondaryCtaText" value={formData.heroSecondaryCtaText || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
        
          {/* Services Section */}
        <div className="space-y-2 p-4 border rounded-md border-border/50">
          <h3 className="font-headline text-lg text-primary">Sección de Servicios</h3>
          <div className="space-y-4">
              <div>
                <Label htmlFor="servicesOverviewTitle">Título General de Servicios</Label>
                <Input name="servicesOverviewTitle" value={formData.servicesOverviewTitle || ''} onChange={handleChange} />
              </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                      <Label htmlFor="service1Title">Título Servicio 1</Label>
                      <Input name="service1Title" value={formData.service1Title || ''} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                      <Label htmlFor="service1Description">Descripción Servicio 1</Label>
                      <Input name="service1Description" value={formData.service1Description || ''} onChange={handleChange} />
                  </div>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                      <Label htmlFor="service2Title">Título Servicio 2</Label>
                      <Input name="service2Title" value={formData.service2Title || ''} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                      <Label htmlFor="service2Description">Descripción Servicio 2</Label>
                      <Input name="service2Description" value={formData.service2Description || ''} onChange={handleChange} />
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                      <Label htmlFor="service3Title">Título Servicio 3</Label>
                      <Input name="service3Title" value={formData.service3Title || ''} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                      <Label htmlFor="service3Description">Descripción Servicio 3</Label>
                      <Input name="service3Description" value={formData.service3Description || ''} onChange={handleChange} />
                  </div>
              </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-2 p-4 border rounded-md border-border/50">
            <h3 className="font-headline text-lg text-primary">Sección Llamada a la Acción (Final)</h3>
            <div>
              <Label htmlFor="contactUsTitle">Título CTA</Label>
              <Input name="contactUsTitle" value={formData.contactUsTitle || ''} onChange={handleChange} />
            </div>
        </div>
      </>
    );
  }

  return (
     <Card className="w-full max-w-4xl mx-auto bg-card border-border/50">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div>
            <CardTitle className="text-2xl font-headline">Editar Contenido del Inicio</CardTitle>
            <CardDescription>
              Realice cambios en los textos e imágenes de la página principal.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 max-h-[65vh] overflow-y-auto p-6">
          {renderFormFields()}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function AdminPage() {
    const { user, isUserLoading } = useUser();

    if (isUserLoading) {
        return (
             <div className="flex items-center justify-center min-h-[calc(100vh-7rem)]">
                <p>Cargando panel de administración...</p>
            </div>
        );
    }
  
    // El layout ya se encarga de redirigir si no hay usuario,
    // por lo que este componente solo se renderiza si hay un usuario.
    return (
      <AdminDashboard />
    );
}
