import React from 'react';
import { InstagramEmbed } from 'react-social-media-embed'; 

const InstagramWidget: React.FC = () => {
    const POST_URL = 'https://www.instagram.com/lspiuinbdg/'; 

    return (
        <div className="flex justify-center items-start overflow-auto w-full h-full">
            <InstagramEmbed 
                url={POST_URL} 
                width="100%"
            />
        </div>
    );
};

export default InstagramWidget;