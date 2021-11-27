import styled from "styled-components";

interface textTypes {
  fontSize?: number;
  lineHeight?: string;
  textAlign?: "center" | "left" | "right";
  textAlignMd?: "center" | "left" | "right";
  textAlignSm?: "center" | "left" | "right";
  fontWeight?: number;
  color?: string;
  transform?: "uppercase" | "lowercase" | "capitalize";
  decoration?: string;
  display?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;
}

const Text = styled.p<textTypes>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "16px")};
  line-height: ${({ fontSize }) => (fontSize ? fontSize + 9 + "px" : "25px")};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  font-family: "Poppins";
  color: ${({ color }) => color || "#CACACA"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  margin-left: ${({ ml }) => ml};
  margin-bottom: ${({ mb }) => mb};
  margin-right: ${({ mr }) => mr};
  margin-top: ${({ mt }) => mt};
  text-transform: ${({ transform }) => transform};
  text-decoration: ${({ decoration }) => decoration};
  display: ${({ display }) => display};
  ${({ theme }) => theme.breakpoint.down("lg")} {
    font-size: ${({ fontSize }) => (fontSize ? fontSize - 2 + "px" : "14px")};
    line-height: ${({ fontSize }) => (fontSize ? fontSize + 7 + "px" : "21px")};
  }
  ${({ theme }) => theme.breakpoint.down("md")} {
    text-align: ${({ textAlignMd }) => textAlignMd};
  }
  ${({ theme }) => theme.breakpoint.down("sm")} {
    font-size: ${({ fontSize }) => (fontSize ? fontSize - 3 + "px" : "13px")};
    line-height: ${({ fontSize }) => (fontSize ? fontSize + 6 + "px" : "19px")};
    text-align: ${({ textAlignSm }) => textAlignSm};
  }
`;

export default Text;
