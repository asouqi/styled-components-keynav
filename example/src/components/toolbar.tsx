import {withKeyboardNav} from "../../../src/withKeyboardNav";
import styled from "styled-components";

const Toolbar = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #f5f5f5;
`;

const ToolButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  
  &:focus-visible {
    outline: 2px solid blue;
  }
  
  &[data-active='true'] {
    background: #e3f2fd;
  }
`;

const KeyboardToolbar = withKeyboardNav(Toolbar, {
    pattern: 'menu',
    orientation: 'horizontal',
    loop: true,
});

export function EditorToolbar() {
    return (
        <KeyboardToolbar role="toolbar">
            <ToolButton>Bold</ToolButton>
            <ToolButton>Italic</ToolButton>
            <ToolButton>Underline</ToolButton>
            <ToolButton>Link</ToolButton>
        </KeyboardToolbar>
    );
}
