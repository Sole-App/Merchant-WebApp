import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import { ProductCategoryService } from "../../services";
import { ConfirmationModal } from "../../components/commons";

const ProductCategoriesListing = () => {
  const [productCategories, setProductCategories] = useState([]);

  const [deletionModalTitle, setDeletionModalTitle] = useState("");
  const [deletionModalBody, setDeletionModalBody] = useState("");
  const [openDeletionModal, setOpenDeletionModal] = useState(false);
  const [currentDeleteItem, setCurrentDeleteItem] = useState({});

  const { t } = useTranslation();
  const history = useHistory();

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/productcategories?page=${newPage}`);
  };

  useEffect(() => {
    listItems();
  }, []);

  const listItems = async () => {
    ProductCategoryService.List().then((response) => {
      setProductCategories(response.data);
    });
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const redirectToCreatePage = () => {
    history.push(`/productcategory/create`);
  };

  const handleEditItem = (item) => {
    history.push(`/productcategory/edit/${item.id}`);
  };

  const handleDeleteItem = (item) => {
    setDeletionModalTitle(t("Delete Item"));
    setDeletionModalBody(
      t("Are you sure you want to delete?", { text: `${item.name}` })
    );
    setCurrentDeleteItem(item);
    setOpenDeletionModal(true);
  };

  const handleDeleteConfirm = (e) => {
    ProductCategoryService.Delete(currentDeleteItem.id)
      .then((response) => {
        listItems();
        setCurrentDeleteItem({});
        setOpenDeletionModal(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const handleDeleteCancel = (e) => {
    setCurrentDeleteItem({});
    setOpenDeletionModal(false);
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
    <div>
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
                    {t("Product Categories")}
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
                  <CButton
                    color="info"
                    onClick={redirectToCreatePage}
                    className="text-white"
                  >
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
                //tableFilter
                hover
                sorter
                itemsPerPage={50}
                activePage={page}
                pagination
                //clickableRows
                scopedSlots={{
                  name: (item, index) => {
                    return (
                      <td>
                        <Link to={`/productcategory/edit/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                    );
                  },
                  parent_category: (item, index) => {
                    if (item && item.parent_category) {
                      return (
                        <td>
                          <Link
                            to={`/productcategory/edit/${item.parent_category.id}`}
                          >
                            {item.parent_category.name}{" "}
                          </Link>{" "}
                        </td>
                      );
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
                          className="text-white"
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
              ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ConfirmationModal
        isOpen={openDeletionModal}
        title={deletionModalTitle}
        body={deletionModalBody}
        submitButtonText={t("DELETE")}
        cancelButtonText={t("CANCEL")}
        onSubmit={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default ProductCategoriesListing;
