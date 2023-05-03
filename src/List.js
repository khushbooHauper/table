import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField } from '@material-ui/core';
import EditForm from './EditForm';
import { Pagination } from '@material-ui/lab';
import { editFormData } from './redux/formSlice';




export const List = () => {
    const mylist = useSelector((state) => state.form.list);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const [page, setPage] = useState(1);
    const [displayList, setDisplayList] = useState(mylist);
    const [filter, setFilter] = useState("");

    const ITEMS_PER_PAGE = 5;



    useEffect(() => {
        setDisplayList(mylist);
    }, [mylist]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(1);
    };



    const filteredList = displayList.filter((user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.address.toLowerCase().includes(filter.toLowerCase()) ||
        user.city.toLowerCase().includes(filter.toLowerCase()) ||
        user.state.toLowerCase().includes(filter.toLowerCase())

    );
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const handleEdit = (user) => {
        const index = displayList.indexOf(user);
        setEditMode(true);
        setFormData({ ...user, index: index });
    };

    const handleSave = (formData, updatedIndex) => {
        dispatch(editFormData({ index: updatedIndex, updatedData: formData }));
        setEditMode(false);
        setFormData(null);

        // Update filtered array with edited form data
        setDisplayList(prevData => {
            const updatedData = [...prevData];
            updatedData[updatedIndex] = formData;
            return updatedData;
        });
    };
    const handleCancel = () => {
        setEditMode(false);
        setDeleteMode(false);
        setFormData(null);
    };

    const handleDelete = (email) => {
        const userIndex = displayList.findIndex((user) => user.email === email);
        if (userIndex !== -1) {
            const updatedList = [...displayList];
            updatedList.splice(userIndex, 1);
            setDisplayList(updatedList);
        }
    };

    return (
        <>

            <input
                type="text"
                placeholder="Search..."
                value={filter}
                onChange={handleFilterChange}
                className='searchfilter'
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Bank</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>IFSC</TableCell>
                            <TableCell>education</TableCell>
                            <TableCell>experience</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredList.slice(startIndex, endIndex).map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.city}</TableCell>
                                <TableCell>{user.state}</TableCell>
                                <TableCell>{user.bank}</TableCell>
                                <TableCell>{user.accountNumber}</TableCell>
                                <TableCell>{user.ifsc}</TableCell>
                                <TableCell>
                                    {user.education?.map((edu, index) => (
                                        <div key={index}>
                                            <p>{edu.courseName}</p>
                                            <p>{edu.university}</p>
                                            <p>{edu.percentage}</p>
                                            <p>{edu.passingYear}</p>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {user.experience?.map((exp, index) => (
                                        <div key={index}>
                                            <p>{exp.company}</p>
                                            <p>{exp.designation}</p>
                                            <p>{exp.joiningDate}</p>
                                            <p>{exp.leavingDate}</p>
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(user.email)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {editMode && (
                    <Modal open={editMode} onClose={handleCancel}>
                        <EditForm formData={formData} onSave={(data) => handleSave(data, formData.index)} onCancel={handleCancel} />
                    </Modal>
                )}

            </TableContainer>
            <Pagination count={Math.ceil(mylist.length / ITEMS_PER_PAGE)} page={page} onChange={handleChangePage} color="secondary" />
        </>
    );
};
