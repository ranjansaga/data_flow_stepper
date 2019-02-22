import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import './bootstrap.min.css';
import "typeface-roboto";

class TestStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  onStepToggle = function (nodeObj) {
    console.log('nodeObj in toggle-->', nodeObj)
    nodeObj.active = !nodeObj.active;
    this.forceUpdate();
  }

  renderStepContent = function(nodeObj) {
    return (
      <div className="step-content-wrapper">
              <div className="step-content">
                {
                  nodeObj.node_information.map((dataObj) => {
                    let valueStyle= {
                      color: dataObj.color
                    }
                    return  (
                              <div className="row step-content-rows">
                                <div className="col-6">
                                  {dataObj.label}
                                </div>
                                <div
                                  className="col-6"
                                  style={valueStyle}>
                                  {dataObj.value}
                                </div>
                              </div>
                            )
                  })
                }
              </div>
            </div>
    )
  }


  render() {
    const nodes = this.state.data.map((nodeObj, index) => {
      let nodeStyle = {
                    background: nodeObj.color
                  }
      return (
        <div>
          <div
            onClick={() => {this.onStepToggle(nodeObj)}}
            className="circle-icon-wrapper">
            <div
              class="circle-icon"
              style={nodeStyle} >
              <i className={nodeObj.icon} aria-hidden="true"></i>
            </div>
          </div>
          <div
            key={index}
            className={'step ' + nodeObj.color}
            >
            <div className="step-header">
              <div className="header">{nodeObj.node_name}</div>
            </div>
              { nodeObj.active &&
                this.renderStepContent(nodeObj)}
          </div>
        </div>
      );
    });

    return (
      <div className="steps">
        {nodes}
      </div>);
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Stepper',
      content:  [{
 	"node_name": "Client",
 	"color": "green",
 	"icon": "fa fa-circle",
  "active": false,
 	"node_information": [{
 			"label": "Number of pollings done for each target",
 			"value": 23,
 			"color": "red"
 		},
 		{
 			"label": "Total number of pollings",
 			"value": 23,
 			"color": "green"
 		},
 		{
 			"label": "Number of documments received",
 			"value": 33,
 			"color": "orange"
 		}
 	]
 }, {
 	"node_name": "Router1",
 	"color": "red",
 	"icon": "fa fa-pencil",
  "active": false,
 	"node_information": [{
 			"label": "Number of pollings done for each target",
 			"value": 33,
 			"color": "red"
 		},
 		{
 			"label": "Total number of pollings",
 			"value": 22,
 			"color": "green"
 		},
 		{
 			"label": "Number of documments received",
 			"value": 33,
 			"color": "green"
 		},
 		{
 			"label": "Number of documents received per target",
 			"value": 32,
 			"color": "orange"
 		},
 		{
 			"label": "Number of documents dropped",
 			"value": 44,
 			"color": "green"
 		}
 	]
 }]
}
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
          <TestStepper
            data={this.state.content}
          />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));