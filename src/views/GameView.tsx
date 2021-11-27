import React, { ReactElement } from "react";
import AppBar from "../components/AppBar";
import RegularButton from "../components/Button";
import Flex from "../components/Flex";
import GameCard from "../components/GameCard";
import Spacing from "../components/Spacing";
import PlayModal from "../modals/PlayModal";

// interface Props {}

export default function GameView(): ReactElement {
  const [playModal, setPlayModal] = React.useState<boolean>(false);
  return (
    <>
      <AppBar route="/games" title="Games" />
      <Flex justifyContent="center" itemsFlex={0.65}>
        <GameCard id="2836363-567343525" status="created" staked={4352} created="7th November 2021" player1="melvinmanni.testnet" player2="bot" winner="Pending...">
          <Spacing marginTop="39px" marginBottom="15px">
            <Flex justifyContent="space-between" flex={0.3}>
              <RegularButton disabled>View Plays</RegularButton>
              <RegularButton onClick={() => setPlayModal(true)}>Play</RegularButton>
            </Flex>
          </Spacing>
        </GameCard>
      </Flex>
      <PlayModal play="rock" open={playModal} handleClose={() => setPlayModal(false)} />
    </>
  );
}
