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
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";

import { LocationService } from "../../services";

const LocationsListing = () => {
  const [locations, setLocations] = useState([]);
  const [openDeletionModal, setOpenDeletionModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    listItems();
  }, []);

  const listItems = async () => {
    LocationService.List()
      .then((response) => {
        setLocations(response.data);
      })
      .finally(() => {});
  };

  const redirectToCreatePage = () => {
    history.push(`/location/create`);
  };

  const handleEditItem = (item) => {
    history.push(`/location/edit/${item.id}`);
  };

  const handleDeleteItem = (item) => {
    setOpenDeletionModal(true);

    // LocationService.Delete(item.id)
    //   .then((response) => {
    //     listItems();
    //   })
    //   .catch((err) => {})
    //   .finally(() => {});
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
      key: "email",
      label: "Email",
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
                  <div className="font-weight-bold align-middle">Locations</div>
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
                itemsPerPage={20}
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
                      return (
                        <td>
                          <a href={``}>{item.email}</a>
                        </td>
                      );
                    }

                    return <td></td>;
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
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <Modal
        isOpen={openDeletionModal}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LocationsListing;
