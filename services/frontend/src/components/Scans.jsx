import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = [
  {
    field: 'userid',
    headerName: 'User ID',
    valueGetter: (scan) => `${scan.row['device.user.userid']}`
  },
  {
    field: 'username',
    headerName: 'User Name',
    valueGetter: (scan) => `${scan.row['device.user.name']}`
  },
  {
    field: 'email',
    headerName: 'User Email',
    valueGetter: (scan) => `${scan.row['device.user.email']}`
  },
  {
    field: 'deviceid',
    headerName: 'Device ID',
    valueGetter: (scan) => `${scan.row['device.deviceid']}`
  },
  {
    field: 'devicename',
    headerName: 'Device Name',
    valueGetter: (scan) => `${scan.row['device.name']}`
  },
  {
    field: 'model',
    headerName: 'Device Model',
    valueGetter: (scan) => `${scan.row['device.model']}`
  },
  {
    field: 'scanid',
    headerName: 'Scan ID',
  },
  {
    field: 'osversion',
    headerName: 'OS Version',
  },
  {
    field: 'appversion',
    headerName: 'App Version',
  },
  {
    field: 'secure',
    headerName: 'Secure',
  },
  {
    field: 'threats',
    headerName: 'Threats',
  }
]

function Scans(props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        All Scans
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          rows={props.scans}
          columns={columns}
          getRowId={({scanid}) => scanid}
          slots={{toolbar: GridToolbar}}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default Scans;
