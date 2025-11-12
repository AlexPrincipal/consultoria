'use client';

export default function TestAdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración - Prueba</h1>
      <p>Si puedes ver esta página, la ruta /aw-admin/admin funciona correctamente.</p>
      <div className="mt-4 p-4 bg-green-100 rounded">
        <p>✅ La autenticación y redirección están funcionando</p>
      </div>
    </div>
  );
}