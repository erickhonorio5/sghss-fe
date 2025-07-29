"use client";
import React from "react";
import featuresData from "./FeaturesData";
import SingleFeature from "./SingleFeature";
import SectionHeader from "@/components/common/SectionHeader";

const Feature = () => {
    return (
        <>
            {/* <!-- ===== Features Start ===== --> */}
            <section id="features" className="py-5 lg:py-5 xl:py-5">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    {/* <!-- Section Title Start --> */}
                    <SectionHeader
                        headerInfo={{
                            title: "RECURSOS DO SGHSS",
                            subtitle: "Soluções Inteligentes para a Gestão em Saúde",
                            description: `O SGHSS oferece um conjunto robusto de funcionalidades projetadas para otimizar a rotina de clínicas e instituições de saúde. Desde o cadastro completo de pacientes até a automação de agendamentos, nossa plataforma eleva o padrão de gestão com inteligência, eficiência e segurança.`,
                        }}
                    />
                    {/* <!-- Section Title End --> */}

                    <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
                        {/* <!-- Features item Start --> */}
                        {featuresData.map((feature, key) => (
                            <SingleFeature feature={feature} key={key} />
                        ))}
                        {/* <!-- Features item End --> */}
                    </div>
                </div>
            </section>
            {/* <!-- ===== Features End ===== --> */}
        </>
    );
};

export default Feature;