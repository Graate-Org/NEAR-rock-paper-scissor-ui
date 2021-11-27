import styled from "styled-components";

interface hideProps {
  hideXs?: boolean;
  hideLg?: boolean;
  hideMd?: boolean;
  hideSm?: boolean;
  hideXl?: boolean;
}

export const HideDown = styled.div<hideProps>`
  ${({ theme }) => theme.breakpoint.down("xs")} {
    display: ${({ hideXs }) => hideXs && "none"};
  }
  ${({ theme }) => theme.breakpoint.down("sm")} {
    display: ${({ hideSm }) => hideSm && "none"};
  }
  ${({ theme }) => theme.breakpoint.down("md")} {
    display: ${({ hideMd }) => hideMd && "none"};
  }
  ${({ theme }) => theme.breakpoint.down("lg")} {
    display: ${({ hideLg }) => hideLg && "none"};
  }
  ${({ theme }) => theme.breakpoint.down("xl")} {
    display: ${({ hideXl }) => hideXl && "none"};
  }
`;

export const HideUp = styled.div<hideProps>`
  ${({ theme }) => theme.breakpoint.up("xs")} {
    display: ${({ hideXs }) => hideXs && "none"};
  }
  ${({ theme }) => theme.breakpoint.up("sm")} {
    display: ${({ hideSm }) => hideSm && "none"};
  }
  ${({ theme }) => theme.breakpoint.up("md")} {
    display: ${({ hideMd }) => hideMd && "none"};
  }
  ${({ theme }) => theme.breakpoint.up("lg")} {
    display: ${({ hideLg }) => hideLg && "none"};
  }
  ${({ theme }) => theme.breakpoint.up("xl")} {
    display: ${({ hideXl }) => hideXl && "none"};
  }
`;
