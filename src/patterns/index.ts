export const patterns = {
  oneDot: /^(?!(?:.*\..*){2})[\s\S]*$/,
  number: /^[0-9.]+$/,
  twoDecimal: new RegExp('^[0-9]+(\\.[0-9]{0,2})?$'),
  maxDecimal: /^\d+(\.\d{1,2})?$/,
  email: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
}