import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = [
  {
    field: 'userid',
    headerName: 'User ID'
  },
  {
    field: 'name',
    headerName: 'User Name'
  },
  {
    field: 'email',
    headerName: 'User Email',
  }
]

function Users(props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        All Users
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          rows={props.users}
          columns={columns}
          getRowId={({userid}) => userid}
          slots={{toolbar: GridToolbar}}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default Users;
