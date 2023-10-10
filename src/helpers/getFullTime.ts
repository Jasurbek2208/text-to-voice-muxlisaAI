export function getFullTime(): string {
  const currentTime = new Date()

  const hours = currentTime?.getHours()
  const minutes = currentTime?.getMinutes()

  const formattedHours = String(hours)?.padStart(2, '0')
  const formattedMinutes = String(minutes)?.padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}