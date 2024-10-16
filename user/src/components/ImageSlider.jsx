import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
    const images = [
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/gkl4fwtgcrczm5nbegny',
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/epcd0vcsfdd7uddnchcj',
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/ckfp1eacoxu479kw28gw',
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/xgvizuixnlbztvijclqe',
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/dslt7ddwnq4wyummnaof',
        'https://res.cloudinary.com/dvv1qhibw/image/upload/f_auto,q_auto/v1/gdsc/game%20theory/ow21wz8gyaguh4jolgva'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative text-white w-full h-96 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-20"></div>
            <div className="absolute inset-0 flex items-center justify-center z-30">
                <h1 className="text-white text-4xl font-bold">Welcome to Book-A-Ground.com</h1>
            </div>

            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

        </div>
    );
};

export default ImageSlider;
