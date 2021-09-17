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
import BudgetNewItemForm from "./BudgetNewItemForm";


function createData(id, title, category, summ, date) {
    return {id, title, category, summ, date};
}

const rows = [
    createData("1", "Zakupy w Auchan", "Sklepy", 220, "11.09.2021"),
    createData("2", "Auto", 25.0, 51, 4.9),
    createData("3", "Auto", 16.0, 24, 6.0),
    createData("4", "Auto", 6.0, 24, 4.0),
    createData("5", "Auto", 16.0, 49, 3.9),
    createData("6", "Auto", 3.2, 87, 6.5),
    createData("7", "Auto", 9.0, 37, 4.3),
    createData("8", "Auto", 0.0, 94, 0.0),
    createData("9", "Auto", 26.0, 65, 7.0),
    createData("10", "Auto", 0.2, 98, 0.0),
    createData("11", "Auto", 0, 81, 2.0),
    createData("12", "Auto", 19.0, 9, 37.0),
    createData("13", "Auto", 18.0, 63, 4.0),
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

const headCells = [
    { id: "id", disablePadding: false, label: 'ID' },
    { id: 'title', disablePadding: false, label: 'Tytuł' },
    { id: 'category', disablePadding: false, label: 'Kategoria' },
    { id: 'summ', disablePadding: false, label: 'Suma' },
    { id: 'date', disablePadding: false, label: 'Data' },
];

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
                        Wydatki i przychody
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
        maxWidth: theme.spacing(162.5),
        display: "flex",
        margin: theme.spacing(4)
    },
    paper: {
        maxWidth: 1200,
        border: `2px solid ${theme.palette.success.main}`
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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                    <Typography style={{
                        textAlign: "right",
                        padding: "16px 16px 0 0"
                    }}
                    >
                        Zostało środków: 200
                    </Typography>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
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
                </Switch>
            </HashRouter>
        </div>
    )
}