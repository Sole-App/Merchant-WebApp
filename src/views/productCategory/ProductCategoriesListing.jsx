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
    listItems();
  }, []);

  const listItems = async () => {
    ProductCategoryService.List().then((response) => {
      setProductCategories(response.data);
    });
  };

  // useEffect(() => {
  //   currentPage !== page && setPage(currentPage)
  // }, [currentPage, page])

  const redirectToCreatePage = () => {
    history.push(`/productcategory/create`);
  };

  const handleEditItem = (item) => {
    history.push(`/productcategory/edit/${item.id}`);
  };

  const handleDeleteItem = (item) => {
    ProductCategoryService.Delete(item.id)
      .then((response) => {
        console.log(response);
        listItems();
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const fields = [
    {
      key: "name",
      label: "Name",
      _style: { width: "40%" },
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
    {
      key: "created_at",
      label: "Created Date",
      _style: { width: "20%" },
      sorter: true,
      filter: true,
    },
    {
      key: "edit_button",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "delete_button",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <CRow>
      <CCol xs={12} sm={12} md={8} lg={12} xl={12} xxl={12} className="p-0">
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
                created_at: (item, index) => {
                  return <td>{item.created_at}</td>;
                },
                edit_button: (item, index) => {
                  return (
                    <td>
                      <CButton
                        color="warning"
                        onClick={() => handleEditItem(item)}
                      >
                        <CIcon content={freeSet.cilPen} />
                      </CButton>
                    </td>
                  );
                },
                delete_button: (item, index) => {
                  return (
                    <td>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <CIcon content={freeSet.cilTrash} />
                      </CButton>
                    </td>
                  );
                },
              }}
              // onRowClick={(item) =>
              //   history.push(`/productcategory/edit/${item.id}`)
              // }
            ></CDataTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProductCategoriesListing;
