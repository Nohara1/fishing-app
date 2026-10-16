const WEIGHTS = {
  temperature: 0.3,
  pressure: 0.25,
  speed: 0.2,
  clouds: 0.15,
  humidity: 0.05,
  moon: 0.05,
}
const SPEED = [
  { name: 'Отличные', value: 2, mark: 100 },
  { name: 'Хорошо', value: 4, mark: 75 },
  { name: 'Средне', value: 7, mark: 50 },
  { name: 'Плохо', value: 10, mark: 25 },
]
const PRESSURE = [
  { name: 'Отличные', value: 740, mark: 100 },
  { name: 'Хорошо', value: 750, mark: 75 },
  { name: 'Средне', value: 770, mark: 50 },
  { name: 'Плохо', value: Infinity, mark: 25 },
]
const TEMPERATURE = [
  { name: 'Плохо', value: 5, mark: 25 },
  { name: 'Средне', value: 12, mark: 50 },
  { name: 'Хорошо', value: 18, mark: 75 },
  { name: 'Отличные', value: 25, mark: 100 },
  { name: 'Плохо', value: Infinity, mark: 20 },
]
const HUMIDITY = [
  { name: 'Отличные', value: 70, mark: 100 },
  { name: 'Хорошо', value: 85, mark: 75 },
  { name: 'Средне', value: 95, mark: 50 },
  { name: 'Плохо', value: Infinity, mark: 25 },
]
const CLOUDS = [
  { name: 'Отличные', value: 50, mark: 100 },
  { name: 'Хорошо', value: 80, mark: 75 },
  { name: 'Средне', value: 100, mark: 50 },
  { name: 'Плохо', value: Infinity, mark: 25 },
]
const MOON = [
  { name: 'Отличные', value: 0.25, mark: 100 },
  { name: 'Хорошо', value: 0.75, mark: 66 },
  { name: 'Средне', value: Infinity, mark: 33 },
]

function getScore(conditions, value, weights) {
  if (value == null) return 0
  for (let i = 0; i < conditions.length; i++) {
    if (value <= conditions[i].value) {
      return conditions[i].mark * weights
    }
  }
  return 0
}
function conditions(score) {
  if (score >= 85) return 'Отличные'
  if (score >= 70) return 'Хорошие'
  if (score >= 50) return 'Средние'
  if (score >= 30) return 'Плохие'
  return 'Очень плохие'
}

export function calcBiteScore(weather) {
  const speed = getScore(SPEED, weather.speed, WEIGHTS.speed)
  const pressure = getScore(PRESSURE, weather.pressure, WEIGHTS.pressure)
  const temperature = getScore(TEMPERATURE, weather.temp, WEIGHTS.temperature)
  const humidity = getScore(HUMIDITY, weather.humidity, WEIGHTS.humidity)
  const clouds = getScore(CLOUDS, weather.clouds, WEIGHTS.clouds)
  const moon = Math.round(getScore(MOON, weather.moon.age, WEIGHTS.moon))
  const total = Math.round(speed + pressure + temperature + humidity + clouds + moon)
  const condition = conditions(total)

  return { total, condition, parts: { speed, pressure, temperature, humidity, clouds, moon } }
}
