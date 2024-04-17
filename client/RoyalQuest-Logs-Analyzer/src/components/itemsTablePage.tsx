import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'itemName', headerName: 'Item name', width: 500 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  {
    field: 'npcPrice',
    headerName: 'NPC`s price',
    width: 250,
  },
  {
    field: 'marketPrice',
    headerName: 'Market price',
    width: 250,
    editable: true,
  },
];

interface RowItem {
  id: number | string;
  itemName: string;
  amount: number | string;
  npcPrice: number | string;
  marketPrice: number | string;
}

interface DataItem {
  [key: string]: { amount: number };
}

const ItemsTable = () => {
  const { state }: { state: string } = useLocation();
  const [itemRows, setItemsRows] = useState<RowItem[]>([]);

  useEffect(() => {
    fetchData(state);
  }, [state]);

  const fetchData = async (fileName: string) => {
    try {
      const response: AxiosResponse = await axios(`http://localhost:3000/api/downloads/${fileName}`);
      if (response.status === 200) {
        createItemRows(response.data['Получено']);
      } else {
        console.log(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createItemRows = (responseData: DataItem) => {
    let i = 0;
    const rows: RowItem[] = [];
    for (const item in responseData) {
      const row: RowItem = { id: i++, itemName: item, amount: responseData[item].amount, npcPrice: 0, marketPrice: 0 };
      rows.push(row);
    }
    setItemsRows(rows);
  };

  return (
    <div>
      <DataGrid
        rows={itemRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 30]}
        sx={{
          '.MuiDataGrid-cell': {
            display: 'flex',
            alignItems: 'center',
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export { ItemsTable };
