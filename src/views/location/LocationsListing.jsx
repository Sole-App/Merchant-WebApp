import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import { useTranslation } from "react-i18next";
import ReactHtmlParser from "react-html-parser";

import { ConfirmationModal, LoadingSpinner } from "../../components/commons";
import { LocationService } from "../../services";

const LocationsListing = () => {
  const [locations, setLocations] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentDeleteItem, setCurrentDeleteItem] = useState({});

  const [deletionModalTitle, setDeletionModalTitle] = useState("");
  const [deletionModalBody, setDeletionModalBody] = useState("");
  const [openDeletionModal, setOpenDeletionModal] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    listItems();
  }, []);

  const listItems = async () => {
    setLoading(true);
    LocationService.List()
      .then((response) => {
        setLocations(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const redirectToCreatePage = () => {
    history.push(`/location/create`);
  };

  const handleEditItem = (e, item) => {
    e.preventDefault();

    history.push(`/location/edit/${item.id}`);
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();

    if (currentDeleteItem) {
      LocationService.Delete(currentDeleteItem.id)
        .then((response) => {
          listItems();
        })
        .catch((err) => {})
        .finally(() => {});
    }
  };

  const handleDeleteItem = (e, item) => {
    e.preventDefault();

    setDeletionModalTitle(t("Delete Item"));
    setDeletionModalBody(
      ReactHtmlParser(
        t("Are you sure you want to delete the item?", {
          text: `<BR /><BR/>${item.name}`,
        })
      )
    );

    setCurrentDeleteItem(item);
    setOpenDeletionModal(true);
    setOpenDeletionModal(true);
  };

  const handleCancelDeletionItem = (e) => {
    e.preventDefault();

    setDeletionModalTitle("");
    setDeletionModalBody("");
    setOpenDeletionModal(false);
  };

  const fields = [
    {
      key: "name",
      label: "Name",
      _style: { width: "30%" },
      sorter: true,
      filter: true,
    },
    {
      key: "email",
      label: "Email",
      _style: { width: "40%" },
      sorter: true,
      filter: true,
    },
    {
      key: "actions",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div>
      <CRow>
        <CCol xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className="p-0">
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
                    {t("Locations")}
                  </div>
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
                items={locations}
                fields={fields}
                columnFilter
                //tableFilter
                hover
                striped
                sorter
                itemsPerPage={50}
                pagination
                scopedSlots={{
                  name: (item, index) => {
                    return (
                      <td>
                        <Link to={`/location/edit/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                    );
                  },
                  email: (item, index) => {
                    if (item && item.email) {
                      return <td>{item.email}</td>;
                    }

                    return <td></td>;
                  },
                  actions: (item, index) => {
                    return (
                      <td>
                        <div className="text-center">
                          <CButton
                            color="warning"
                            className="text-white mr-2"
                            onClick={(e) => handleEditItem(e, item)}
                          >
                            <CIcon content={freeSet.cilPen} />
                          </CButton>
                          <CButton
                            color="danger"
                            onClick={(e) => handleDeleteItem(e, item)}
                          >
                            <CIcon content={freeSet.cilTrash} />
                          </CButton>
                        </div>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
          <ConfirmationModal
            className=""
            isOpen={openDeletionModal}
            title={deletionModalTitle}
            body={deletionModalBody}
            submitButtonText={t("Delete")}
            cancelButtonText={t("Cancel")}
            onSubmit={handleDeleteConfirm}
            onCancel={handleCancelDeletionItem}
          />
        </CCol>
      </CRow>
      <LoadingSpinner show={loading} text={t("Loading")} />
    </div>
  );
};

export default LocationsListing;
