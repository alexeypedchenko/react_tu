import React, { useMemo } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import ru from 'date-fns/locale/ru'
registerLocale('ru', ru)
import 'react-datepicker/dist/react-datepicker.css'
import { getCountDays } from '../../../utils/functions'

const Datepicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const days = useMemo(() => {
    if (startDate && endDate) {
      return getCountDays(startDate, endDate)
    }
    return null
  }, [startDate, endDate])

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <div style={{ width: 180 }}>
        <DatePicker
          dateFormat="MM/dd/yyyy"
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          locale="ru"
          monthsShown={2}
          minDate={new Date()}
        />
      </div>
      {days && <div>{days} дней</div>}
    </div>
  )
}

Datepicker.defaultProps = {
  startDate: new Date(),
  endDate: null,
  setStartDate: () => { },
  setEndDate: () => { },
}

export default Datepicker