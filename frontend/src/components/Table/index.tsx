import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { Dictionary, Page } from '../../reducers/types';
import PaginationActions from './PaginationActions';

interface GenericProps<T> {
  columns: Array<Column<T>>;
  fetching: boolean;
  pages: Dictionary<string, Page<T>>;
  total: number | null;
  getItemsAction(page: number, size: number): void;
}

export interface Column<T> {
  align?: 'right' | 'inherit' | 'left' | 'center' | 'justify';
  heading: string;
  propertyName: keyof T;
  formatter?(val: any): any;
}

const rowCount = 20;

class GenericTable<T> extends React.Component<GenericProps<T>> {
  public state = {
    currentPage: 0,
  };

  public componentDidMount() {
    const { getItemsAction } = this.props;
    const { currentPage } = this.state;
    getItemsAction(currentPage, rowCount);
  }

  public handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
    const { getItemsAction, pages } = this.props;

    this.setState({
      currentPage: page,
    });
    if (!pages[page]) {
      getItemsAction(page, rowCount);
    }
  }

  public render() {
    const { columns, fetching, pages, total } = this.props;
    const { currentPage } = this.state;

    const page = pages[0];

    if (fetching) {
      return (
        <Typography variant="h4" component="h1" color="secondary" gutterBottom>
          Fetching data...
        </Typography>
      );
    }

    if (!page || !page.items || page.items.length === 0) {
      return (
        <Typography variant="h4" component="h1" color="secondary" gutterBottom>
          No data available...
        </Typography>
      );
    }

    return <Table size="medium">
      <TableHead>
        <TableRow>
          {columns.map(({ align, heading }) => (
            <TableCell key={heading} align={align}>{heading}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {page.items.map((row: any) => (
          <TableRow key={row._id}>
            {columns.map(({ align, heading, formatter, propertyName }) => (
              <TableCell key={heading} align={align} scope="row">
                {formatter ? formatter(row[propertyName]) : row[propertyName]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={columns.length}
            count={total || 0}
            rowsPerPage={rowCount}
            rowsPerPageOptions={[]}
            page={currentPage}
            onChangePage={this.handleChangePage}
            ActionsComponent={PaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>;
  }
}

export default GenericTable;
