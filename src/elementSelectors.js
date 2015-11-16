import makeEventsSelector from './eventsSelector'

const validateSelectorString =
  (fn, selector) => {
    if (typeof selector !== `string`) {
      throw new Error(`DOM drivers ${fn}() expects first argument to` +
        `be a string as a CSS selector`)
    }
  }

const makeElementSelectorByTagName =
  rootElem$ =>
    selector => {
      validateSelectorString(`selectByTag`, selector)
      const element$ =
        rootElem$.map(
          rootElem => rootElem.getElementsByTagName(selector)
        )
      return {
        observable: element$,
        events: makeEventsSelector(element$),
      }
    }

const makeElementSelectorByClassName =
  rootElem$ =>
    selector => {
      validateSelectorString(`selectByClass`, selector)
      const element$ =
        rootElem$.map(
          rootElem => rootElem.getElementsByClassName(selector)
        )
      return {
        observable: element$,
        events: makeEventsSelector(element$),
      }
    }

const makeElementSelectorById =
  rootElem$ =>
    selector => {
      validateSelectorString(`selectById`, selector)
      const element$ =
        rootElem$.map(
          () => document.getElementsById(selector)
        )
      return {
        observable: element$,
        events: makeEventsSelector(element$),
      }
    }

const makeElementSelector =
  rootElem$ =>
    selector => {
      validateSelectorString(`select`, selector)
      const element$ =
        selector.trim() === `:root` ?
          rootElem$ :
          rootElem$.map(
            rootElem =>
              rootElem.querySelectorAll(selector)
          )
      return {
        observable: element$,
        events: makeEventsSelector(element$),
      }
    }

export {
  makeElementSelector,
  makeElementSelectorById,
  makeElementSelectorByClassName,
  makeElementSelectorByTagName
}
