import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import {usePaginatedQuery} from 'react-query'
import history from '../../../../history'

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "plan",
    headerName: "plan",
    type: "string",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 100,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("firstName") || ""} ${
        params.getValue("lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", status: "running", plan: 35 },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    status: "running",
    plan: 42,
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    status: "running",
    plan: 45,
  },
  { id: 4, lastName: "Stark", firstName: "Arya", status: "running", plan: 16 },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    status: "running",
    plan: null,
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Goe",
    status: "running",
    plan: 150,
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    status: "running",
    plan: 44,
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    status: "running",
    plan: 36,
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    status: "running",
    plan: 65,
  },
];

export default function Investment() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h1 className="text-3xl text-black mb-4 font-semibold">Investments</h1>
      <DataGrid
        onCellClick={(e)=>history.push(`/admin/details/${e.row.id}`)}
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight={true}
        autoPageSize={true}
        disableColumnMenu={true}
        paginationMode="server"
      />
    </div>
  );
}
