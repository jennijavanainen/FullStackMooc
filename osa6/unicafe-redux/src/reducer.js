const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  all: 0,
  average: 0,
  positive: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const posChanged = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad,
        all: state.all + 1
      }
      return {
        good: posChanged.good,
        ok: posChanged.ok,
        bad: posChanged.bad,
        all: posChanged.all,
        average: (posChanged.good - posChanged.bad) / posChanged.all,
        positive: posChanged.good / posChanged.all * 100
      }
    case 'OK':
      const okChanged = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad,
        all: state.all + 1,
      }
      return {
        good: okChanged.good,
        ok: okChanged.ok,
        bad: okChanged.bad,
        all: okChanged.all,
        average: (okChanged.good - okChanged.bad) / okChanged.all,
        positive: okChanged.good / okChanged.all * 100
      }
    case 'BAD':
      const negChanged = {
        good: state.good,
        ok: state.ok,
        bad: state.bad +1,
        all: state.all + 1,
      }
      return {
        good: negChanged.good,
        ok: negChanged.ok,
        bad: negChanged.bad,
        all: negChanged.all,
        average: (negChanged.good - negChanged.bad) / negChanged.all,
        positive: negChanged.good / negChanged.all * 100
      }
    case 'RESET':
      return {
        good: 0,
        ok: 0,
        bad: 0,
        all: 0,
        average: 0,
        positive: 0
      }
    default: return state
  }
  
}

export default counterReducer