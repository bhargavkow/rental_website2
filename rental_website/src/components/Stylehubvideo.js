import React, { useState, useEffect } from 'react';
import './Stylehubvideo.css';
import video from "../imges/stylehub_video.mp4"

const ImageContainer = () => {
    const [padding, setPadding] = useState(100);

    const maxScrollFor100 = 50;
    const maxPadding = 100;

    useEffect(() => {
        const handleScroll = () => {
            const sY = window.scrollY;
            const percent = 100 - (sY >= maxScrollFor100 ? 100 : (sY / (maxScrollFor100 / 100)));
            const newPadding = maxPadding * (percent / 100);
            setPadding(newPadding);
        };


        window.addEventListener('scroll', handleScroll, { passive: true });


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container" style={{ padding: `150px 0 500px 0` }}>
            <div
                id="img-container"
                className="flex-center"
                style={{ padding: `0 ${padding}px` }}
            >

                <video width="100%"

                    alt="Responsive" autoPlay muted loop >
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default ImageContainer;
