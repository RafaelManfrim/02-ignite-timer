import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 8rem);
  margin: 4rem auto;
  padding: 2rem;

  background: ${({ theme }) => theme.colors['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
