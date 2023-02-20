import axios from "axios"

export default class View {
    constructor() {
        this.showAllResult = document.querySelector('#showAllForm')
        this.showAllResultForm = ''
       // this.events()
    }
    events() {
        this.showAllResult.addEventListener("submit", (e) => {
          //  e.preventDefault()
          //  this.openOverlay()
          })
    
    }
    // methods

    sendRequest() {
        axios.post('/search', {_csrf: this._csrf, searchTerm: this.inputField.value}).then(response => {
            this.renderResultsHTML(response.data)
            console.log(response.data)
        }).catch((err) => {
         console.log(err)
        })
      }
}
