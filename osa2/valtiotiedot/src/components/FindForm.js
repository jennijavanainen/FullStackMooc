const FindForm = (props) => {
    return (
        <form>
            <div>
                find countries <input
                    value={props.filter}
                    onChange={props.handleFilterChange}
                />
            </div>
        </form>
    )
}

export default FindForm