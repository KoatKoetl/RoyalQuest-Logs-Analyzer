import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Item name', width: 500 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  {
    field: 'NPCPrice',
    headerName: 'NPC`s price',
    width: 250,
  },
  {
    field: 'marketPrice',
    headerName: 'Market price',
    width: 250,
    editable: true,
  },
  {
    field: 'rarity',
    headerName: 'Rarity',
    width: 250,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 250,
    editable: true,
  },
];

interface receivedItem {
  _id: string;
  name: string;
  type: string;
  rarity: string;
  rarityColor: string;
  marketPrice: number;
  NPCPrice: number;
  amount: number;
}
interface rowsItem {
  id: number;
  name: string;
  amount: number;
  NPCPrice: number;
  marketPrice: number;
  rarity: string;
  type: string;
}

const ItemsTable = () => {
  const { state }: { state: string } = useLocation();
  const [itemRows, setItemsRows] = useState<rowsItem[]>([]);

  useEffect(() => {
    fetchData(state);
  }, [state]);

  const fetchData = async (fileName: string) => {
    try {
      const response: AxiosResponse = await axios(`http://localhost:3000/api/collectionitems/${fileName}`);
      if (response.status === 200) {
        createItemRows(response.data);
      } else {
        console.log(`${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createItemRows = (responseData: receivedItem[]) => {
    const rows: rowsItem[] = [];
    responseData.forEach((item, index) => {
      const row: rowsItem = {
        id: index,
        name: item.name,
        amount: item.amount,
        NPCPrice: item.NPCPrice,
        marketPrice: item.marketPrice,
        rarity: item.rarity,
        type: item.type,
      };
      rows.push(row);
    });
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
