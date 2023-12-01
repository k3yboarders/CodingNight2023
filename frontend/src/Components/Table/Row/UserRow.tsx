import { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { User } from "../../../logic/interfaces";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";
import { deleteUser } from "../../../logic/users";
import EditUserModal from "../../ModalComponents/Edit/EditUserModal";
import { rolePrettyName } from "../../../logic/utils";

const UserRow = (props: {
    user: User;
}) => {
    const confirm = useConfirm();
    const [hide, setHide] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(props.user);

    const handleDelete = async () => {
        if (props.user === null) return;
        confirm({ description: "Are you sure you want to delete this user?" })
            .then(async () => {
                const status = await deleteUser(props.user.id);
                if (status === 204) {
                    enqueueSnackbar("User deleted!", { variant: "success" });
                    setHide(true);
                } else {
                    enqueueSnackbar("Something went wrong!", { variant: "error" });
                }
            })
            .catch(() => {
                enqueueSnackbar("User not deleted!", { variant: "info" });
            });
    };
    const editUser = (user: User) => {
        setEditedUser(user);
    };


    const handleCloseEditModal = () => {
        setEdit(false);
    };

    return (
        <>
            {!hide && (
                <TableRow
                    key={editedUser.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell>
                        {editedUser.username}
                    </TableCell>
                    <TableCell>
                        {editedUser.email}
                    </TableCell>
                    <TableCell>
                        {rolePrettyName(editedUser.type)}
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
                <EditUserModal
                    open={edit}
                    handleClose={handleCloseEditModal}
                    user={editedUser}
                    updateUser={editUser}
                />
            )}
        </>
    );
};

export default UserRow;