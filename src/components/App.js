import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (type) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: type,
      }
    })
  }

    onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
      .then(r => r.json())
      .then(data => {
        console.log(data);
        this.setState({
          pets: data
        })
      })
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          pets: data
        })
      })
    }
  }

  onAdoptPet = (id) => {
    let updatePet = [...this.state.pets]
    let targetPet = updatePet.find(pet => {
      return pet.id == id
    })
    targetPet.isAdopted = !targetPet.isAdopted
    this.setState({
      pets: updatePet
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
