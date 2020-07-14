import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table, { Column } from './Table';
import { groupsGetAction } from '../actions/groups';
import { companiesGetAction } from '../actions/companies';
import { AppState } from '../reducers';
import { Dictionary, Page } from '../reducers/types';
import { Group } from '../../../common/model/group';
import { Company } from '../../../common/model/company';

interface GroupsProps {
  fetching: boolean
  pages: Dictionary<string, Page<Group>>
  companies: Dictionary<string, Company>;
  total: number | null
  groupsGetAction: typeof groupsGetAction
  companiesGetAction: typeof companiesGetAction
}

const getColumns = (companies: Dictionary<string, Company>): Column<Group>[] => ([
  {
    heading: 'Name',
    propertyName: 'name',
  },
  {
    heading: 'Company Id',
    propertyName: 'companyId',
    formatter: (value) => (companies[value]?.name || value),
  },
  {
    heading: '',
    propertyName: '_id',
    formatter: (value) => (
      <Link component={RouterLink} to={`/group/${value}`}>
        Detail
      </Link>),
  }
]);

const Groups: React.FC<GroupsProps> = ({ fetching, pages, total, groupsGetAction, companiesGetAction, companies }) => {
  useEffect(() => {
    companiesGetAction(0, 1000);
  }, [companiesGetAction]);

  return (
    <Table<Group>
      fetching={fetching}
      columns={getColumns(companies)}
      pages={pages}
      total={total}
      getItemsAction={groupsGetAction}
    />
  )
};

const mapStateToProps = (state: AppState) => ({
  fetching: state.groups.fetching,
  pages: state.groups.pages,
  total: state.groups.total,
  companies: state.companies.items,
});

const mapDispatchToProps = {
  groupsGetAction,
  companiesGetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
