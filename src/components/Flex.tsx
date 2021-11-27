import styled from "styled-components";

interface Props {
  background?: string;

  flexWrap?: boolean;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  // 996px
  alignItemsLg?: string;
  justifyContentLg?: string;
  flexDirectionLg?: string;
  //  768px
  alignItemsMd?: string;
  justifyContentMd?: string;
  flexDirectionMd?: string;
  // 567px
  alignItemsSm?: string;
  justifyContentSm?: string;
  flexDirectionSm?: string;
  // Child Flex
  itemsFlex?: number;
  itemsFlexLg?: number;
  itemsFlexMd?: number;
  itemsFlexSm?: number;
  // parent fles
  flex?: number;
  flexLg?: number;
  flexMd?: number;
  flexSm?: number;
}

const Flex = styled.div<Props>`
  /* width: 100%; */
  display: flex;
  background: ${({ background }) => background};
  flex-wrap: ${({ flexWrap }) => flexWrap && "wrap"};
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  flex: ${({ flex }) => flex};
  > *,
  > div {
    flex: ${({ itemsFlex }) => itemsFlex};
  }
  ${({ theme }) => theme.breakpoint.down("lg")} {
    flex-direction: ${({ flexDirectionLg }) => flexDirectionLg};
    justify-content: ${({ justifyContentLg }) => justifyContentLg};
    align-items: ${({ alignItemsLg }) => alignItemsLg};
    flex: ${({ flexLg }) => flexLg};
    > * {
      flex: ${({ itemsFlexLg }) => itemsFlexLg};
    }
  }
  ${({ theme }) => theme.breakpoint.down("md")} {
    flex-direction: ${({ flexDirectionMd }) => flexDirectionMd};
    justify-content: ${({ justifyContentMd }) => justifyContentMd};
    align-items: ${({ alignItemsMd }) => alignItemsMd};
    flex: ${({ flexMd }) => flexMd};
    > *,
    > div {
      flex: ${({ itemsFlexMd }) => itemsFlexMd};
    }
  }
  ${({ theme }) => theme.breakpoint.down("sm")} {
    flex-direction: ${({ flexDirectionSm }) => flexDirectionSm};
    justify-content: ${({ justifyContentSm }) => justifyContentSm};
    align-items: ${({ alignItemsSm }) => alignItemsSm};
    flex: ${({ flexSm }) => flexSm};
    > *,
    > div {
      flex: ${({ itemsFlexSm }) => itemsFlexSm};
    }
  }
`;

export default Flex;
