import { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Food } from "../../../logic/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import { deleteFood } from "../../../logic/food";
import EditFoodModal from "../../ModalComponents/Edit/EditFoodModal";

const FoodRow = (props: {
    food: Food;
}) => {
    const confirm = useConfirm();
    const [hide, setHide] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editedFood, setEditedFood] = useState<Food>(props.food);

    const handleDelete = async () => {
        confirm({ description: "Are you sure you want to delete this food?" })
            .then(async () => {
                const status = await deleteFood(props.food.id);
                if (status === 204) {
                    enqueueSnackbar("Food deleted!", { variant: "success" });
                    setHide(true);
                } else {
                    enqueueSnackbar("Something went wrong!", { variant: "error" });
                }
            })
            .catch(() => {
                enqueueSnackbar("Food not deleted!", { variant: "info" });
            });
    };

    const editFood = (food: Food) => {
        setEditedFood(food);
    };

    const handleCloseEditModal = () => {
        setEdit(false);
    };

    return (
        <>
            {!hide && (
                <TableRow
                    key={editedFood.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell>
                        {editedFood.name}
                    </TableCell>
                    <TableCell>
                        {editedFood.quantity + editedFood.unit}
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => setEdit(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )}
            {edit && (
                <EditFoodModal
                    open={edit}
                    handleClose={handleCloseEditModal}
                    food={editedFood}
                    updateFood={editFood}
                />
            )}
        </>
    );
};

export default FoodRow;