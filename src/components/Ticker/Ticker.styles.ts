import styled, {keyframes} from "styled-components";

const animation = keyframes`
    0% {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  
    100% {
      transform: translate3d(-100%, 0, 0);
    }
`

export const TickerWrapper = styled.div`
  display: inline-block;
  height: 4rem;
  line-height: 4rem;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
  animation-name: ${animation};
  animation-duration: 70s;
  animation-iteration-count: infinite;
`
