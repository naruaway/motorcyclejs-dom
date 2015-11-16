import {empty} from 'most'
import fromEvent from './fromEvent'

const makeEventsSelector =
  element$ =>
    (eventName, useCapture = false) => {
      if (typeof eventName !== `string`) {
        throw new Error(`DOM drivers events() expects argument to be a ` +
          `string representing the event type to listen for.`)
      }
      return element$
        .map(elements => {
          if (!elements) {
            return empty()
          }
          return fromEvent(eventName, elements, useCapture)
        }).switch().multicast()
    }

export default makeEventsSelector
