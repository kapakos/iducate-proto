import Routes from './router';
import ReactDOM from 'react-dom';
import styles from './styles/global.css';
window.HOST = 'https://api.server.addr';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

main()

function main() {
	ReactDOM.render(Routes, document.getElementById('app'))
}
