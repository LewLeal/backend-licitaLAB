const yup = require("yup");
const { Router } = require("express");
const tasks = require("app/models/tasks");
const router = Router();

const schemaList = yup.object().shape({
  orderBy: yup.mixed().oneOf(["asc", "desc"]),
  page: yup.number().positive().default(() => 1),
  orderColumn: yup.mixed().oneOf(["created_at", "expirated_at"]),
  pageSize: yup.number().positive().max(100).default(() => 20),
});

/**
 * #GET /api/tasks
 * @return {object[]} example
 */
router.get("/", async (req, res) => {
  try {
    const taskList = await tasks.findAll({ 
      limit: pageSize, 
      offset: (page - 1) * pageSize,
      order_by: [[orderColumn, orderBy]]
    });

    const count = await tasks.count();

    res.json({ tasks: taskList, count });
  } catch(error){
    res.status(400);
    res.json({ error: error.message });
  }
}); 


/**
 * #GET /api/tasks/:id
 * @param {string} id identity of task
 * @return {object} example { id title, description, expirated_at, created_at, expirated_at } 
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasks.findOne({ where: { id } });
    
    if(!task){
      throw new Error("sorry, the task was not found");
    }

    res.json(task);
  } catch(error){
    res.json({ error: error.message });
    res.status(422);
  }
});

/**
 * #POST /api/tasks/ 
 * @param {string} title
 * @param {string} description
 * @param {Date} expirated_at
 * @return {object} example { id title, description, expirated_at, created_at, expirated_at } 
 */
router.post("/", async (req, res) => {
  try {
    const { title, description, expirated_at  } = req.body;
    const task = await tasks.create({ title, description, expirated_at });
    res.status(201).json(task);
  } catch(error){
    res.status(422);
    res.json({ error: error.message });
  }
});

/**
 * #PUT /api/tasks/:id
 * @param {string} title
 * @param {string} description
 * @param {Date} expirated_at
 * @return {object} example { id title, description, expirated_at, created_at, expirated_at } 
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, expirated_at } = req.body;
    
    const [rowsUpdate] = await tasks.update(
      { title, description, expirated_at },
      { where: { id } }
    );

    if( rowsUpdate !== 1 ){
      throw new Error("sorry, the task was not found");
    }

    const task = await tasks.findOne({ where: { id } });
    res.status(202).json(task);
  } catch(error){
    res.status(422);
    res.json({ error: error.message });
  }
});

module.exports = router;
