import dayjs from "dayjs";

export const isHoliday = (date, holidaySet) => {

    return holidaySet.has(dayjs(date).format("YYYY-MM-DD"));

};

export const getNextWorkingDate = (date, holidaySet) => {

    let current = dayjs(date);

    while (isHoliday(current, holidaySet)) {

        current = current.add(1, "day");

    }

    return current.format("YYYY-MM-DD");

};

export const getWorkingDays = (startDate, endDate) => {

    return dayjs(endDate).diff(dayjs(startDate), "day") + 1;

};