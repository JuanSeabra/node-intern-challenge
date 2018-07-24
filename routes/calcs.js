const router = require('express').Router();

function fat (n) { // TODO
	var m = n
	while (n > 1) {
		m = m * (n-1);
		n--;
	}
  return m;
}

function fib (n) {
	var a = 0, b = 1, aux;
	for (var i = 0; i < n; i++) {
		aux = a + b;
		a = b;
		b = aux;
	}
	return aux;
}

router.post('/fat', (req, res) => {
  const {n} = req.body;

  if (!n) {
    res.sendStatus(400);
  }

  res.json({result: fat(n)});
});

router.post('/fib', (req, res) => {
  const {n} = req.body;

  if (!n) {
    res.sendStatus(400);
  }

  res.json({result: fib(n)});
});

module.exports = router;
