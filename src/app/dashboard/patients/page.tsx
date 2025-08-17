"use client";

import {PatientsView} from "@/components/patients/PatientsView";

export default function PatientsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pacientes</h1>

        <PatientsView/>
    </div>
  );
}
