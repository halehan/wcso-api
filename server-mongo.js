
// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
var mongoDB = 'mongodb://wcso:wcso@ds161164.mlab.com:61164/wcso';

mongoose.connect(mongoDB, {
	useMongoClient: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
var mongoose   = require('mongoose');
var mongodbUri = 'mongodb://wcso:wcso@ds161164.mlab.com:61164/wcso';

mongoose.connect(mongodbUri);
var conn = mongoose.connection;             
*/

var User     = require('./app/models/user');
var Message     = require('./app/models/message');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/users')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var user = new User();		// create a new instance of the Bear model
		var dt = new Date();
		user.firstName = req.body.firstName;  // set the bears name (comes from the request)
		user.lastName = req.body.lastName;
		user.loginId = req.body.loginId;
		user.role = req.body.role;
		user.phoneMobile = req.body.phoneMobile;
		user.supervisor = req.body.supervisor;
		user.createDate = dt.toString();
		user.updateDate = dt.toString();
		user.updateBy = req.body.updateBy;
	
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created! ' + user.firstName +'  ' + user.lastName });
		});

	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/users/:user_id')

	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

				user.firstName = req.body.firstName;  
				user.lastName = req.body.lastName;
				user.loginId = req.body.loginId;
				user.role = req.body.role;
				user.phoneMobile = req.body.phoneMobile;
				user.supervisor = req.body.supervisor;
				user.updateDate =new Date().toString();
				user.updateBy = req.body.updateBy;
			
				
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});

		});
	})


	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

	router.route('/messages')
	
		// create a message (accessed at POST http://localhost:8080/api/messages)
		.post(function(req, res) {
			
			var message = new Message();

			message.messageId = req.body.messageId;  
			message.threadId = req.body.threadId;
			message.faceBookUserId = req.body.faceBookUserId;
			message.message = req.body.message;
			message.createdTime = new Date().toString();
			message.faceBookGeoLocation = req.body.faceBookGeoLocation;
			message.respondent.loginId = req.body.respondent.loginId;
			message.respondent.messageId = req.body.respondent.messageId;
			message.respondent.message = req.body.respondent.message;

			message.save(function(err) {
				if (err)
					res.send(err);
	
				res.json({ message: 'Message created! ' + message.message});
			});
	
			
		})

		// get all the messages (accessed at GET http://localhost:8080/api/messages)
		.get(function(req, res) {
			Message.find(function(err, messages) {
				if (err)
					res.send(err);
	
				res.json(messages);
			});
		});


router.route('/messages/:message_id')
		// get the user with that id
	.get(function(req, res) {
//		Message.findById(req.params.message_id, function(err, message) {
	Message.find({'messageId': req.params.message_id}, 'messageId message threadId', function(err, message) {
			if (err)
				res.send(err);
			res.json(message);
		});
	})
	.put(function(req, res) {
			Message.findById(req.params.message_id, function(err, message) {
	
				if (err)
					res.send(err);
	
					message.messageId = req.body.messageId;  
					message.threadId = req.body.threadId;
					message.faceBookUserId = req.body.faceBookUserId;
					message.message = req.body.message;
					message.createdTime = req.body.createdTime;
					message.faceBookGeoLocation = req.body.faceBookGeoLocation;
					message.respondent.loginId = req.body.respondent.loginId;
					message.respondent.messageId = req.body.respondent.messageId;
					message.respondent.message = req.body.respondent.message;
				
					
				message.save(function(err) {
					if (err)
						res.send(err);
	
					res.json({ message: 'Message updated!' });
				});
	
			});
		})
	.delete(function(req, res) {
			Message.remove({
				_id: req.params.message_id
			}, function(err, user) {
				if (err)
					res.send(err);
	
				res.json({ message: 'Successfully deleted' });
			});
		})
		

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Node server running on port ' + port);