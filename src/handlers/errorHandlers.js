export const handleErrorMsg = (data, setFlashes) => {
  if (data.err) {
    const err = {
      msg: data.err,
      type: 'error'
    }
    setFlashes([err])
    return err;
  } else if (data.errs){
    const errs = [];
    data.errs.forEach(err => {
      errs.push({
        msg: err.msg,
        type: 'error'
      })
    });
    setFlashes(errs)
    return errs;
  }
  return false
}