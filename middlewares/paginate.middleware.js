const handlePaginate = (req, res, next) => {
  let { page, perPage } = req.query;

  page = parseInt(page);
  perPage = parseInt(perPage);

  if (isNaN(page) || page <= 0) page = 1;

  if (isNaN(perPage) || perPage <= 0) perPage = 10;

  const skip = (page - 1) * perPage;
  const limit = perPage;

  req.pagination = { page, perPage, skip, limit };
  next();
};

export default handlePaginate;
