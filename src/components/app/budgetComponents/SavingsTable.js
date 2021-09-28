import React, {createContext, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import {HashRouter, Link, Route, Switch, useHistory} from "react-router-dom";
import SavingsNewItemForm from "./SavingsNewItemForm";
import {usersApiUrl, usersDataContext} from "../../../App";
import {Grid} from "@material-ui/core";

export const newSavingDataContext = createContext("");

const headCells = [
    { id: 'name', label: 'Nazwa' },
    { id: 'currentState', label: 'Aktualny stan' },
    { id: 'goal', label: 'Cel' },
    { id: 'leftSumm', label: 'Zostało' },


];

function descendingComparator(a, b, orderBy) {
    const isNumber = !isNaN(a[orderBy])
    let first = isNumber ? +a[orderBy] : a[orderBy];
    let second = isNumber ? +b[orderBy] : b[orderBy];
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
                        Oszczędności
                    </Typography>
                </>

            )}

            {numSelected > 0 ? (
                <>
                    {numSelected > 1 ? (
                        <IconButton disabled>
                            <EditIcon />
                        </IconButton>
                    ) : (
                        <LightTooltip title="Edytuj">
                            <IconButton aria-label="edit">
                                <EditIcon className={classes.editIcon} onClick={onEditItem}/>
                            </IconButton>
                        </LightTooltip>
                    )}
                    <LightTooltip title="Usuń">
                        <IconButton aria-label="delete" onClick={onDeleteItem}>
                            <DeleteIcon color="error"/>
                        </IconButton>
                    </LightTooltip>
                </>
            ) : (
                <Link to="/app/budget/dataSavings/add/">
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
        maxWidth: theme.spacing(162.5),
        display: "flex",
        margin: theme.spacing(4)
    },
    paper: {
        maxWidth: 1200,
        border: `2px solid ${theme.palette.info.main}`,

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

export default function BudgetTableFull() {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editMode, setEditMode] = useState(false);
    const [newSavingData, setNewSavingData] = useState({
        id: "",
        name: "",
        currentState: "",
        goal: "",
        leftSum: ""

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
            const newSelecteds = currentUserData.savings.map((n) => n.id);
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
            savings: currentUserData.savings.filter(item => !selected.includes(item.id))
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
        const singleData = currentUserData.savings.filter(item => item.id === selected[0]);

        setNewSavingData({
            id:singleData[0].id,
            name: singleData[0].name,
            currentState: singleData[0].currentState,
            goal: singleData[0].goal,
            leftSum: singleData[0].leftSum
        });
        setEditMode(true);
        history.push(`/app/budget/dataSavings/edit/${selected[0]}`)
    };

    if (currentUserData) {
        return (
            <newSavingDataContext.Provider value={{
                setSelected,
                editMode,
                setEditMode,
                newSavingData,
                setNewSavingData
            }}>
                <Grid container spacing={3} style={{justifyContent: "center", marginLeft: 54}}>
                    <Grid item xs={9} sm={10} md={12}>
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
                                        rowCount={currentUserData?.savings?.length}
                                    />
                                    <TableBody>
                                        {stableSort(currentUserData?.savings, getComparator(order, orderBy))
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
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>{row.currentState}</TableCell>
                                                        <TableCell>{row.goal}</TableCell>
                                                        <TableCell>{row.leftSum}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                component="div"
                                count={currentUserData?.savings?.length}
                                rowsPerPage={rowsPerPage}
                                labelRowsPerPage="Wierszy na stronie"
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <HashRouter>
                    <Switch>
                        <Route path="/app/budget/dataSavings/add/" component={SavingsNewItemForm}/>
                        <Route path="/app/budget/dataSavings/edit/" component={SavingsNewItemForm}/>
                    </Switch>
                </HashRouter>
            </newSavingDataContext.Provider>
        )
    } else {
        return <Typography>Loading...</Typography>
    }
}