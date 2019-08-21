import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

  state = {
    lowercase_names : true,
    uppercase_first : true,
    capitalize_mc   : true,
    remove_mi       : true,
    reverse_name    : false,
    sort            : true,
    list            : '',
    reformat_gender : true,
  }

  toggle(label) {
    let current = this.state[label];
    this.setState({[label] : !current});
  }

  convert() {
    const kids = this.state.list.split(/\r?\n/);

    const converted = kids.map( k => {

      let gender;
      let m;

      if (m = k.match(/ (Male|Female)$/)) {
        gender = m[1];
        k = k.replace(/ (Male|Female)$/, '');
      }

      const [lastName, firstNameMI] = k.split(/\s*,\s*/);
      const [firstName, MI] = firstNameMI.split(/ /);

      if (this.state.lowercase_names) {
        k = k.toLowerCase();
      }

      if (this.state.uppercase_first) {
        k = k.replace(/\w/,    (m) => { return m.toUpperCase() });
        k = k.replace(/\W\w/g, (m) => { return m.toUpperCase() });
      }

      if (this.state.lowercase_names && this.state.uppercase_first && this.state.capitalize_mc) {
        k = k.replace(/^(Ma?c)(.)/, (m, prefix, letter) => { return prefix + letter.toUpperCase() });
      }

      if (this.state.remove_mi) {
        k = k.replace(/\s+.\.\s*$/, '');
      }

      if (this.state.reverse_name) {
        k = k.replace(/([^,]+)\s*,\s*(.+)$/, '$2 $1');
      }

      if (this.state.reformat_gender) {
        gender = gender === 'Male'
          ? ';M'
          : ';F'
      }
      else if (gender) {
        gender = " " + gender
      }

      if (gender) {
        k = k + gender
      }

      return {
        reformatted : k,
        sort        : [lastName, firstName, MI].join(','),
      }

      return k;
    })
    .sort( (a,b) => {
      if ( !this.state.sort ) { return 0 }
      else {
             if (a.sort < b.sort) { return -1 }
        else if (a.sort > b.sort) { return  1 }
        else                      { return 0  }
      }
    })
    .map( o => o.reformatted )
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
              <li>Copy list of names from other program.
                <ul>
                  <li>Expected format is <b>LastName, FirstName MI.</b> (with a period after the initial)</li>
                </ul>
              </li>
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
              <input type = 'checkbox' id='capitalize_mc' checked={this.state.capitalize_mc} onChange={() => this.toggle('capitalize_mc')} />
              <label htmlFor='capitalize_mc'>Capital letter after Mc/Mac</label>
            </div>
            <div>
              <input type = 'checkbox' id='remove_mi' checked={this.state.remove_mi} onChange={() => this.toggle('remove_mi')} />
              <label htmlFor='remove_mi'>Remove middle initial</label>
            </div>
            <div>
              <input type = 'checkbox' id='reverse_name' checked={this.state.reverse_name} onChange={() => this.toggle('reverse_name')} />
              <label htmlFor='reverse_name'>Reformat as "Firstname Lastname"</label>
            </div>
            <div>
              <input type = 'checkbox' id='sort' checked={this.state.sort} onChange={() => this.toggle('sort')} />
              <label htmlFor='sort'>Sort list by last name, first name, middle initial</label>
            </div>
            <div>
              <input type = 'checkbox' id='sort' checked={this.state.reformat_gender} onChange={() => this.toggle('reformat_gender')} />
              <label htmlFor='reformat_gender'>Reformat " Gender" to ";G"</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
