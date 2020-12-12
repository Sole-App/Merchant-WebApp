import { HTTPService } from "./common";

const apiEndpoint = process.env.REACT_APP_MERCHANT_API_URL + "/ProductCategories";

async function List() {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint);
}

async function ListParent() {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + "/parent");
}

async function GetsByParentId(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + "/parent/" + encodeURIComponent(id));
}

async function Get(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.get(apiEndpoint + "/" + encodeURIComponent(id));
}

async function Create(data) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.post(apiEndpoint, data);
}

async function Edit(data) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.put(apiEndpoint + "/" + data.id, data);
}

async function Delete(id) {
  //HTTPService.addBearerAuthorization();
  return await HTTPService.delete(encodeURI(apiEndpoint + "/" + id));
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
