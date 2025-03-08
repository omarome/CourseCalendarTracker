import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { LuPartyPopper } from "react-icons/lu"; // Celebration icon
import "react-calendar/dist/Calendar.css"; // Default styles (optional)

const CalendarUI: React.FC = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
    // Load completed days from localStorage
    const savedData = localStorage.getItem("completedDays");
    return savedData ? JSON.parse(savedData) : {};
  });

  // Save completed days to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
  }, [completedDays]);

  // Toggle a day as completed
  const toggleDay = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCompletedDays((prev) => ({
      ...prev,
      [dateKey]: !prev[dateKey], // Toggle the completion status
    }));
  };

  // Custom tile content to show checkmark for completed days
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey = date.toISOString().split("T")[0];
      return completedDays[dateKey] ? <LuPartyPopper className="text-2xl rounded-xl bg-yallow dark:text-green-500 shadow" /> : null;
    }
    return null;
  };

  // Custom tile class to apply green background for completed days
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateKey = date.toISOString().split("T")[0];
      return completedDays[dateKey] ? "dark:bg-black-800 text-black" : null;
    }
    return null;
  };

  return (
    <div className="p-4 max-w-lg mx-auto flex justify-center items-center mt-15">
      <Calendar
      onChange={(value: any) => setDate(value as Date)}
      value={date}
      onClickDay={toggleDay} // Mark/unmark a day as done when clicked
        tileContent={tileContent} // Show checkmark for completed days
        tileClassName={tileClassName} // Apply green background for completed days
        className="rounded-lg border border-gray-200 p-2 shadow w-full h-full"
      />
    </div>
  );
};

export default CalendarUI;