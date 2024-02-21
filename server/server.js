const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const multer = require('multer');
const path = require('path');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

const PORT = process.env.PORT || 3003;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  // Save file path to database for the user
  const filePath = req.file.path;
  // Update user's profile picture or banner in the database
  // Respond with success message or error
  res.json({ success: true, file: filePath });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./config/connection');

const startApolloServer = async () => {
  await server.start();

	app.use('/graphql', expressMiddleware(server, {
		context: authMiddleware
	}));
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));
	
		app.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
      console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
