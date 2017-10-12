/** @author {{erickwendel}} {{contato@erickwendel.com.br}}{{}} */

// importando dependencias
const { config } = require('dotenv');
const MongoJS = require('mongojs');

// aqui conferimos o nosso ambiente de execução
// pára entender de onde usaremos nossas variáveis de conexao
if (process.env.NODE_ENV !== 'PROD') config({ path: './config/.env.dev' });
else config({ path: './config/.env.prod' });

/** conectamos ao mongoDb  */
const db = MongoJS(process.env.DB, ['users']);
db.on('error', err => console.log('database error', err));

/** quando se conectar, exibe qual ambiente está trabalhando */
db.on('connect', () => console.log(`database connected at env ${process.env.NODE_ENV}`));

/** função responsável por criar um usuario teste
 * passando o nome do ambiente
 */
function create() {
  return new Promise(resolve =>
    db.users.save({ user: `Erick ${process.env.NODE_ENV}` }, (error, result) => resolve(result)));
}

/** função responsável por listar todos os usuarios */
function find() {
  return new Promise(resolve => db.users.find({}, (error, result) => resolve(result)));
}

/** criamos uma função para executar nossa aplicação * */
async function run() {
  /** aguarda a execução para inserção do usuario* */
  await create();
  /** após inserir, printa no console todos os usuarios* */
  console.log(await find());
}

run();
