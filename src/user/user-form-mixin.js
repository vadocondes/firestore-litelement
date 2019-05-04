export const userFormMixin = (Superclass) => {
  return class extends Superclass {
    onUserChanged(e) {
      this.user = e.detail;
    }
  }
}