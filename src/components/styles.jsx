import styled, { css, keyframes } from "styled-components";
import SearchIcon from '../icons/search';
import ArrowRightIcon from '../icons/arrowRight';

export const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  padding: 5px;
  background: #38ccd4;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ hover }) =>
    hover &&
    css`
      width: 70%;
      padding-right: 15px;
      background-color: #455e94;
      -webkit-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
      @media (min-width: 768px) {
        width: 50%;
      }
    `}
`;

export const SearchInput = styled.input`
  position: absolute;
  top: 7px;
  left: 0;
  width: 100%;
  height: 35px;
  outline: 0;
  border: 0;
  font-size: 16px;
  color: #ddd;
  border-radius: 20px;
  background-color: transparent;
  line-height: 28px;
  padding: 0px 45px 0px 20px;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  display: ${(props) => (props.showSearchInput ? "block" : "none")};
`;

/** icons */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: #fff;
  z-index: 10;
  animation: ${fadeIn} 1s linear;
`;

export const IconMagnifyingGlass = styled(SearchIcon)`
  ${IconCommonCss}
`;

export const IconRightArrow = styled(ArrowRightIcon)`
  ${IconCommonCss}
  align-self: flex-end;
  cursor: pointer;
`;
