import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = [
  {
    field: 'deviceid',
    headerName: 'Device ID'
  },
  {
    field: 'name',
    headerName: 'Device Name'
  },
  {
    field: 'model',
    headerName: 'Device Model',
  },
  {
    field: 'userid',
    headerName: 'User ID',
    valueGetter: (device) => `${device.row['user.userid']}`
  },
  {
    field: 'name',
    headerName: 'User Name',
    valueGetter: (device) => `${device.row['user.name']}`
  },
  {
    field: 'email',
    headerName: 'User Email',
    valueGetter: (device) => `${device.row['user.email']}`
  }
]

function Devices(props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        All Devices
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          rows={props.devices}
          columns={columns}
          getRowId={({deviceid}) => deviceid}
          slots={{toolbar: GridToolbar}}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default Devices;
