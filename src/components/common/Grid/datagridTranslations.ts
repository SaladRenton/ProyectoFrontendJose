import { useIntl } from 'react-intl';

const useDatagridTranslations = () => {
  const intl = useIntl();

  return {
    noRowsLabel: intl.formatMessage({ id: 'DATAGRID.NO_ROWS_LABEL' }),
    columnMenuLabel: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_LABEL' }),
    columnMenuShowColumns: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_SHOW_COLUMNS' }),
    columnMenuFilter: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_FILTER' }),
    columnMenuHideColumn: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_HIDE_COLUMN' }),
    columnMenuUnsort: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_UNSORT' }),
    columnMenuSortAsc: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_SORT_ASC' }),
    columnMenuSortDesc: intl.formatMessage({ id: 'DATAGRID.COLUMN_MENU_SORT_DESC' }),
    toolbarExport: intl.formatMessage({ id: 'DATAGRID.TOOLBAR_EXPORT' }),
    toolbarExportCSV: intl.formatMessage({ id: 'DATAGRID.TOOLBAR_EXPORT_CSV' }),
    toolbarExportPrint: intl.formatMessage({ id: 'DATAGRID.TOOLBAR_EXPORT_PRINT' }),
    // Agrega cualquier otra traducción que necesites
  };
};

export default useDatagridTranslations;
