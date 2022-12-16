export default function getDateFromString(date: string): Date | undefined {
    if (date === '') {
        return;
    }

    const [yearTo, monthTo, dayTo] = date
      .split("-")
      .map((t: string) => Number(t));
    const dateObject = new Date();
    dateObject.setFullYear(yearTo, monthTo - 1, dayTo);

    return dateObject;
}