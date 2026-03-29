import styled from "styled-components";
import {withKeyboardNav} from "../../../src/withKeyboardNav";
import {useState} from "react/index";


const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 250px;
`

const Option = styled.li`
  padding: 10px 16px;
  cursor: pointer;
  
  &[data-active="true"] {
    background: #e3f2fd;
    outline: 2px solid #1976d2;
    outline-offset: -2px;
  }
  
  &:hover {
    background: #f5f5f5;
  }
`

const KeyboardListbox = withKeyboardNav(List, {
    pattern: 'listbox',
    orientation: 'vertical',
    loop: false,
})

function CountryPicker() {
    const [selected, setSelected] = useState<number | null>(null)

    return (
        <KeyboardListbox
            role="listbox"
            aria-label="Select a country"
            onActivate={(index) => setSelected(index)}
        >
            <Option role="option" aria-selected={selected === 0}>United States</Option>
            <Option role="option" aria-selected={selected === 1}>Canada</Option>
            <Option role="option" aria-selected={selected === 2}>Mexico</Option>
            <Option role="option" aria-selected={selected === 3}>Brazil</Option>
            <Option role="option" aria-selected={selected === 4}>Argentina</Option>
        </KeyboardListbox>
    )
}