// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"

import React from "react"
import ReactDOM from "react-dom"

class TrainDepartures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {departures: []};
  }
  componentDidMount() {
    socket.connect()
    let channel = socket.channel("depart", {})

    channel.on("update", payload => {
      console.log(payload)
      this.setState({departures: payload["schedule"]})

    })

    channel.join()
      .receive("ok", resp => { this.setState({departures: resp["schedule"]}) })
      .receive("error", resp => { console.log("Unable to join", resp) })      
  }
  render() {
    return (
      <table className="table table-hover text-center">
        <thead>
           <tr>
            <th className="text-center">Origin</th>
            <th className="text-center">Destination</th>
            <th className="text-center">Scheduled</th>
            <th className="text-center">Late</th>
            <th className="text-center">Status</th>
            <th className="text-center">Track</th>
            <th className="text-center">Trip</th>
      </tr>
        </thead>
        <tbody>
          {this.state.departures.map(d => 
            <TrainDeparture 
            key={d.trip}
            trip={d.trip}
            track={d.track}
            status={d.status}
            scheduled={d.scheduled}
            origin={d.origin} 
            lateness={d.lateness}
            dest={d.dest}/>)}     
        </tbody>
      </table>
      )
  }
}

class TrainDeparture extends React.Component {
  formatTrack(track){
    if(track == "") {
      return "TBA"
    }
    else {
      return track
    }
  }
  formatLateness(lateness){
    if (lateness <= 0) {
      return "-"
    }
    else {
      return lateness + " Minutes Late"
    }
  }
  formatRow(status) {
    if (status == "Cancelled" || status == "Late") {
      return "danger"
    } else if (status == "Now Boarding" || status == "All Aboard" || status == "Arriving") {
      return "success"
    } else if (status == "Delayed" || status == "Late" || status == "Hold") {
      return "warning"
    } else {
      return ""
    }
  }
  formatTime(time) {
    var d = new Date(parseInt(time) * 1000)
    var h = d.getHours()
    var hh = h
    var mm = String(d.getMinutes())
    var dd = "AM"
    if (h > 12) {
      hh = h - 12
      dd = "PM" 
    }
    if (mm == "0") {
      mm = "00"
    }
    return hh + ":" + mm + " " + dd
  } 
  render(){
    return (
      <tr className={this.formatRow(this.props.status)}>
        <td>{this.props.origin}</td>
        <td>{this.props.dest}</td>
        <td>{this.formatTime(this.props.scheduled)}</td>
        <td>{this.formatLateness(this.props.lateness)}</td>
        <td>{this.props.status}</td>
        <td>{this.formatTrack(this.props.track)}</td>
        <td>{this.props.trip}</td>
      </tr>
  )}
}

ReactDOM.render(
  <TrainDepartures />,
  document.getElementById("train-departures")
)

