import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

  state = {
    lowercase_names : true,
    uppercase_first : true,
    remove_mi       : true,
    reverse_name    : false,
    list            : '',
  }

  toggle(label) {
    let current = this.state[label];
    this.setState({[label] : !current});
  }

  convert() {
    const kids = this.state.list.split(/\r?\n/);

    const converted = kids.map( k => {

      if (this.state.lowercase_names) {
        k = k.toLowerCase();
      }

      if (this.state.uppercase_first) {
        k = k.replace(/\w/, (m) => { return m.toUpperCase() });
        k = k.replace(/\W\w/g, (m) => { return m.toUpperCase() });
        /*k = k
          .split(/\s+/)
          .map(w => {
            return w.charAt(0).toUpperCase() + w.slice(1);
          })
          .join(' ');*/
      }

      if (this.state.remove_mi) {
        k = k.replace(/\s+.\.\s*$/, '');
      }

      if (this.state.reverse_name) {
        k = k.replace(/([^,]+)\s*,\s*(.+)$/, '$2 $1');
      }

      return k;
    })
    .join('\n');

    this.setState({ list : converted });
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Class name reformatter</h2>
        </div>

        <div style = {{display : 'flex', justifyContent : 'center', marginTop : '15px'}}>
          <div>
            <b>Instructions:</b>
            <ol>
              <li>Copy list of names from other program.</li>
              <li>Paste list of names into text box below.</li>
              <li>Choose desired conversion options.</li>
              <li>Press "convert" button.</li>
              <li>Select list of names from box.</li>
              <li>Copy and paste into other program, as needed.</li>
            </ol>
          </div>
        </div>

        <div style = {{display : 'flex', justifyContent : 'center', marginTop : '15px'}}>
          <div style={{textAlign : 'center'}}>
            <div>
            <textarea rows = '10' cols = '50' value={this.state.list} onChange={(e) => this.setState({list : e.target.value})}>
            </textarea>
            </div>
            <div>
              <button className='btn btn-primary' onClick={() => this.convert()}>Convert</button>
            </div>
          </div>
          <div style = {{textAlign : 'left', paddingLeft : '5px'}}>
            <div>
              <input type = 'checkbox' id='lowercase_names' checked={this.state.lowercase_names} onChange={() => this.toggle('lowercase_names')} />
              <label htmlFor='lowercase_names'>Lowercase names</label>
            </div>
            <div>
              <input type = 'checkbox' id='uppercase_first' checked={this.state.uppercase_first} onChange={() => this.toggle('uppercase_first')} />
              <label htmlFor='uppercase_first'>Uppercase first letter</label>
            </div>
            <div>
              <input type = 'checkbox' id='remove_mi' checked={this.state.remove_mi} onChange={() => this.toggle('remove_mi')} />
              <label htmlFor='remove_mi'>Remove middle initial</label>
            </div>
            <div>
              <input type = 'checkbox' id='reverse_name' checked={this.state.reverse_name} onChange={() => this.toggle('reverse_name')} />
              <label htmlFor='reverse_name'>Reformat as "Firstname Lastname"</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
