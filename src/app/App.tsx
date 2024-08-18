import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";

import { GET_USER_BOARDS, GET_BOARD } from "./graph/board/queries";
import { BoardColumn as BoardColumnType } from "../entities/BoardColumn";
import { Card as CardType } from "../entities/Card";
import BoardColumn from "./components/organisms/BoardColumn";

function App() {
  // const { data: boardsData } = useQuery(GET_USER_BOARDS);

  const [userVotes, setUserVotes] = React.useState<number[]>([]);

  useEffect(() => {
    console.log('userVotes');
    console.log(userVotes);
  }, [userVotes]);

  const boardId = 1;
  const boardVotesAllowed = 6;

  const { data: boardData } = useQuery(GET_BOARD, {
    variables: { id: boardId },
  });
  const cards = boardData?.getBoard?.cards || [];
  const columns = boardData?.getBoard?.columns || [];

  const [editingCard, setEditingCard] = useState<boolean>(false);

  const styles = {
    grid: {
        width: '100vw',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
    },
  };

  return (
    <>
      {/* { boardsData &&
        <ul>
          { boardsData.getBoardsByUserId.map((board: any) => (
            <li key={board.id}>
              <Stack direction='row'>
                <Typography variant='body1'>{board.id} - {board.name}</Typography>
              </Stack>
            </li>
          ))}
        </ul>
      } */}
      <div style={{ height: '80px' }} /> {/* Placeholder for Header/Controls component */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={styles.grid}>
        { columns.map((column: BoardColumnType) => (
          <BoardColumn boardId={boardId} columnCount={columns?.length} columnId={column.id} key={column.id} columnName={column.name} cards={cards.filter((card: CardType) => card.columnId === column.id)} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} editingCard={editingCard} setEditingCard={setEditingCard} />
        ))}
      </Grid>
    </>
  )
}

export default App;
