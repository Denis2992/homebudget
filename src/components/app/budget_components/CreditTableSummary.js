import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import StorageIcon from '@material-ui/icons/Storage';
import {usersDataContext} from "../../../App";


function descendingComparator(a, b, orderBy) {
    const isNumber = !isNaN(a[orderBy]);
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

function stableSort(array =[], comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'creditTitle', disablePadding: false, label: 'Nazwa' },
    { id: 'leftSumm', disablePadding: false, label: 'Zostało do spłaty' },
    { id: 'monthlyPayment', disablePadding: false, label: 'Miesięczna rata' },
    { id: 'leftPayments', disablePadding: false, label: 'Zostało rat' },

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
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
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
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },

    titleToolbar: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.titleToolbar} variant="h6" id="tableTitle" component="div">
                Kredyty i pożyczki
            </Typography>
            <Link to="/app/budget/dataCredit/">
                <LightTooltip title="Zobacz szczegóły">
                    <IconButton>
                        <StorageIcon color="secondary" fontSize="large"/>
                    </IconButton>
                </LightTooltip>
            </Link>
        </Toolbar>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        border: `2px solid ${theme.palette.warning.light}`,

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



export default function CreditTableSummary() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const {currentUserData} = useContext(usersDataContext);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className={classes.paper} elevation={3}>
            <EnhancedTableToolbar />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={currentUserData?.credits?.length}
                    />
                    <TableBody>
                        {stableSort(currentUserData?.credits, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {

                                return (
                                    <TableRow
                                        hover
                                        key={row.id}
                                    >
                                        <TableCell>{row.creditTitle}</TableCell>
                                        <TableCell>{row.leftSumm}</TableCell>
                                        <TableCell>{row.monthlyPayment}</TableCell>
                                        <TableCell>{row.leftPayments}</TableCell>
                                    </TableRow>
                                );
                            })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={currentUserData?.credits?.length ? currentUserData?.credits?.length : 0}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Wierszy na stronie"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{marginBottom: 16}}
            />
        </Paper>
    );
}