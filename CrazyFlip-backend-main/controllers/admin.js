const http = require('http');
const User = require('../models/User');


/**
 * GET /admin/affiliates
 * Admin page for affiliates.
 */
exports.getAdminAffiliates = async (req, res) => {
  let options = {}
  let status
  if (req.query.status) {
    status = req.query.status;
    if (status === 'pending') {
      options = { status: 'pending' }
    } else if (status === 'approved') {
      options = { status: 'approved' }
    } else if (status === 'rejected') {
      options = { status: 'rejected' }
    } else if (status === 'all') {
      options = {}
    }
  }
  let users = await User.find(options)
  return res.status(200).json({
    success: true,
    message: '',
    data: users
  });
};

exports.getAdminAffiliateSingle = (req, res) => {
  return res.status(200).json({
    success: true,
    message: '',
    data: req.user
  });
};

exports.updateStatus = async (req, res) => {
  // get the id from the route params
  const id = req.params.id;

  // find the user in the database
  User.findById(id, (err, user) => {
    if (err) {
      // something went wrong
      return res.status(500).send('Something went wrong');
    }

    // update the user's status
    user.status = req.body.status;
    user.save((err, user) => {
      if (err) {
        // something went wrong
        return res.status(500).send('Something went wrong');
      }
      return res.status(200).json({
        success: true,
        message: 'Status update sucessful',
        data: id
      });
    });
  });
};



// get single transaction info from ethereum
const getEthTransaction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let web3 = new Web3('wss://ropsten.infura.io/ws/v3/2e5fb5cf42714929a7f61a1617ef1ffd')
      let data = await web3.eth.getTransaction(query.txh)
      resolve(data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}


const getEthTransactions = async (address) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        hostname: 'api.bscscan.com',
        port: 80,
        path: '/api?module=account&action=tokentx&contractaddress=0xe1618Ad65964da3a4F44CB70723D6c6dD6d839C2&apikey=TK36NZDRQBFVVSWMIGC6B6RPR5U16SVW8U&startblock=0&endblock=99999999&sort=asc',
        method: 'GET'
      };
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const resultData = JSON.parse(data).result;
          resolve(resultData);
        });
      });
      req.on('error', (e) => {
        console.error(e);
        reject(e);
      });
      req.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
/**
 * GET /admin/transactions
 * Admin page for transactions.
 */
exports.getAdminTransactions = async (req, res) => {
  const transactions = await getEthTransactions();
  console.log('HERE')
  console.log(transactions)


  return res.status(200).json({
    success: true,
    message: '',
    data: transactions
  });
};

/**
 * GET /admin/stats
 * Admin page for stats.
 */
exports.getAdminStats = (req, res) => {

  return res.status(200).json({
    success: true,
    message: '',
    data: {}
  });
};
