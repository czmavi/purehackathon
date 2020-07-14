import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table, { Column } from './Table';
import { usersGetAction } from '../actions/users';
import { companiesGetAction } from '../actions/companies';
import { AppState } from '../reducers';
import { Dictionary, Page } from '../reducers/types';
import { User } from '../../../common/model/user';
import { Company } from '../../../common/model/company';

interface UsersProps {
  fetching: boolean
  pages: Dictionary<string, Page<User>>
  companies: Dictionary<string, Company>
  total: number | null
  usersGetAction: typeof usersGetAction
  companiesGetAction: typeof companiesGetAction
}

const getColumns = (companies: Dictionary<string, Company>): Column<User>[] => ([
  {
    heading: 'First name',
    propertyName: 'firstName',
  },
  {
    heading: 'Last name',
    propertyName: 'lastName',
  },
  {
    heading: 'Company Id',
    propertyName: 'companyId',
    formatter: (value) => (companies[value]?.name || value),
  },
  {
    heading: 'email',
    propertyName: 'email',
  },
  {
    heading: 'Last logged in',
    propertyName: 'lastLoggedIn',
    formatter: (value: string) => (new Date(value).toLocaleString()),
  },
  {
    heading: '',
    propertyName: '_id',
    formatter: (value) => (
      <Link component={RouterLink} to={`/user/${value}`}>
      Detail
    </Link>),
  }
]);

const Users: React.FC<UsersProps> = ({ fetching, pages, total, usersGetAction, companiesGetAction, companies }) => {
  useEffect(() => {
    companiesGetAction(0, 1000);
  }, [companiesGetAction]);

  return (
    <Table<User>
      fetching={fetching}
      columns={getColumns(companies)}
      pages={pages}
      total={total}
      getItemsAction={usersGetAction}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  fetching: state.users.fetching,
  pages: state.users.pages,
  total: state.users.total,
  companies: state.companies.items,
});

const mapDispatchToProps = {
  usersGetAction,
  companiesGetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
