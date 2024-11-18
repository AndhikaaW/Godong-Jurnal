import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';

interface LoadingNavigatorProps {
    destination: string;
}

const LoadingNavigator: React.FC<LoadingNavigatorProps> = ({ destination }) => {
    const router = useRouter();

    useEffect(() => {
        router.push(destination);
    }, [destination, router]);

    return (
        <div className="flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <ProgressSpinner />
        </div>
    );
};

export default LoadingNavigator;