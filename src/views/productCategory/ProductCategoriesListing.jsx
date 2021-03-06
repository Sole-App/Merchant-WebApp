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
import { ProductCategoryService } from "../../services";

const ProductCategoriesListing = () => {
  const [productCategories, setProductCategories] = useState([]);

  const history = useHistory();
  // const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  // const [page, setPage] = useState(currentPage)

  // const pageChange = newPage => {
  //   currentPage !== newPage && history.push(`/users?page=${newPage}`)
  // }

  useEffect(() => {
    ProductCategoryService.List().then((response) => {
      setProductCategories(response.data);
      //console.log(response.data);
    });
  }, []);

  // useEffect(() => {
  //   currentPage !== page && setPage(currentPage)
  // }, [currentPage, page])

  const redirectToCreatePage = () => {
    history.push(`/productcategory/create`);
  };

  const fields = [
    {
      key: "name",
      label: "Name",
      _style: { width: "50%" },
      sorter: true,
      filter: true,
    },
    {
      key: "parent_category",
      label: "Parent",
      _style: { width: "30%" },
      sorter: true,
      filter: true,
    },
  ];

  return (
    <CRow>
      <CCol xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
                <div className="font-weight-bold align-middle">
                  Product Categories
                </div>
              </CCol>
              <CCol
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                className="text-right"
              >
                <CButton color="info" onClick={redirectToCreatePage}>
                  <CIcon content={freeSet.cilPlus} />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={productCategories}
              fields={fields}
              columnFilter
              tableFilter
              hover
              sorter
              itemsPerPage={50}
              //activePage={page}
              //clickableRows
              scopedSlots={{
                parent_category: (item, index) => {
                  if (item && item.parent_category) {
                    return <td>{item.parent_category.name} </td>;
                  }

                  return <td></td>;
                },
              }}
              onRowClick={(item) =>
                history.push(`/productcategory/edit/${item.id}`)
              }
            ></CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductCategoriesListing;
