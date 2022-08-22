const { Router } = require("express");
const tasks = require("app/routes/api/tasks");
const router = Router();

router.use("/tasks/", tasks);
module.exports = router;
