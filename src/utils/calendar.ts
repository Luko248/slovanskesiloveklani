export const generateICS = () => {
    const event = {
        title: "Slovanské Silové Klání 2026",
        description: "5. ročník amatérské silové soutěže / 5th Annual Amateur Strongman Competition",
        startTime: "20260607T080000Z", // UTC time (10:00 CEST = 08:00 UTC)
        endTime: "20260607T160000Z", // Estimated end time
        location: "Pustiměřské Prusy, hasičská zbrojnice",
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SlovanskeSiloveKlani//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${Date.now()}@slovanskesiloveklani.cz
DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, '')}
DTSTART:${event.startTime}
DTEND:${event.endTime}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
};

export const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'slovanske-silove-klani-2025.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
