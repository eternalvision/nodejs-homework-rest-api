//! получает схему
const validation = (schema) => {
  //
  //! создает другую функцию
  return (req, res, next) => {
    //
    //! берет реквестбоди, закидывает схему
    const { error } = schema.validate(req.body);
    //
    if (error) {
      //! если есть ошибка добавляем 400 статус
      error.status = 400;
      //
      //! передаем дальше обработку
      next(error);
    }
    //
    //! дальше передаем без ошибок
    next();
  };
};

module.exports = validation;
