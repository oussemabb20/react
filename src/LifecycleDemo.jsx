import React, { Component } from "react";
 
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor : Initialisation du composant");
  }
 
  static getDerivedStateFromProps(nextProps, nextState) {
    console.log("getDerivedStateFromProps : Mise à jour de l'état à partir des props");
    // Aucune mise à jour d'état ici
    return null; // retourne null si l'état n'a pas besoin d'être modifié
  }
 
  componentDidMount() {
    console.log("componentDidMount : Le composant est monté dans le DOM");
  }
 
  render() {
    console.log("Render : Génération du DOM");
    return (
      <div>
        <h1>Phase de montage - LifecycleDemo</h1>
        <p>Le composant est monté et prêt.</p>
      </div>
    );
  }
}
 
export default LifecycleDemo;