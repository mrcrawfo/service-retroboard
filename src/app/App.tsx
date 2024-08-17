import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Stack, Typography } from "@mui/material";

import { GET_USER_BOARDS, GET_BOARD } from "./graph/board/queries";
import { BoardColumn as BoardColumnType } from "../entities/BoardColumn";
import { Card as CardType } from "../entities/Card";
import BoardColumn from "./components/organisms/BoardColumn";

function App() {
  const { data: boardsData } = useQuery(GET_USER_BOARDS);

  const [userVotes, setUserVotes] = React.useState<number[]>([]);

  const boardId = 1;
  const boardVotesAllowed = 6;

  const { data: boardData } = useQuery(GET_BOARD, {
    variables: { id: boardId },
  });
  const cards = boardData?.getBoard?.cards || [];
  const columns = boardData?.getBoard?.columns || [];

  const styles = {
    grid: {
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden',
    },
  };

  return (
    <>
      { boardsData &&
        <ul>
          { boardsData.getBoardsByUserId.map((board: any) => (
            <li key={board.id}>
              <Stack direction='row'>
                <Typography variant='body1'>{board.id} - {board.name}</Typography>
              </Stack>
            </li>
          ))}
        </ul>
      }
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={styles.grid}>
        { columns.map((column: BoardColumnType) => (
          <BoardColumn boardId={boardId} columnCount={columns?.length} columnId={column.id} key={column.id} columnName={column.name} cards={cards.filter((card: CardType) => card.columnId === column.id)} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} />
        ))}
      </Grid>
    </>
  )
}

export default App;
