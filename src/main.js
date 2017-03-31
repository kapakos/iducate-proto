import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import Routes from './router';
import './styles/global.css';

injectTapEventPlugin();

function main() {
  ReactDOM.render(Routes, document.getElementById('app'));
}

main();
