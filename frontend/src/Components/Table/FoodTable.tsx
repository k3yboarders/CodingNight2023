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
import { Food } from "../../logic/interfaces";
import PaginationFooter from "./Pagination/PaginationFooter";
import FoodRow from "./Row/FoodRow";

const FoodTable = (props: {
    food: Food[];
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
                        <TableCell>Nazwa</TableCell>
                        <TableCell>Ilość</TableCell>
                        <TableCell>Działania</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.food.map((food: Food) => (
                        <FoodRow key={food.id} food={food} />
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

export default FoodTable;