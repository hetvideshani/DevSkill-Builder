import React from 'react';
import "@/css/streak.css";

const StreakBoard = ({ Dates }: { Dates: string[] }) => {
	const [dropdownOpen, setDropdownOpen] = React.useState(false);
	const [year, setYear] = React.useState(new Date().getFullYear());

	const months = [
		{ name: 'January', days: 31 },
		{ name: 'February', days: 28 },
		{ name: 'March', days: 31 },
		{ name: 'April', days: 30 },
		{ name: 'May', days: 31 },
		{ name: 'June', days: 30 },
		{ name: 'July', days: 31 },
		{ name: 'August', days: 31 },
		{ name: 'September', days: 30 },
		{ name: 'October', days: 31 },
		{ name: 'November', days: 30 },
		{ name: 'December', days: 31 }
	];

	const filterDatesForYear = (year: number) => {
		return Dates.filter(date => new Date(date).getFullYear() === year);
	};

	const calculateStreakData = (year: number) => {
		const filteredDates = filterDatesForYear(year).map(date => new Date(date).toISOString().split('T')[0]);

		const uniqueDates = [...new Set(filteredDates)];
		const sortedDates = uniqueDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

		let maxStreak = 0;
		let currentStreak = 1;
		let totalActiveDays = sortedDates.length;

		for (let i = 1; i < sortedDates.length; i++) {
			const prevDate = new Date(sortedDates[i - 1]);
			const currentDate = new Date(sortedDates[i]);
			const diffInTime = currentDate.getTime() - prevDate.getTime();
			const diffInDays = diffInTime / (1000 * 3600 * 24);

			if (diffInDays === 1) {
				currentStreak++;
				maxStreak = Math.max(maxStreak, currentStreak);
			} else {
				currentStreak = 1;
			}
		}

		return {
			totalPrograms: Dates.length,
			totalActiveDays,
			maxStreak
		};
	};

	const streakData = calculateStreakData(year);

	const Formates = (name: string, days: number, monthIndex: number) => {
		return (
			<div className='mr-5' key={name}>
				<div className="text-center font-semibold mb-2 text-white w-16">{name}</div>
				<div className="grid grid-rows-7 grid-cols-5 gap-x-2">
					{Array.from({ length: days }, (_, i) => {
						const currentDate = new Date(year, monthIndex, i + 1).toISOString().split('T')[0];
						const isDateIncluded = Dates.some(date => date.startsWith(currentDate));
						const bgColor = isDateIncluded ? 'bg-[#28c244]' : 'bg-[#393939]';

						return (
							<div
								key={i}
								className={`border border-gray-800 rounded-sm w-4 h-4 ${bgColor}`}
								data-title={isDateIncluded ? currentDate : ''}
							></div>
						);
					})}
				</div>
			</div>
		);
	};

	const handleYearSelect = (selectedYear: number) => {
		setYear(selectedYear);
		setDropdownOpen(false);
	};

	return (
		<div className="bg-[#282828] p-4 rounded shadow flex-grow">
			<div className="flex justify-between items-center text-custom-white mb-10 mt-2">
				<div className="flex-shrink-0 text-lg">
					<span className='font-bold'>{streakData.totalPrograms}</span> Programs in past one year
				</div>

				<div className="flex space-x-3 mt-2">
					<div>Total active days: <span className='font-bold'>{streakData.totalActiveDays}</span></div>
					<div>Max Streak: <span className='font-bold'>{streakData.maxStreak}</span></div>
					<div className="-mt-2 relative">
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className="text-gray-300 bg-[#464646] px-3 py-2 rounded-md text-sm font-medium"
						>
							{year} <i className="ms-2 fa fa-angle-down"></i>
						</button>
						{dropdownOpen && (
							<div className="absolute ms-2 mt-2 py-2 w-28 bg-[#464646] rounded-md shadow-lg z-50">
								<a className="cursor-pointer block px-4 py-2 text-sm text-custom-white hover:bg-gray-100 hover:text-black" onClick={() => handleYearSelect(2024)}>2024</a>
								<a className="cursor-pointer block px-4 py-2 text-sm text-custom-white hover:bg-gray-100 hover:text-black" onClick={() => handleYearSelect(2023)}>2023</a>
								<a className="cursor-pointer block px-4 py-2 text-sm text-custom-white hover:bg-gray-100 hover:text-black" onClick={() => handleYearSelect(2022)}>2022</a>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='w-full h-48 overflow-auto'>
				<div className="grid grid-cols-12 gap-4">
					<div className='flex flex-row'>
						{months.map((month, index) => {
							return Formates(month.name, month.days, index);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StreakBoard;