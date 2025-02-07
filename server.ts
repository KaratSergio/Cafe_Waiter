import { app } from './src/app';
import { initDB } from './src/db/postgreSQL';

const PORT = process.env.PORT || 3000;

initDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
