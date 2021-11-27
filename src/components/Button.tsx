import styled from "styled-components";

interface Props {
  stretch?: boolean;
  fullWidth?: boolean;
  color?: "#fff";
  background?: "#7F88A9" | "#10DCE9";
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

const RegularButton = styled.button<Props>`
  height: ${({ stretch }) => stretch && "100%"};
  background: ${({ background }) => background || "#7F88A9"};
  box-shadow: 0px 1.5px 2px 1px rgba(245, 245, 245, 0.2);
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  margin-left: ${({ ml }) => ml};
  margin-bottom: ${({ mb }) => mb};
  margin-right: ${({ mr }) => mr};
  margin-top: ${({ mt }) => mt};
  min-width: ${({ fullWidth }) => (fullWidth ? "100%" : "240px")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color || "#fff"};
  padding: 15px 20px;
  ${({ theme }) => theme.breakpoint.down("lg")} {
    font-size: 16px;
    min-width: ${({ fullWidth }) => (fullWidth ? "100%" : "200px")};
  }
  ${({ theme }) => theme.breakpoint.down("sm")} {
    font-size: 14px;
    min-width: ${({ fullWidth }) => (fullWidth ? "100%" : "180px")};
  }
  :disabled {
    background: #e5e5e5;
    color: #c4c4c4;
    cursor: not-allowed;
  }
`;

export default RegularButton;
