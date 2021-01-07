export class CustomJs {
  getCurrentDateBS() {
    return NepaliFunctions.GetCurrentBsDate();
  }
  getBeforeAfterDateAD(days) {
    let date = new Date();
    return new Date(date.setMonth(date.getMonth() +days));
  }

  /* getBeforeAfterDateAD() {
    let date = new Date();
    return new Date(date.setMonth(date.getMonth() + 8));
  } */
}
