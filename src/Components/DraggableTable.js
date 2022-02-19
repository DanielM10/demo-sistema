import React, { useState, useCallback } from "react";
import TableRow from "./TableRow.js";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "./ArrayMove";
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

const data = [
    {
    icono : "MoveUpIcon",
      first: "123789",
      second: "CLIENTE X",
      third: "Calle ejemplo # 908123",
      fourth: "Factura"
    },
    {
        icono : "MoveUpIcon",
        first: "239048",
        second: "CLIENTE Y",
        third: "calle 1 # 908123",
        fourth: "Factura"
      },
      {
        icono : "MoveUpIcon",
        first: "3948025",
        second: "CLIENTE A",
        third: "av. Miguel Aleman",
        fourth: "traspaso"
      },
      {
        icono : "MoveUpIcon",
        first: "190283",
        second: "CLIENTE B",
        third: "Constitucion # 1823",
        fourth: "Factura"
      }
]
const MyTableWrapper = styled.div`
  padding: 10px;

  .fixed_header {
    width: 800px;
    table-layout: fixed;
    border-collapse: collapse;

    & > tbody {
      display: block;
      width: 807px;
      overflow: auto;
      height: 400px;
      cursor: grabbing;
      background: grey;
    }

    & > thead {
      background: yellow;
      color: black;

      & > tr {
        display: block;
        //width: 793px;
      }
    }

    & > thead th,
    & > tbody td {
      padding: 5px;
      text-align: left;
      width: 200px;
      border: 1px solid #000;
    }
  }
`;

const SortableCont = SortableContainer(({ children }) => {
  return <tbody>{children}</tbody>;
});

const SortableItem = SortableElement(props => <TableRow {...props} />);

const DraggableTable = () => {
  const [items, setItems] = useState(data);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
  }, []);

  return (
    <Paper>
    <MyTableWrapper>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <thead>
          <tr>
          <th>Orden</th>  
            <th>Factura</th>
            <th>Cliente</th>
            <th>Direccion</th>
            <th>Tipo Factura</th>
          </tr>
        </thead>
        <SortableCont
          onSortEnd={onSortEnd}
          axis="y"
          lockAxis="y"
          lockToContainerEdges={true}
          lockOffset={["30%", "50%"]}
          helperClass="helperContainerClass"
          useDragHandle={true}
        >
          {items.map((value, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              icono ={value.first}
              first={index+1}
              second={value.second}
              third={value.third}
              fourth={value.fourth}
            />
          ))}
        </SortableCont>
      </Table>
    </MyTableWrapper>
    </Paper>
  );
};

export default DraggableTable;
