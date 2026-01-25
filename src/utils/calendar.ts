import { EVENT_CONFIG, getICSStartTime, getICSEndTime, getFullLocation } from './eventConfig';

export const generateICS = () => {
    const event = {
        title: EVENT_CONFIG.title,
        description: `${EVENT_CONFIG.edition} amatérské silové soutěže / 5th Annual Amateur Strongman Competition`,
        startTime: getICSStartTime(),
        endTime: getICSEndTime(),
        location: getFullLocation(),
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
    link.setAttribute('download', `slovanske-silove-klani-${EVENT_CONFIG.date.year}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
