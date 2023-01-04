import Template from 'Templates/Template'
import 'Styles/main.css'

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
