import styled from "styled-components"

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${t.border};
`

export const SectionEyebrow = styled.span`
  font-family: ${t.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  color: ${t.accent};
  text-transform: uppercase;
`

export const SectionTitle = styled.h2`
  font-family: ${t.sans};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${t.ink};
`

export const SectionDesc = styled.p`
  font-family: ${t.sans};
  font-size: 14px;
  color: ${t.muted};
  line-height: 1.6;
  max-width: 480px;
`

export const Mono = styled.code`
  font-family: ${t.mono};
  font-size: 12px;
  color: ${t.accent};
`

export const DemoRow = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${p => p.$cols === 1 ? '1fr' : '1fr 1fr'};
  gap: 24px;
  align-items: start;
`

export const DemoBox = styled.div`
  background: white;
  border: 1px solid ${t.border};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DemoBoxLabel = styled.span`
  font-family: ${t.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  color: ${t.muted};
  text-transform: uppercase;
`

export const CodeBlock = styled.pre`
  background: ${t.ink};
  color: #e8e6e0;
  font-family: ${t.mono};
  font-size: 12px;
  line-height: 1.7;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  white-space: pre;
`

export const HintRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`

export const Hint = styled.span`
  font-family: ${t.mono};
  font-size: 11px;
  color: ${t.muted};
  display: flex;
  align-items: center;
  gap: 4px;

  kbd {
    background: ${t.ink};
    color: ${t.paper};
    border-radius: 3px;
    padding: 1px 6px;
    font-family: ${t.mono};
    font-size: 10px;
  }
`
