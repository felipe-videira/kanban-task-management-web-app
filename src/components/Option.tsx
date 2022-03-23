import{ InferProps } from "prop-types"
import checkFile from "../services/checkFile"
import customValidator from "../utils/customValidator"
import stringValidator from "../utils/stringValidator"

interface OnClick {
  (name: string): void;
}

function Option({ name, icon, onClick }: InferProps<typeof Option.propTypes>) {

  return (
    <button type="button" onClick={() => onClick(name)}>
      {name}
      <img src={icon} />
    </button>
  )
}

Option.propTypes = {
  name: stringValidator(true, 2),
  icon: customValidator<string>(((props: { [key: string]: any }, propName: string): Error | null => {
    if (!props[propName]) {
      return new Error(`The prop \`icon\` is marked as required in \`Option\`, but its value is \`${props[propName]}\``)
    } 
    if (typeof props[propName] !== 'string' ) {
      return new Error(`Invalid prop \`icon\` of type \`${typeof props[propName]}\` supplied to \`Option\`, expected \`string\``)
    } 
    if (!checkFile(props[propName])) {
      return new Error(`The prop \`icon\` requires a valid path to a image in \`Option\`, but its value is \`${props[propName]}\``)
    } 

    return null;
  })),
  onClick: customValidator<OnClick>(((props: { [key: string]: any }, propName: string): Error | null => {
    if (!props[propName]) {
      return new Error(`The prop \`onClick\` is marked as required in \`Option\`, but its value is \`${props[propName]}\``)
    } 

    return null;
  })),
}

export default Option
  