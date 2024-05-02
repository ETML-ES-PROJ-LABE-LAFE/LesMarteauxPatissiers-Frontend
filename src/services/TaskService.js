import axios from 'axios'

//const TODOS_BASE_URL = "https://jsonplaceholder.typicode.com/todos"

class TaskService {

    /**
     * 
     * @returns Les cinq premières tâches de la liste sous forme JSON
     */
    async get() {
      try {
        
        // Envoi de la requête
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5") 

        console.log(response.data)
        console.log(response.status)

        // Renvoi des données en format JSON
        return response.data

      } catch (error) {
          throw new Error(`Erreur HTTP ${error.response.status}: ${error.response.data}`)
      }
  }

  async add(task) {
    try {
      let result = await axios.post('https://jsonplaceholder.typicode.com/todos', { title :task, completed : false} );
      console.log('code de retour ' + result.status)

      //if(result.status !=201 )throw new Error('Impossible d\'ajouter une nouvelle tache');

      return result.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async delete(id) {
    try {
      let result = await axios.delete('https://jsonplaceholder.typicode.com/todos/' + id);
      console.log('code de retour ' + result.status)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}

export default new TaskService()