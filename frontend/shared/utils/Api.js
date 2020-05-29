import axios from "axios";
import {API_PATH} from 'shared/config/globals'

//Axios to pass auth cookie to requests (allows middleware impemlementation in BE)
axios.defaults.withCredentials = true
axios.defaults.baseURL = API_PATH;

class Api {
  //
  // 1. User APIs
  //

  static getCurrentUser = () => {
    return axios.get(
      API_PATH + '/auth/current-user',
    ).then(response =>{
      return response.data
    }).catch(error => console.log(error))
  }

  static logoutCurrentUser = () => {
    return axios.get(
      API_PATH + '/auth/logout',
    ).then(response =>{
      return response.data
    }).catch(error => console.log(error))
  }


  //
  // 2. Searches APIs
  //
  static saveSearch = (searchParams) => {
    var cleanSearchParams = searchParams
    cleanSearchParams && (cleanSearchParams.origin = cleanSearchParams.origin.replace('-sky',''))
    cleanSearchParams && (cleanSearchParams.destination = cleanSearchParams.destination.replace('-sky',''))
    return axios.post(
      API_PATH + '/searches',
      cleanSearchParams
    ).then(response =>{
      // console.log(response.data)
    }).catch(error => console.log(error))
  }

  static deleteSearch = (searchId) => {
    return axios.delete(
      API_PATH + '/searches/' + searchId,
    ).then(response =>{

    }).catch(error => console.log(error))
  }

  static getUserSearches = () => {
    return axios.get(
      API_PATH + '/searches/user-searches',
    ).then(response =>{
      return response.data
    }).catch(error => console.log(error))
  }


}

export default Api