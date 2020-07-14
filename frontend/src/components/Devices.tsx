import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Table, { Column } from './Table';
import { devicesGetAction } from '../actions/devices';
import { groupsGetAction } from '../actions/groups';
import { companiesGetAction } from '../actions/companies';
import { AppState } from '../reducers';
import { Dictionary, Page } from '../reducers/types';
import { Device } from '../../../common/model/device';
import { Group } from '../../../common/model/group';
import { Company } from '../../../common/model/company';

interface DevicesProps {
  fetching: boolean
  pages: Dictionary<string, Page<Device>>
  groups: Dictionary<string, Group>
  companies: Dictionary<string, Company>
  total: number | null
  devicesGetAction: typeof devicesGetAction
  groupsGetAction: typeof groupsGetAction
  companiesGetAction: typeof companiesGetAction
}

const getColumns = (groups: Dictionary<string, Group>, companies: Dictionary<string, Company>): Array<Column<Device>> => ([
  {
    heading: 'ID',
    propertyName: 'deviceId',
  },
  {
    heading: 'Company Id',
    propertyName: 'companyId',
    formatter: (value) => (companies[value]?.name || value),
  },
  {
    heading: 'Group Id',
    propertyName: 'groupId',
    formatter: (value) => (
      <Link component={RouterLink} to={`/group/${value}`}>
        {groups[value]?.name || 'Detail'}
      </Link>),
  },
  {
    heading: 'Last updated',
    propertyName: 'lastUpdated',
    formatter: (value: string) => (new Date(value).toLocaleString()),
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
      <Link component={RouterLink} to={`/device/${value}`}>
        Detail
      </Link>),
  }
]);

const Devices: React.FC<DevicesProps> = ({ fetching, pages, total, devicesGetAction, groups, groupsGetAction, companiesGetAction, companies }) => {
  const columns = getColumns(groups, companies);
  useEffect(() => {
    groupsGetAction(0, 1000);
    companiesGetAction(0, 1000);
  }, [groupsGetAction]);
  return (
    <Table<Device>
      fetching={fetching}
      columns={columns}
      pages={pages}
      total={total}
      getItemsAction={devicesGetAction}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  fetching: state.devices.fetching,
  pages: state.devices.pages,
  total: state.devices.total,
  groups: state.groups.items,
  companies: state.companies.items,
});

const mapDispatchToProps = {
  devicesGetAction,
  groupsGetAction,
  companiesGetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
