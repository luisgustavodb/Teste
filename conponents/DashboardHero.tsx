
import React from 'react';

interface DashboardHeroProps {
    userName: string | null;
}

const DashboardHero: React.FC<DashboardHeroProps> = ({ userName }) => {
    const firstName = userName ? userName.split(' ')[0] : 'estudante';

    return (
        <section className="py-12 sm:py-16">
            <div className="text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                    Bem-vindo de volta, <span className="text-brand-blue">{firstName}!</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                    Estamos felizes em te ver. Aqui está um resumo da sua jornada de bem-estar.
                </p>
            </div>
        </section>
    );
};

export default DashboardHero;
