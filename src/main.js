import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import Routes from './router';
import styles from './styles/global.css';
window.HOST = 'https://api.server.addr';
injectTapEventPlugin();

function main() {
  ReactDOM.render(Routes, document.getElementById('app'));
}

main();
