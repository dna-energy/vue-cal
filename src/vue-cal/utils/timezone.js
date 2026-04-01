/**
 * IANA timezone helpers (Luxon). Used when Vue Cal's `timeZone` prop is set.
 */

import { DateTime } from 'luxon'

/**
 * @param {string | undefined | null} zone
 * @returns {boolean}
 */
export function isValidTimeZone (zone) {
  if (!zone || typeof zone !== 'string' || !zone.trim()) return false
  return DateTime.now().setZone(zone.trim()).isValid
}

/**
 * @param {Date} date
 * @param {string} zone
 * @returns {import('luxon').DateTime}
 */
export function dtInZone (date, zone) {
  return DateTime.fromJSDate(date).setZone(zone)
}

/**
 * @param {Date} date
 * @param {string} zone
 * @returns {Date}
 */
export function startOfDayInZone (date, zone) {
  return dtInZone(date, zone).startOf('day').toJSDate()
}

/**
 * @param {Date} date
 * @param {string} zone
 * @returns {Date}
 */
export function endOfDayInZone (date, zone) {
  return dtInZone(date, zone).endOf('day').toJSDate()
}

/**
 * Minutes from start of that calendar day in `zone` (0–1440 near DST; typically 0–1439).
 *
 * @param {Date} date
 * @param {string} zone
 * @returns {number}
 */
export function dateToMinutesInZone (date, zone) {
  const dt = dtInZone(date, zone)
  return dt.hour * 60 + dt.minute + dt.second / 60
}

/**
 * @param {Date} date
 * @param {number} days
 * @param {string} zone
 * @returns {Date}
 */
export function addCalendarDaysInZone (date, days, zone) {
  return dtInZone(date, zone).plus({ days }).startOf('day').toJSDate()
}

/**
 * @param {Date} date
 * @param {number} days
 * @param {string} zone
 * @returns {Date}
 */
export function subtractCalendarDaysInZone (date, days, zone) {
  return dtInZone(date, zone).minus({ days }).startOf('day').toJSDate()
}

/**
 * Same logic as date.js getPreviousFirstDayOfWeek, in `zone`.
 *
 * @param {Date | null} date
 * @param {boolean} weekStartsOnSunday
 * @param {string} zone
 * @returns {Date}
 */
export function getPreviousFirstDayOfWeekInZone (date, weekStartsOnSunday, zone) {
  const dt = DateTime.fromJSDate(date || new Date()).setZone(zone).startOf('day')
  if (weekStartsOnSunday) {
    const daysBack = dt.weekday % 7
    return dt.minus({ days: daysBack }).toJSDate()
  }
  const daysBack = dt.weekday - 1
  return dt.minus({ days: daysBack }).toJSDate()
}

/**
 * Calendar Y-M-D parts in zone (month 1–12).
 *
 * @param {Date} date
 * @param {string} zone
 */
export function calendarYmdInZone (date, zone) {
  const dt = dtInZone(date, zone)
  return { year: dt.year, month: dt.month, day: dt.day }
}

/**
 * Create a Date at the start of a calendar day in `zone`.
 *
 * @param {number} year
 * @param {number} month 1–12
 * @param {number} day
 * @param {string} zone
 * @returns {Date}
 */
export function startOfDayFromPartsInZone (year, month, day, zone) {
  return DateTime.fromObject({ year, month, day, zone }).startOf('day').toJSDate()
}

/**
 * First of month in zone from a reference instant.
 *
 * @param {Date} date
 * @param {string} zone
 * @returns {Date}
 */
export function startOfMonthInZone (date, zone) {
  const dt = dtInZone(date, zone)
  return DateTime.fromObject({ year: dt.year, month: dt.month, day: 1, zone }).startOf('day').toJSDate()
}

/**
 * First day of year in zone.
 *
 * @param {Date} date
 * @param {string} zone
 * @returns {Date}
 */
export function startOfYearInZone (date, zone) {
  const dt = dtInZone(date, zone)
  return DateTime.fromObject({ year: dt.year, month: 1, day: 1, zone }).startOf('day').toJSDate()
}

/**
 * First day of January of the year block used in the "years" view (aligned to `cellsCount`).
 *
 * @param {Date} date
 * @param {number} cellsCount
 * @param {string} zone
 * @returns {Date}
 */
export function startOfYearsBlockInZone (date, cellsCount, zone) {
  const y = dtInZone(date, zone).year
  const aligned = y - (y % cellsCount)
  return DateTime.fromObject({ year: aligned, month: 1, day: 1, zone }).startOf('day').toJSDate()
}

/**
 * Last moment of the calendar month containing `date` in `zone`.
 *
 * @param {Date} date
 * @param {string} zone
 * @returns {Date}
 */
export function endOfMonthInZone (date, zone) {
  return dtInZone(date, zone).endOf('month').toJSDate()
}

/**
 * @param {Date} date
 * @param {number} incrementMonths
 * @param {string} zone
 * @returns {Date}
 */
export function addMonthsInZone (date, incrementMonths, zone) {
  return dtInZone(date, zone).plus({ months: incrementMonths }).startOf('day').toJSDate()
}

/**
 * @param {Date} date
 * @param {number} incrementYears
 * @param {string} zone
 * @returns {Date}
 */
export function addYearsInZone (date, incrementYears, zone) {
  return dtInZone(date, zone).plus({ years: incrementYears }).startOf('day').toJSDate()
}

/**
 * Same algorithm as date.js `getWeek`, using the calendar day of `date` in `zone`.
 *
 * @param {Date} date
 * @param {boolean} weekStartsOnSunday
 * @param {string} zone
 * @returns {number}
 */
export function getWeekInZone (date, weekStartsOnSunday, zone) {
  const dt = dtInZone(date, zone)
  const d = new Date(Date.UTC(dt.year, dt.month - 1, dt.day))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7) + (weekStartsOnSunday ? 1 : 0)
}

/**
 * @param {Date} d1
 * @param {Date} d2
 * @param {string} zone
 * @returns {boolean}
 */
export function isSameCalendarDateInZone (d1, d2, zone) {
  const a = dtInZone(d1, zone)
  const b = dtInZone(d2, zone)
  return a.year === b.year && a.month === b.month && a.day === b.day
}

/**
 * @param {string} zone
 * @param {Date} date
 * @returns {boolean}
 */
export function isTodayInZone (date, zone) {
  const d = dtInZone(date, zone)
  const n = DateTime.now().setZone(zone)
  return d.year === n.year && d.month === n.month && d.day === n.day
}

/**
 * Mirrors `countDays` in date.js: calendar days spanned (see that function’s docstring).
 *
 * @param {string | Date} start
 * @param {string | Date} end
 * @param {string} zone
 * @returns {number}
 */
export function countDaysInZone (start, end, zone) {
  let s = start
  let e = end
  if (typeof s === 'string') s = s.replace(/-/g, '/')
  if (typeof e === 'string') e = e.replace(/-/g, '/')
  const sdt = dtInZone(new Date(s), zone).startOf('day')
  const edt = dtInZone(new Date(e), zone).startOf('day').plus({ seconds: 1 })
  return Math.ceil(edt.diff(sdt, 'days').days)
}

/**
 * Build a Date from minutes since midnight on the same calendar day as `cellStart` in `zone`.
 *
 * @param {Date} cellStart start-of-day in zone for that cell
 * @param {number} minutes 0 .. 24*60
 * @param {string} zone
 * @returns {Date}
 */
export function dateFromDayAndMinutesInZone (cellStart, minutes, zone) {
  const base = dtInZone(cellStart, zone).startOf('day')
  return base.plus({ minutes }).toJSDate()
}
