import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Stack, Typography } from "@mui/material";

// import { NexusGenObjects } from '../../nexus-typegen';
import { GET_USER_BOARDS } from "./graph/board/queries";
import { GET_CARDS_BY_BOARD_ID } from "./graph/cards/queries";
import { Card as CardType } from "../entities/Card";
import Card from "./components/organisms/Card";

function App() {
  const { data: boardsData } = useQuery(GET_USER_BOARDS);

  const [userVotes, setUserVotes] = React.useState<number[]>([]);


  const { data: cardsData } = useQuery(GET_CARDS_BY_BOARD_ID, {
    variables: { boardId: 1 },
  });
  const cards = cardsData?.getCardsByBoardId || [];

  const boardId = 1;
  const boardVotesAllowed = 6;

  return (
    <>
      <h1>Vite + React</h1>
      { boardsData &&
        <ul>
          { boardsData.getBoardsByUserId.map((board: any) => (
            <li key={board.id}>
              <Stack direction='row'>
                <Typography variant='body1'>{board.id}</Typography>
                <Typography variant='body2'>{board.name}</Typography>
              </Stack>
            </li>
          ))}
        </ul>
      }
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          {/* { cards.map((card: NexusGenObjects['Card']) => ( */}
          { cards.map((card: CardType) => (
            <Card cardId={card.id} columnId={1} boardId={boardId} votes={card.votes} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4} />
    </>
  )
}

export default App;
