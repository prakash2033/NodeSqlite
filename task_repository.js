class TaskRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            isComplete INTEGER DEFAULT 0,
            projectId INTEGER,
            CONSTRAINT tasks_fk_projectId FOREIGN KEY (projectId)
                REFERENCES projetcs(id) ON UPDATE CASCADE ON DELETE CASCADE)`;
        return this.dao.run(sql);
    }

    create(name, description, isComplete, projectId) {
        return this.dao.run(
            `INSERT INTO tasks (name, description, isComplete, projectId)\
                VALUES (?, ?, ?, ?)`, [name, description, isComplete, projectId]
        );
    }
}

module.exports = TaskRepository;