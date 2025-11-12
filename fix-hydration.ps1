# Script para arreglar errores de hidratación en páginas de servicios
# Reemplaza <p> con <div> cuando contienen EditableText con multiline

$servicePaths = @(
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\masc\page.tsx",
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\gestion-tramites\page.tsx",
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\area-empresarial-especifica\page.tsx",
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\representacion-defensa\page.tsx",
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\consultoria-creacion-empresas\page.tsx",
    "c:\Users\alexa\OneDrive\Desktop\c +\consultoria\consultoria\src\app\servicios\page.tsx"
)

foreach ($path in $servicePaths) {
    Write-Host "Procesando: $path"
    
    if (Test-Path $path) {
        $content = Get-Content -Path $path -Raw
        
        # Reemplazos específicos para diferentes patrones
        $content = $content -replace '<p className="mt-4 text-lg text-muted-foreground">\s*<EditableText', '<div className="mt-4 text-lg text-muted-foreground"><EditableText'
        $content = $content -replace '<p className="text-muted-foreground">\s*<EditableText', '<div className="text-muted-foreground"><EditableText'
        $content = $content -replace '<p className="text-muted-foreground mb-8 max-w-2xl mx-auto">\s*<EditableText', '<div className="text-muted-foreground mb-8 max-w-2xl mx-auto"><EditableText'
        $content = $content -replace '</EditableText>\s*</p>', '</EditableText></div>'
        
        Set-Content -Path $path -Value $content -NoNewline
        Write-Host "Completado: $path"
    } else {
        Write-Host "Archivo no encontrado: $path"
    }
}

Write-Host "Proceso completado para todas las páginas"