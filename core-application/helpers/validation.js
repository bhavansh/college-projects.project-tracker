exports.isEmpty = (data) => {
  if (data.trim() === "") {
    return true;
  }
  return false;
};

exports.isEmail = (email) => {
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email.match(regex)) {
    return true;
  }
  return false;
};
