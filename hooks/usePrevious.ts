import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T): { previous: T | undefined, current: T } => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return {
    previous: ref.current,
    current: value,
  }
}
