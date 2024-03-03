import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { ProductData, SalesData } from '../types/productTypes';

// Define Props interface to type the props correctly
interface Props {
  product: ProductData;
}

export default function SalesTable({ product }: Props) {
  const [orderBy, setOrderBy] = useState('weekEnding');
  const [order, setOrder] = useState<any>('asc');

    const handleSort = (property: keyof SalesData) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }

    // Derived state for sorted data
    const sortedData = React.useMemo(() => {
      return [...product.sales].sort((a: any, b: any) => {
        let aValue = a[orderBy];
        let bValue = b[orderBy];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }, [product.sales, orderBy, order]);

  
  return (
    <TableContainer component={Paper} style={{ backgroundColor: 'white', marginTop: '40px'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{padding: '20px'}}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'weekEnding'}
                IconComponent={ArrowDownwardIcon}
                direction={orderBy === 'weekEnding' ? order : 'asc'}
                onClick={() => handleSort('weekEnding')}
              >
                WEEK ENDING
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'retailSales'}
                IconComponent={ArrowDownwardIcon}
                direction={orderBy === 'retailSales' ? order : 'asc'}
                onClick={() => handleSort('retailSales')}
              >
                RETAIL SALES
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'wholesaleSales'}
                IconComponent={ArrowDownwardIcon}
                direction={orderBy === 'wholesaleSales' ? order : 'asc'}
                onClick={() => handleSort('wholesaleSales')}
              >
                WHOLESALE SALES
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'unitsSold'}
                IconComponent={ArrowDownwardIcon}
                direction={orderBy === 'unitsSold' ? order : 'asc'}
                onClick={() => handleSort('unitsSold')}
              >
                UNITS SOLD
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'retailerMargin'}
                IconComponent={ArrowDownwardIcon}
                direction={orderBy === 'retailerMargin' ? order : 'asc'}
                onClick={() => handleSort('retailerMargin')}
              >
                RETAILER MARGIN
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((sale: any, index: number) => (
            <TableRow key={index}>
              <TableCell style={{ color: '#999' }}>{sale.weekEnding}</TableCell>
              <TableCell align="right" style={{ color: '#999' }}>${sale.retailSales.toFixed(2)}</TableCell>
              <TableCell align="right" style={{ color: '#999' }}>${sale.wholesaleSales.toFixed(2)}</TableCell>
              <TableCell align="right" style={{ color: '#999' }}>{sale.unitsSold}</TableCell>
              <TableCell align="right" style={{ color: '#999' }}>${sale.retailerMargin.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}