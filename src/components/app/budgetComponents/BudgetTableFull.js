import React, {createContext, useContext, useEffect, useState} from "react";
import {Checkbox, Paper, TableBody, TableCell, TableRow, Typography, TableContainer, Table} from "@material-ui/core"
import {usersApiUrl, usersDataContext} from "../../../App";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import {lighten, makeStyles, withStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import {HashRouter, Link, Route, Switch, useHistory} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";
import TablePagination from "@material-ui/core/TablePagination";
import BudgetNewItemForm from "./BudgetNewItemForm";

export const newDataItemContext = createContext("");

function descendingComparator(a, b, orderBy) {
    const isNumber = !isNaN(a[orderBy]);
    let first = isNumber ? +a[orderBy] : a[orderBy];
    let second = isNumber ? +b[orderBy] : b[orderBy];
    // if (orderBy === "date") {
    //     first = new Date()
    // }

    if (second < first) {
        return -1;
    }
    if (second > first) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array = [], comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const headCells = [
    { id: "id", label: 'ID' },
    { id: 'title', label: 'Tytuł' },
    { id: 'category', label: 'Kategoria' },
    { id: 'summ', label: 'Suma' },
    { id: 'date', label: 'Data' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}

                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                borderTopRightRadius: 18,
                borderTopLeftRadius: 18
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    titleToolbar: {
        flex: '1 1 100%',
    },
    returnBtn: {
        transform: "rotate(180deg)",
        color: theme.palette.secondary.main
    },
    addBtn: {
        color: theme.palette.success.main
    },
    editIcon: {
        color: theme.palette.warning.dark
    }
}));

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, onDeleteItem, onEditItem } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.titleToolbar}
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} wybrano
                </Typography>
            ) : (
                <>
                    <Link to="/app/budget/">
                        <LightTooltip title="Wróć">
                            <IconButton>
                                <PlayCircleFilledIcon fontSize="large" className={classes.returnBtn}/>
                            </IconButton>
                        </LightTooltip>
                    </Link>
                    <Typography className={classes.titleToolbar} variant="h6" id="tableTitle" component="div">
                        Wydatki i przychody
                    </Typography>
                </>

            )}

            {numSelected > 0 ? (
                <>
                    {numSelected > 1 ? (
                        <>
                            <IconButton disabled>
                                <EditIcon />
                            </IconButton>
                            <IconButton disabled>
                                <DeleteIcon />
                            </IconButton>
                        </>

                    ) : (
                        <>
                            <LightTooltip title="Edytuj">
                                <IconButton aria-label="edit">
                                    <EditIcon className={classes.editIcon} onClick={onEditItem}/>
                                </IconButton>
                            </LightTooltip>
                            <LightTooltip title="Usuń">
                                <IconButton aria-label="delete" onClick={onDeleteItem}>
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            </LightTooltip>
                        </>
                    )}
                </>
            ) : (
                <Link to="/app/budget/dataBudget/add/">
                    <LightTooltip title="Dodaj nowy wpis">
                        <IconButton>
                            <AddCircleIcon fontSize="large" className={classes.addBtn}/>
                        </IconButton>
                    </LightTooltip>
                </Link>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: theme.spacing(172.5),
        display: "flex",
        margin: theme.spacing(4)
    },
    paper: {
        width: "100%",
        border: `2px solid ${theme.palette.success.main}`,

    },
    table: {

    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function BudgetTableFull () {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editMode, setEditMode] = useState(false)
    const [newItemData, setNewItemData] = useState({
        id: "",
        title: "",
        category: "",
        date: "",
        summ: "",
    });
    const {currentUserData, setUsersData, usersData} = useContext(usersDataContext);
    const history = useHistory();

    useEffect(() => {
        fetch(usersApiUrl)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setUsersData(data);
            })
            .catch(err => console.log("Błąd!", err));
    }, [setUsersData, usersData]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = currentUserData.budget.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleDeleteItem = () => {
        const dataToSend = {
            budget: currentUserData.budget.filter(item => item.id !== selected[0])
        };

        fetch(`${usersApiUrl}/${currentUserData.id}`, {
            method: "PATCH",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd")
                }
            })
            .catch((err) => console.log("Błąd", err));

        setSelected([]);

        fetch(usersApiUrl)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error("Błąd sieci!");
                }
            })
            .then((data) => {
                setUsersData(data);
            })
            .catch(err => console.log("Błąd!", err));
    };

    const handleEditItem = () => {
       const singleData = currentUserData.budget.filter(item => item.id === selected[0]);

        setNewItemData({
            id: singleData[0].id,
            title: singleData[0].title,
            category: singleData[0].category,
            date: singleData[0].date,
            summ: singleData[0].summ,
        });
        setEditMode(true);
        history.push(`/app/budget/dataBudget/edit/${selected[0]}`)
    };


    if (currentUserData){
        return (
            <newDataItemContext.Provider
                value= {{
                    newItemData,
                    setNewItemData,
                    editMode,
                    setEditMode,
                    setSelected
                }}
            >
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={3}>
                    <EnhancedTableToolbar
                        numSelected={selected.length}
                        onDeleteItem={handleDeleteItem}
                        onEditItem={handleEditItem}
                    />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={currentUserData?.budget?.length}
                            />
                            <TableBody>
                                {stableSort(currentUserData?.budget, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{'aria-labelledby': labelId}}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.category}</TableCell>
                                                <TableCell>{row.summ}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={currentUserData?.budget?.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage="Wierszy na stronie"
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <HashRouter>
                    <Switch>
                        <Route path="/app/budget/dataBudget/add/" component={BudgetNewItemForm}/>
                        <Route path="/app/budget/dataBudget/edit/" component={BudgetNewItemForm}/>

                    </Switch>
                </HashRouter>
            </div>
            </newDataItemContext.Provider>
        );
    } else {
        return <Typography>Loading</Typography>
    }

}