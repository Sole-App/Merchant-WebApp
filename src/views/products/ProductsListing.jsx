import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
} from "@coreui/react";

import { ProductService } from "../../services";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);

  const history = useHistory()
  // const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  // const [page, setPage] = useState(currentPage)

  // const pageChange = newPage => {
  //   currentPage !== newPage && history.push(`/users?page=${newPage}`)
  // }

  useEffect(() => {
    ProductService.List().then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  // useEffect(() => {
  //   currentPage !== page && setPage(currentPage)
  // }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>Products</CCardHeader>
          <CCardBody>
            <CDataTable
              items={products}
              fields={[                
                "name",                
              ]}
              hover
              striped
              itemsPerPage={5}
              //activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/product/${item.id}`)}
            />

            {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductsListing;
