import http from "../http-common.js";

class EquipmentDataService {
  getAll(id) {
    return http.get(`/equipments/list/${id}`);
  }

  getAll() {
    return http.get(`/equipments/list/`);
  }
  /*  get(id) {
    return http.get(`/projects/${id}`);
  }
  */
  create(data) {
    return http.post("/equipments", data);

  }

  update(id, data) {
    return http.put(`/equipments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/equipments/${id}`);
  }
/*
  deleteAll() {
    return http.delete(`/projects`);
  }

  findByTitle(title) {
    return http.get(`/projects?title=${title}`);
  }
  userProjects(id){
    return http.get(`/projects/user/list/${id}`);
  }*/
  // findPublished(){
  //   return http.get(`/projects?published=`)
  // }
}

export default new EquipmentDataService();