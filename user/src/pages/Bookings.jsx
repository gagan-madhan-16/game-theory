import React, { useEffect, useState } from "react";
import { BookingCard } from "../components/GroundCard";
import Filter from "../components/Filter";

const Bookings = () => {
	const [upcomingBookings, setUpcomingBookings] = useState([]);
	const [previousBookings, setPreviousBookings] = useState([]);

	const user = "DemoUser";
	const email = "demo@user.com";

	const mockBookings = [
		{
			_id: "1",
			ground: "Soccer Field",
			date: "2024-12-01",
			timeSlot: "10:00 AM - 12:00 PM",
		},
		{
			_id: "2",
			ground: "Cricket Ground",
			date: "2024-10-10",
			timeSlot: "02:00 PM - 04:00 PM",
		},
		{
			_id: "3",
			ground: "Basketball Court",
			date: "2024-10-15",
			timeSlot: "06:00 PM - 08:00 PM",
		},
	];

	const getBookings = (filteredData) => {
		// const today = filteredData.date;
		console.log(filteredData?.date);
		const today =
			filteredData?.date !== null
				? filteredData?.date
				: new Date().toISOString().slice(0, 10);

		const previous = mockBookings.filter((booking) => booking.date <= today);

		setPreviousBookings(previous);
	};

	const clearBookingFilter = () => {
		setPreviousBookings(mockBookings);
	};

	const getUpcomingBookings = (filteredData) => {
		console.log(filteredData?.date);
		const today =
			filteredData?.date !== null
				? filteredData?.date
				: new Date().toISOString().slice(0, 10);
		const upcoming = mockBookings
			.filter((booking) => booking.date >= today)
			.sort((a, b) => new Date(a.date) - new Date(b.date));
		setUpcomingBookings(upcoming);
	};

	const clearUpcomingBookingFilter = () => {
		setUpcomingBookings(mockBookings);
	};

	useEffect(() => {
		getBookings();
	}, []);

	return (
		<div className="bg-gray-200 min-h-screen p-8">
			<p className="ml-5 md:ml-10 mt-5 mb-10 font-semibold text-3xl text-center md:text-left">
				Here are your bookings, {user}
			</p>

			<div className="flex justify-between md:justify-normal  items-center p-4 md:gap-4">
				<div className="font-bold text-xl text-left">Upcoming Bookings</div>
				<div>
					<Filter
						onFilter={getUpcomingBookings}
						onClear={clearUpcomingBookingFilter}
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-center md:justify-start gap-5">
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
					<p className="ml-5 md:ml-10 mt-5 mb-16 font-light text-xl text-center md:text-left">
						You don't have any upcoming bookings.
					</p>
				)}
			</div>

			<div className="flex justify-between md:justify-normal  items-center p-4 md:gap-4">
				<div className="font-bold text-xl text-left">Previous Bookings</div>
				<div>
					<Filter onFilter={getBookings} onClear={clearBookingFilter} />
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-center md:justify-start gap-5">
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
					<p className="ml-5 md:ml-10 mt-5 mb-5 font-light text-xl text-center md:text-left">
						You don't have any previous bookings.
					</p>
				)}
			</div>
		</div>
	);
};

export default Bookings;
