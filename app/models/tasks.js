const yup = require("yup");
const { Sequelize } = require("sequelize");
const connect = require("config/database");

const createValidation = () => (
  yup.object().shape({
    title: yup.string().required().min(3),
    description: yup.string(),
    expirated_at: yup.date().min(new Date(), "sorry, expirated_at can't be on the past"),
  })
);

const hookValidate = async ({ dataValues }) => {
  const validations = createValidation();
  await validations
    .validate(dataValues)
    .catch(({ errors }) => {
      const first = errors.shift();
      throw new Error(first);
    });
};

const tasks = connect.define("tasks", {
  id: { 
    primaryKey: true, 
    type: Sequelize.UUID, 
    defaultValue: Sequelize.UUIDV4 
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  expirated_at: Sequelize.DATE,
}, {
  hooks: { beforeValidate: hookValidate }
});

module.exports = tasks;
