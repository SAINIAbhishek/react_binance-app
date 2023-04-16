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
  overflow: hidden;
  height: 60px;
  padding-left: 100%;
  box-sizing: content-box;
  
  .ticker_content {
    display: inline-flex;
    line-height: 60px;
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;
    animation-name: ${animation};
    animation-duration: 30s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  
  .ticker_item {
    display: inline-flex;
    padding: 0 20px;
    font-size: 28px;
    color: #EA4C89;
    text-transform: capitalize;
    font-weight: 600;
  }
  
`
