import { HTTPService } from "./common";

const apiEndpoint = process.env.REACT_APP_MERCHANT_API_URL + "/menus";

async function List() {  
  return await HTTPService.get(apiEndpoint);
}

async function Get(id) {  
  return await HTTPService.get(apiEndpoint + "/" + encodeURIComponent(id));
}

async function Create(data) {  
  return await HTTPService.post(apiEndpoint, data);
}

async function Edit(data) {  
  return await HTTPService.put(apiEndpoint + "/" + data.id, data);
}

async function Delete(id) {  
  return await HTTPService.delete(encodeURI(apiEndpoint + "/" + id));
}

export default {
  List,
  Get,
  Create,
  Edit,
  Delete,  
};
