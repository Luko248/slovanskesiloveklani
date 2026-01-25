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
  const { year, month, day } = EVENT_CONFIG.date;
  const { startHour, startMinute } = EVENT_CONFIG.time;

  // Convert CEST (UTC+2) to UTC by subtracting 2 hours
  const utcHour = startHour - 2;

  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}T${String(utcHour).padStart(2, '0')}${String(startMinute).padStart(2, '0')}00Z`;
};

/**
 * Returns ICS end time in UTC format
 * June 13, 2026 at 16:00 CEST (UTC+2) = 14:00 UTC
 * @returns UTC timestamp "20260613T140000Z"
 */
export const getICSEndTime = (): string => {
  const { year, month, day } = EVENT_CONFIG.date;
  const { endHour, endMinute } = EVENT_CONFIG.time;

  // Convert CEST (UTC+2) to UTC by subtracting 2 hours
  const utcHour = endHour - 2;

  return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}T${String(utcHour).padStart(2, '0')}${String(endMinute).padStart(2, '0')}00Z`;
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
