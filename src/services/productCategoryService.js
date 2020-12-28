import { HTTPService } from "./common";

const apiEndpoint = process.env.REACT_APP_MERCHANT_API_URL + "/ProductCategories/";
const clientId = process.env.REACT_APP_CLIENT

async function List() {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + clientId);
}

async function ListParent() {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + clientId + "/parent/");
}

async function GetsByParentId(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + clientId + "/parent/" + encodeURIComponent(id));
}

async function Get(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + clientId + "/" + encodeURIComponent(id));
}

async function Create(data) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.post(apiEndpoint + clientId, data);
}

async function Edit(data) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.put(apiEndpoint + clientId + "/" + data.id, data);
}

async function Delete(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.delete(encodeURI(apiEndpoint + clientId + "/" + id));
}

export default {
  List,
  ListParent,
  Get,
  GetsByParentId,
  Create,
  Edit,
  Delete,
};
