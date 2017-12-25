import {h, Component} from 'preact';
import read from './reader';
import open from './opener';

import {isKey, isOpen, isSigning} from './utils';
import {sign} from './sign';

export default class KeySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: null,
      keyIdx: 0,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelectKey = this.handleSelectKey.bind(this);
    this.handleSign = this.handleSign.bind(this);
  }

  handleFile(event) {
    read(event.target.files)
    .then((material)=> {
      this.props.onAdd(material);
    });
  }

  handleOpen(event) {
    event.preventDefault();
    const {password, keyIdx} = this.state;
    const {material} = this.props;
    const key = (material || []).filter(isKey)[keyIdx || 0];
    const contents = open(key, password);
    if (contents) {
      this.setState({error: null, password: ''});
      read([{name: 'dat', ...key, contents}])
      .then((more)=> {
        this.props.onAdd([...material, ...more]);
      });
    } else {
      this.setState({error: 'EPASSWORD'});
    }
  }

  handleSelectKey(event) {
    this.setState({keyIdx: Number(event.target.value)});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSign(event) {
    event.preventDefault();
    const {material} = this.props;
    const [key] = (material || []).filter((file)=> isOpen(file) && isSigning(file.match));
    this.props.onSign(sign.bind(null, key, key.match));
  }

  render() {
    const {password, error} = this.state;
    const {material} = this.props;
    const keys = (material || []).filter(isKey);
    const signKeys = (material || []).filter((file)=> isOpen(file) && isSigning(file.match));
    const [firstKey] = signKeys;
    if (signKeys.length > 1) {
      return (<div>Signing keys found: {signKeys.length}</div>);
    }
    if (signKeys.length === 1) {
      return (<div>
        <button onClick={this.handleSign}>
          Sign as {firstKey.match.subject.title} {firstKey.match.subject.commonName}
        </button>
      </div>);
    }

    return (<div>
      {!keys.length && (<div>
        Select private key:
        <input
          type="file"
          multiple
          name="keyselect"
          value=""
          onChange={this.handleFile} />
      </div>)}

      {(keys.length > 0) && (<form onSubmit={this.handleOpen}>
        {(keys.length > 1) && (<select onChange={this.handleSelectKey} >
          {keys.map((key, idx)=> <option value={idx} key={idx}>
            {(key.match && key.match.subject)
              ? (key.match.subject.title || '') + ' ' + (key.match.subject.commonName || '')
              : (key.name || idx)}
          </option>)}
        </select>)}
        Password:
        <input type="password" name="password" value={password} onChange={this.handlePassword} autoFocus />
        {error}
      </form>)}

      <div>
        Found keys: {keys.length}
      </div>

    </div>);
  }
}
