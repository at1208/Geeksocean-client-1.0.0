
import styled from 'styled-components'

const Page = styled.button`
  background: ${props => props.theme.bg};
  color: ${props => props.theme.fontColor};
`

Page.defaultProps = {
  theme: {
    bg: 'white',
    fontColor: 'black'
  }
}

export default Page
