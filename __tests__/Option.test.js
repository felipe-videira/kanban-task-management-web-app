import React from 'react'
import { shallow } from 'enzyme'
import Option from '../src/components/Option'
import checkFile from '../src/services/checkFile'

const mockGameConfig =  {
  "name": "paper",
  "icon": "images/icon-paper.svg",
  "color": [
      "hsl(230, 89%, 62%)", 
      "hsl(230, 89%, 65%)"
  ]
}
const mockClickFn = jest.fn(name => {})
const mockInvalidPath = 'invalid/path'

jest.mock('../src/services/checkFile')

checkFile.mockImplementation((value) => value !== mockInvalidPath)

// cor obrigatorio string ou array (gradiente)
// cor invalida, erro

// onclick obrigatorio callback que recebe o nome
// onclick com parametro errado, erro
// testar se onclick é chamado


describe('Option', () => {
  it('should render correctly with all props', () => {
    const component = shallow(<Option {...mockGameConfig} onClick={mockClickFn} />)
  
    expect(component).toMatchSnapshot()
  })

  it('should throw error if prop "name" is not present', () => {
    expect(() => shallow(<Option {...mockGameConfig} name={undefined} onClick={mockClickFn} />)).toThrow()
  })
  
  it('should throw error if prop "name" is not a string', () => {
    expect(() => shallow(<Option {...mockGameConfig} name={1} onClick={mockClickFn} />)).toThrow()
  })

  it('should throw error if prop "icon" is not present', () => {
    expect(() => shallow(<Option {...mockGameConfig} icon={undefined} onClick={mockClickFn} />)).toThrow()
  })

  it('should throw error if prop "icon" is not a string', () => {
    expect(() => shallow(<Option {...mockGameConfig} icon={1} onClick={mockClickFn} />)).toThrow()
  })

  it('should throw error if prop "icon" is not valid', () => {
    expect(() => shallow(<Option {...mockGameConfig} icon={mockInvalidPath} onClick={mockClickFn} />)).toThrow()
  })
  
  it('should call click function', () => {
    const component = shallow(<Option {...mockGameConfig} onClick={mockClickFn} />)
  
    component.find('button').simulate('click')

    expect(mockClickFn).toHaveBeenCalled()
  })
})