import { HTTPService } from "./common";

const apiEndpoint = process.env.REACT_APP_MERCHANT_API_URL + "/ProductCategories";

const List = async function List() {  
  return await HTTPService.get(apiEndpoint);
}

const ListParent = async function ListParent() {  
  return await HTTPService.get(apiEndpoint + "/parent/");
}

const GetsByParentId = async function GetsByParentId(id) {  
  return await HTTPService.get(apiEndpoint + "/parent/" + encodeURIComponent(id));
}

const Get = async function Get(id) {  
  return await HTTPService.get(apiEndpoint + "/" + encodeURIComponent(id));
}

const Create = async function Create(data) {  
  return await HTTPService.post(apiEndpoint, data);
}

const Edit = async function Edit(data) {  
  return await HTTPService.put(apiEndpoint + "/" + data.id, data);
}

const Delete = async function Delete(id) {  
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
