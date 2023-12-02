import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
  } from "@mui/material";
import { User } from "../../logic/interfaces";
import PaginationFooter from "./Pagination/PaginationFooter";
import UserRow from "./Row/UserRow";

const UsersTable = (props: {
  users: User[];
  page: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  fetchData: (pageParam: number, searchParam?: string) => void;
}) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nazwa użytkownika</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rola</TableCell>
            <TableCell>Działania</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user: User) => (
            <UserRow
              key={user.id}
              user={user}
            />
          ))}
        </TableBody>
        {props.totalPages > 0 && (
          <TableFooter>
            <PaginationFooter
              page={props.page}
              totalPages={props.totalPages}
              totalItems={props.totalItems}
              handlePageChange={props.handlePageChange}
            />
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default UsersTable;