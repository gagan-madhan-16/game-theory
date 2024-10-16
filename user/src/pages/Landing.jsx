import React, {  useState } from 'react';
import GroundCard from '../components/GroundCard';
import ImageSlider from '../components/ImageSlider';
import '../custom.css';

const Landing = () => {
    const initialGrounds = [
        {
            _id: '1',
            ground_name: 'Football Ground',
            location: 'Prayagraj',
            price: 500,
            images: ['https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg'],
        },
        {
            _id: '2',
            ground_name: 'Basketball Court',
            location: 'Prayagraj',
            price: 200,
            images: ['https://woxsen.edu.in/uploads/A20240822085112.webp'],
        },
        {
            _id: '3',
            ground_name: 'Tennis Court',
            location: 'Prayagraj',
            price: 300,
            images: ['https://content3.jdmagicbox.com/comp/allahabad/g1/0532px532.x532.171230090605.x2g1/catalogue/kp-ground-tennis-court-2-george-town-allahabad-lawn-tennis-courts-y9zzbfka5w.jpg'],
        },
        {
            _id: '4',
            ground_name: 'Cricket Ground',
            location: 'Prayagraj',
            price: 500,
            images: ['https://swastikafilms.com/wp-content/uploads/2022/05/Manicured-lawn-with-cricket-picth-1024x768.jpg'],
        },
    ];

    const [grounds, setGrounds] = useState(initialGrounds);

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350; 
        const totalWidth = grounds.length * cardWidth;
        const maxScroll = totalWidth - container.offsetWidth;

        if (direction === 'left') {
            setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0));
        } else if (direction === 'right') {
            setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll));
        }
    };

    return (
        <div className="relative">
            <ImageSlider />

            <div className="flex w-full absolute z-10 justify-between mt-40">
                <button onClick={() => handleScroll('left')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="/images/la.svg" alt="left arrow" />
                </button>
                <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="/images/ra.svg" alt="right arrow" />
                </button>
            </div>

            <div id="groundContainer" className="flex mx-4 sm:mx-16 my-8 overflow-x-auto justify-between relative">
                <div className="flex justify-between my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                    {grounds.map((ground) => (
                        <div key={ground._id} className="mr-5">
                            <GroundCard
                                id={ground._id}
                                name={ground.ground_name}
                                location={ground.location}
                                price={ground.price}
                                image={ground.images[0]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
