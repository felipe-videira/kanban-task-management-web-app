import PropTypes, { InferProps } from "prop-types"

function Option({ name }: InferProps<typeof Option.propTypes>) {

  return (
    <div>
      {name}
    </div>
  )
}

Option.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Option
  