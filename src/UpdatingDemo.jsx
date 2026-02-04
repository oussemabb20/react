import React, { Component } from "react";
 
class UpdatingDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor : Initialisation du composant");
  }
 
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("getDerivedStateFromProps : Mise à jour de l'état à partir des props");
    // Cette méthode peut être utilisée pour ajuster l'état en fonction des nouvelles props.
    // Ici, elle ne fait rien, mais elle pourrait, par exemple, mettre à jour l'état selon des props.
    return null;
  }
 
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate : Faut-il mettre à jour le composant ?");
    // Retourne false si on veut éviter la mise à jour, ici on permet toujours la mise à jour
    return nextState.count % 2 === 0; // Mise à jour uniquement pour des nombres pairs
  }
 
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate : Le composant a été mis à jour");
    console.log("Ancien état :", prevState.count, "Nouvel état :", this.state.count);
  }
 
  handleClick = () => {
    // Incrémente le compteur pour déclencher une mise à jour
    this.setState({ count: this.state.count + 1 });
  };
 
  render() {
    console.log("Render : Génération du DOM");
    return (
      <div>
        <h1>Phase de Mise à Jour - UpdatingDemo</h1>
        <p>Compteur : {this.state.count}</p>
        <button onClick={this.handleClick}>Incrémenter</button>
      </div>
    );
  }
}
 
export default UpdatingDemo;
 