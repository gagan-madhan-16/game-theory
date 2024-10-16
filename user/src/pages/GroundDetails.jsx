import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';

const GroundDetails = () => {
    const navigate = useNavigate();
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [amenities, setAmenities] = useState(['Parking', 'Washroom']);
    const [name,setName] = useState('') ;

    const mockGround = {
        ground_name: 'Football Ground',
        location: 'Civil Lines, Allahabad',
        description: 'A large open field suitable for football matches.',
        price: 500,
        images: [
            'https://en.reformsports.com/oxegrebi/2020/09/mini-futbol-sahasi-ozellikleri-ve-olculeri.jpg',
            'https://olympiados.in/wp-content/uploads/2024/01/Football-Pitch-Olympiados-768x432.webp'
        ],
        availableSlots: [
            { time: '10:00 AM - 12:00 PM', openings: 3 },
            { time: '02:00 PM - 04:00 PM', openings: 2 }
        ],
    };

    const openImageViewer = (index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    };
    
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const bookGround = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTimeSlot || !name) {
            toast.error("Please fill all the fields");
            return;
        }
        toast.success("Ground booked successfully for Mr." + name);
        navigate('/bookings');
    };

    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedDate(new Date(selectedValue));
    };

    const handleTimeSlotChange = (event) => {
        setSelectedTimeSlot(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-4 lg:pt-5">
            <h2 className="text-2xl lg:text-4xl lg:mt-4 lg:ml-4 font-bold mb-4">{mockGround.ground_name}</h2>
            <div className='flex flex-col lg:flex-row'>
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>Location</h1>
                        <p className="text-lg mb-2">{mockGround.location}</p>
                    </div>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>About {mockGround.ground_name}</h1>
                        <p className="text-gray-700">{mockGround.description}</p>
                    </div>
                    <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center shadow-md'>
                        <h1 className='text-xl font-semibold mb-2'>Amenities</h1>
                        <p className="text-gray-700">{amenities.join(', ')}</p> 
                    </div>
                </div>
                <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
                    <div className='flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-lg justify-center mb-4 shadow-md'>
                        <h1 className='text-xl font-semibold mb-3'>Images</h1>
                        <div className="flex flex-row overflow-scroll">
                            {mockGround.images.map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        onClick={() => openImageViewer(index)}
                                        className="cursor-pointer"
                                        alt={`Image ${index + 1}`}
                                        style={{ maxWidth: '200px', height: '150px', margin: "2px" }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={bookGround} className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name of the Client:</label>
                            <input
                                type="text"
                                onChange={handleNameChange}
                                className='rounded p-2 border border-gray-300 w-full'
                                placeholder='Jhon Doe'
                            />
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={handleDateChange}
                                className='rounded p-2 border border-gray-300 w-full'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Time Slot:</label>
                            <select
                                value={selectedTimeSlot}
                                onChange={handleTimeSlotChange}
                                className="w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Select a Time Slot</option>
                                {mockGround.availableSlots.map((slot, index) => (
                                    <option key={index} value={slot.time}>
                                        {slot.time} ({slot.openings} openings)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span className='font-semibold'>@ ₹{mockGround.price}/hour</span>
                        <button
                            type='submit'
                            className='bg-gray-900 text-white lg:w-32 px-4 py-2 rounded-lg mb-2'
                        >
                            Book
                        </button>
                    </form>
                </div>
            </div>

            {isViewerOpen &&
                <ImageViewer
                    src={mockGround.images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                />
            }
        </div>
    );
}

export default GroundDetails;
