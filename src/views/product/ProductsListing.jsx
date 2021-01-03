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
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

import { ProductService } from "../../services";

const ProductsListing = () => {
  const [products, setProducts] = useState([]);

  const history = useHistory();
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

  const redirectToCreatePage = () => {
    history.push(`/product/create`);
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol
                xs={10}
                sm={10}
                md={10}
                lg={10}
                xl={10}
                xxl={10}
                className="font-weight-bold align-middle"
              >
                <div className="font-weight-bold align-middle">Products</div>
              </CCol>
              <CCol
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="text-right pr-0"
              >
                <CButton color="info" onClick={redirectToCreatePage}>
                  <CIcon content={freeSet.cilPlus} />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={products}
              fields={["name"]}
              hover
              striped
              itemsPerPage={5}
              //activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/product/edit/${item.id}`)}
            ></CDataTable>

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
