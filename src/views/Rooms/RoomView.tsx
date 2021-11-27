import React, { ReactElement } from "react";
import styled from "styled-components";
import AppBar from "../../components/AppBar";
import RegularButton from "../../components/Button";
import Flex from "../../components/Flex";
import GameCard, { gameProps } from "../../components/GameCard";
import Spacing from "../../components/Spacing";
import Text from "../../components/Text";
import { GameCardGrid } from "../Games";

// interface Props {}

const games: gameProps[] = [
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "created",
    staked: 3425,
  },
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "concluded",
    staked: 3425,
  },
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "created",
    staked: 3425,
  },
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "concluded",
    staked: 3425,
  },
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "created",
    staked: 3425,
  },
  {
    id: "2836363-567343525",
    created: "7th November 2021",
    status: "started",
    staked: 3425,
  },
];

const CardWrapper = styled.div`
  background-color: #1e2131;
  border-radius: 8px;
  position: relative;
  padding: 26px 20px 46px 20px;
`;

const RoomTab = styled.div`
  margin: 10px auto;
  display: flex;
  border-radius: 8px;
  background: #7f88a9;
  border: 0.1px solid #f2f2f221;
`;

const TabBtn = styled(RegularButton)<{ activeTab: boolean }>`
  padding: 15px;
  min-width: unset;
  box-shadow: unset;
  border: 0;
  background: ${({ activeTab }) => (activeTab ? "#1e2131" : "#7f88a9")};
  color: ${({ activeTab }) => (activeTab ? "#fff" : "#2e36509e")};
`;

const MemberList = (props: { members: string[] }): ReactElement => (
  <>
    {props.members.map((val) => (
      <Text fontSize={16} mb="10px" textAlign="center" fontWeight={500}>
        {val}
      </Text>
    ))}
  </>
);

const GamesList = (props: { games: gameProps[] }): ReactElement => (
  <>
    {props.games.length > 0 ? (
      <GameCardGrid>
        {props.games.map((val) => (
          <GameCard created={val.created} staked={val.staked} status={val.status} route={val.route} id={val.id} />
        ))}
      </GameCardGrid>
    ) : (
      <Text textAlign="center">No Games Yet</Text>
    )}
  </>
);

export default function RoomView(): ReactElement {
  const [activeTab, setActiveTab] = React.useState<"games" | "members">("games");
  return (
    <>
      <AppBar route="/rooms" title="Rooms" />
      <Flex justifyContent="center" itemsFlex={0.6}>
        <CardWrapper style={{ paddingBottom: 26 }}>
          <Text mb="30px" textAlign="center" fontWeight={600} fontSize={24}>
            room-567343525
          </Text>

          <Text mb="10px" textAlign="center">
            Created: 10th June 2020
          </Text>
          <Text mb="10px" textAlign="center">
            Created By: melvinmanni09.testnet
          </Text>
          <Text textAlign="center">
            Privacy: PRIVATE
          </Text>

          <Flex justifyContent="center">
            <RegularButton mt="15px">JOIN ROOM</RegularButton>
          </Flex>
        </CardWrapper>
      </Flex>

      <Spacing marginTop="68px" marginBottom="20px">
        <Flex justifyContent="center">
          <RoomTab>
            <TabBtn onClick={() => setActiveTab("games")} activeTab={activeTab === "games"}>
              Games
            </TabBtn>
            <TabBtn onClick={() => setActiveTab("members")} activeTab={activeTab === "members"}>
              Members
            </TabBtn>
          </RoomTab>
        </Flex>
      </Spacing>
      <Flex justifyContent="center" itemsFlex={0.9}>
        <CardWrapper>
          <Flex style={{ minHeight: 350 }} flexDirection="column" alignItems="center" justifyContent="center">
            {activeTab === "members" && <MemberList members={["Ikeh Akinyemi", "Fortune Ikechi", "Melvin Kosisochukwu"]} />}
            {activeTab === "games" && <GamesList games={games} />}
          </Flex>
        </CardWrapper>
      </Flex>
    </>
  );
}
