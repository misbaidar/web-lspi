// src/components/MapEmbed.tsx
import React from 'react';

// 💡 Ganti URL/KODE IFRAME ini dengan lokasi KAMPUS UIN SGD Bandung yang sebenarnya.
// Anda bisa mendapatkan kode iframe dari Google Maps (fungsi 'Bagikan' -> 'Sematkan Peta').
const GOOGLE_MAPS_IFRAME = `
    <iframe 
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3330.5228916792084!2d107.7176786647989!3d-6.928618585612195!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3001503720b%3A0x4ad57397ec9f7d1e!2sPondok%20Asy%20Syabab!5e0!3m2!1sen!2sid!4v1764854047861!5m2!1sen!2sid" 
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Lokasi Kampus UIN SGD Bandung"
    ></iframe>
`;

const MapEmbed: React.FC = () => {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
            {/* Menggunakan dangerouslySetInnerHTML untuk menyisipkan iframe Google Maps */}
            <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: GOOGLE_MAPS_IFRAME }}
            />
        </div>
    );
};

export default MapEmbed;