import React from 'react';
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
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import SavingsNewItemForm from "./SavingsNewItemForm";


function createData(id, currentState, goal, leftSumm, forWhat) {
    return {id, currentState, goal, leftSumm, forWhat};
}

const rows = [
    createData("1", 4000, 10000, 6000, "wakacje"),
    createData("2", 4000, 10000, 6000, "wakacje"),
    createData("3", 4000, 10000, 6000, "wakacje"),
    createData("4", 4000, 10000, 6000, "wakacje"),
    createData("5", 4000, 10000, 6000, "wakacje"),
    createData("6", 4000, 10000, 6000, "wakacje"),
    createData("7", 4000, 10000, 6000, "wakacje"),
    createData("8", 4000, 10000, 6000, "wakacje"),
    createData("9", 4000, 10000, 6000, "wakacje"),
    createData("10", 4000, 10000, 6000, "wakacje"),
    createData("11", 4000, 10000, 6000, "wakacje"),
    createData("12", 4000, 10000, 6000, "wakacje"),
    createData("13", 4000, 10000, 6000, "wakacje"),
];

const headCells = [
    { id: 'currentState', label: 'Aktualny stan' },
    { id: 'goal', label: 'Cel' },
    { id: 'leftSumm', label: 'Zostało' },
    { id: 'forWhat', label: 'Na co' },

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
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
    const { numSelected } = props;

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
                    <LightTooltip title="Edytuj">
                        <EditIcon className={classes.editIcon} />
                    </LightTooltip>
                    <LightTooltip title="Usuń">
                        <IconButton aria-label="delete">
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
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
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


    return (
            <div className={classes.root}>
                <div>
                    <Paper className={classes.paper} elevation={3}>
                        <EnhancedTableToolbar numSelected={selected.length}/>
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
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
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
                                                        {row.currentState}
                                                    </TableCell>
                                                    <TableCell>{row.goal}</TableCell>
                                                    <TableCell>{row.leftSumm}</TableCell>
                                                    <TableCell>{row.forWhat}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage="Wierszy na stronie"
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
                <HashRouter>
                    <Switch>
                        <Route path="/app/budget/dataSavings/add/" component={SavingsNewItemForm}/>
                    </Switch>
                </HashRouter>
            </div>
    )
}