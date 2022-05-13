import { useDispatch } from "react-redux";
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    //dispatch(setFilter(event.target.value))
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10,
    marginTop:10
  }

  return (
    <div style={style}>
      filter <input onChange={ handleChange } />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (value) => {
      dispatch(setFilter(value))
    },
  }
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter