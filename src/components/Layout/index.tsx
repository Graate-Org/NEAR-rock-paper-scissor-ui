import React, { ReactElement } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Main = styled.div`
  padding: 22px 40px;
  width: 100%;
`;

export default function Layout({ children }: Props): ReactElement {
  return (
    <Wrapper>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Main>{children}</Main>
      </div>
    </Wrapper>
  );
}
