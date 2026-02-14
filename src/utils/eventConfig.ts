/**
 * Single source of truth for all event data
 * Import this config in all components that display event information
 */

export const EVENT_CONFIG = {
  title: "Slovanské Silové Klání 2026",
  edition: "5. ročník",
  date: {
    year: 2026,
    month: 6, // June
    day: 13,
  },
  time: {
    startHour: 9,
    startMinute: 30,
    endHour: 16,
    endMinute: 0,
  },
  timezone: "Europe/Prague",
  location: {
    name: "Za Hasičskou Zbrojnicí",
    city: "Pustiměř",
    country: "Česká republika",
  },
} as const;

export const SEO_METADATA = {
  title: "Slovanské Silové Klání 2026 | Silová soutěž v Pustiměři",
  description:
    "Slovanské Silové Klání 2026 v Pustiměři: amatérská silová soutěž, originální disciplíny, doprovodný program, lukostřelba, kovářská dílna a grilování.",
} as const;

const PRAGUE_UTC_OFFSET_HOURS = 2; // CEST (UTC+2) for June event date

const formatICSUtcTimestamp = (hour: number, minute: number): string => {
  const { year, month, day } = EVENT_CONFIG.date;
  const utcDate = new Date(
    Date.UTC(year, month - 1, day, hour - PRAGUE_UTC_OFFSET_HOURS, minute, 0),
  );

  return `${utcDate.getUTCFullYear()}${String(utcDate.getUTCMonth() + 1).padStart(2, "0")}${String(utcDate.getUTCDate()).padStart(2, "0")}T${String(utcDate.getUTCHours()).padStart(2, "0")}${String(utcDate.getUTCMinutes()).padStart(2, "0")}${String(utcDate.getUTCSeconds()).padStart(2, "0")}Z`;
};

/**
 * Returns formatted date string
 * @param locale - Locale for formatting (default: 'cs-CZ')
 * @returns Date in format "13.06.2026"
 */
export const getFormattedDate = (locale: string = 'cs-CZ'): string => {
  const { year, month, day } = EVENT_CONFIG.date;
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
};

/**
 * Returns formatted time range
 * @returns Time in format "9:30 - 16:00"
 */
export const getFormattedTime = (): string => {
  const { startHour, startMinute, endHour, endMinute } = EVENT_CONFIG.time;
  const start = `${startHour}:${String(startMinute).padStart(2, '0')}`;
  const end = `${endHour}:${String(endMinute).padStart(2, '0')}`;
  return `${start} - ${end}`;
};

/**
 * Returns formatted date and start time
 * @returns DateTime in format "13.06.2026 | 9:30"
 */
export const getFormattedDateTime = (): string => {
  const { startHour, startMinute } = EVENT_CONFIG.time;
  const start = `${startHour}:${String(startMinute).padStart(2, '0')}`;
  return `${getFormattedDate()} | ${start}`;
};

/**
 * Returns ICS start time in UTC format
 * June 13, 2026 at 9:30 CEST (UTC+2) = 7:30 UTC
 * @returns UTC timestamp "20260613T073000Z"
 */
export const getICSStartTime = (): string => {
  const { startHour, startMinute } = EVENT_CONFIG.time;
  return formatICSUtcTimestamp(startHour, startMinute);
};

/**
 * Returns ICS end time in UTC format
 * June 13, 2026 at 16:00 CEST (UTC+2) = 14:00 UTC
 * @returns UTC timestamp "20260613T140000Z"
 */
export const getICSEndTime = (): string => {
  const { endHour, endMinute } = EVENT_CONFIG.time;
  return formatICSUtcTimestamp(endHour, endMinute);
};

/**
 * Returns event start time in ISO UTC format for browser countdown usage.
 * Example: "2026-06-13T07:30:00Z" for 09:30 CEST (Europe/Prague).
 */
export const getEventStartISOStringUTC = (): string => {
  const timestamp = getICSStartTime();
  return `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}T${timestamp.slice(9, 11)}:${timestamp.slice(11, 13)}:${timestamp.slice(13, 15)}Z`;
};

/**
 * Returns full location string
 * @returns Location in format "Za Hasičskou Zbrojnicí, Pustiměř"
 */
export const getFullLocation = (): string => {
  const { name, city } = EVENT_CONFIG.location;
  return `${name}, ${city}`;
};

// Type export for consumers
export type EventConfig = typeof EVENT_CONFIG;
