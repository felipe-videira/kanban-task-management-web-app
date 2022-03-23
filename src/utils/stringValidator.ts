import customValidator from "./customValidator"

export default function stringValidator(required: boolean, minLength?: number, maxLength?: number) {
  return customValidator<string>(((props: { [key: string]: any }, propName: string, componentName: string): Error | null => {
    if (required && !props[propName]) {
      return new Error(`The prop \`${propName}\` is marked as required in \`${componentName}\`,`+
        ` but its value is \`${props[propName]}\``)
    } 
    if (typeof props[propName] !== 'string' ) {
      return new Error(`Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied`+
        ` to \`${componentName}\`, expected \`string\``)
    } 
    if (minLength && props[propName].length < minLength) {
      return new Error(`Invalid prop \`${propName}\` with length \`${props[propName].length}\` supplied`+
        ` to \`${componentName}\`, expected at least \`${minLength}\` characters`)
    }
    if (maxLength && props[propName].length > maxLength) {
      return new Error(`Invalid prop \`${propName}\` with length \`${props[propName].length}\` supplied`+
        ` to \`${componentName}\`, expected a maximum of \`${maxLength}\` characters`)
    }

    return null
  }))
}