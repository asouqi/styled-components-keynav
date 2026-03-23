import styled from "styled-components"
import { useState } from "react"

const LogoMark = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LogoName = styled.h1`
  font-family: ${({theme}) => theme.sans};
  letter-spacing: -0.03em;
  color: ${({theme}) => theme.ink};
`;

const LogoSub = styled.span`
  font-family: ${({theme}) => theme.mono};
  font-size: 10px;
  color: ${({theme}) => theme.muted};
  letter-spacing: 0.08em;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavLabel = styled.span`
  font-family: ${({theme}) => theme.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  color: ${({theme}) => theme.muted};
  text-transform: uppercase;
  padding: 0 8px;
  margin-bottom: 8px;
  display: block;
`;

const NavItem = styled.a<{ $active?: boolean }>`
  font-family: ${({theme}) => theme.sans};
  font-size: 13px;
  font-weight: ${({$active}) => ($active ? '600' : '400')};
  color: ${({theme, $active}) => ($active ? theme.accent : theme.ink)};
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({theme, $active}) => ($active ? theme.accentDim : 'transparent')};
  transition: background 0.1s, color 0.1s;

  &:hover {
    background: ${({theme}) => theme.accentDim};
    color: ${({theme}) => theme.accent};
  }

  &:focus-visible {
    outline: 2px solid ${(theme) => theme.theme.accent};
    outline-offset: 2px;
  }
`;

const KbdBadge = styled.span`
  font-family: ${({theme}) => theme.mono};
  font-size: 10px;
  background: ${({theme}) => theme.border};
  border-radius: 3px;
  padding: 1px 5px;
  color: ${({theme}) => theme.muted};
`;


const Container = styled.aside`
  border-right: 1px solid ${(theme) => theme.theme.border};
  padding: 48px 32px;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const Sidebar = () => {
    const sections = [
        { label: 'Menu', kbd: '↑↓', id: 'menu' },
        { label: 'Tabs', kbd: '←→', id: 'tabs' },
        { label: 'Focus Trap', kbd: 'Tab', id: 'focus-trap' },
    ]
    const [activeSection, setActiveSection] = useState('menu')

    return <Container>
        <LogoMark>
            <LogoName>styled-components-keynav</LogoName>
            <LogoSub>v0.1.0 · examples</LogoSub>
        </LogoMark>

        <NavList>
            <NavLabel>Primitives</NavLabel>
            {sections.map(s => (
                <NavItem
                    key={s.id}
                    href={`#${s.id}`}
                    $active={activeSection === s.id}
                    onClick={() => setActiveSection(s.id)}
                >
                    {s.label}
                    <KbdBadge>{s.kbd}</KbdBadge>
                </NavItem>
            ))}
        </NavList>
    </Container>
}
