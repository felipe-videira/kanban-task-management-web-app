import React from 'react';
import { shallow } from 'enzyme';
import Option from '../src/components/Option';

const mockGameConfig =  {
  "name": "paper",
  "icon": "images/icon-paper.svg",
  "color": [
      "hsl(230, 89%, 62%)", 
      "hsl(230, 89%, 65%)"
  ]
};

const mockClickFn = jest.fn(name => {});

// name obrigatorio string
// icone obrigatorio caminho em string
// cor obrigatorio string ou array (gradiente)
// onclick obrigatorio callback que recebe o nome

// erro caso um dos 4 não seja passada
// certo quando os 4 forem passados
// icone não encontrado, erro 
// cor invalida, erro
// onclick com parametro errado, erro
// testar se onclick é chamado

describe('Option', () => {
  it('should render correctly with all props', () => {
    const component = shallow(<Option {...mockGameConfig} onClick={mockClickFn} />);
  
    expect(component).toMatchSnapshot();
  });

  it('should throw error if name is not present', () => {
    expect(() => shallow(<Option  onClick={mockClickFn} />)).toThrow();
  });

  it('should call click function', () => {
    const component = shallow(<Option {...mockGameConfig} onClick={mockClickFn} />);
  
    component.find('button').simulate('click');

    expect(mockClickFn).toHaveBeenCalled();
  });
});