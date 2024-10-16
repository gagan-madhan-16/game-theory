import React, { useEffect, useState } from 'react';
import { BookingCard } from '../components/GroundCard'; ``

const Bookings = () => {
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [previousBookings, setPreviousBookings] = useState([]);

    const user = 'DemoUser';
    const email = 'demo@user.com';
    
    const mockBookings = [
        {
            _id: '1',
            ground: 'Soccer Field',
            date: '2024-12-01',
            timeSlot: '10:00 AM - 12:00 PM',
        },
        {
            _id: '2',
            ground: 'Cricket Ground',
            date: '2024-10-10',
            timeSlot: '02:00 PM - 04:00 PM',
        },
        {
            _id: '3',
            ground: 'Basketball Court',
            date: '2024-10-15',
            timeSlot: '06:00 PM - 08:00 PM',
        },
    ];

    const getBookings = () => {
        const today = new Date().toISOString().slice(0, 10);

        
        const upcoming = mockBookings
            .filter(booking => booking.date >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const previous = mockBookings.filter(booking => booking.date < today);

        setUpcomingBookings(upcoming);
        setPreviousBookings(previous);
    };

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div className='bg-gray-200 min-h-screen p-8'>
            <p className='ml-5 md:ml-10 mt-5 mb-10 font-semibold text-3xl text-center md:text-left'>
                Here are your bookings, {user}
            </p>

            
            <div className='mx-2 md:ml-10 mt-5 mb-3 font-bold text-xl text-center md:text-left'>
                Upcoming Bookings
            </div>
            <div className='flex flex-col md:flex-row justify-center md:justify-start gap-5'>
                {upcomingBookings?.map((booking) => (
                    <div key={booking?._id} className="ml-5 md:ml-10 mt-5 mb-16">
                        <BookingCard
                            id={booking?._id}
                            ground={booking?.ground}
                            date={booking?.date.slice(0, 10)}
                            time={booking?.timeSlot}
                        />
                    </div>
                ))}
                {upcomingBookings.length === 0 && (
                    <p className='ml-5 md:ml-10 mt-5 mb-16 font-light text-xl text-center md:text-left'>
                        You don't have any upcoming bookings.
                    </p>
                )}
            </div>

            <div className='mx-2 md:ml-10 mt-5 mb-3 font-bold text-xl text-center md:text-left'>
                Previous Bookings
            </div>
            <div className='flex flex-col md:flex-row justify-center md:justify-start gap-5'>
                {previousBookings?.map((booking) => (
                    <div key={booking?._id} className="ml-5 md:ml-10 mt-5">
                        <BookingCard
                            id={booking?._id}
                            ground={booking?.ground}
                            date={booking?.date.slice(0, 10)}
                            time={booking?.timeSlot}
                        />
                    </div>
                ))}
                {previousBookings.length === 0 && (
                    <p className='ml-5 md:ml-10 mt-5 mb-5 font-light text-xl text-center md:text-left'>
                        You don't have any previous bookings.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Bookings;
