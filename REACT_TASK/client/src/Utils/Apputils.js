export const joiUpdatedMessage = {
    'string.empty': `{{#label}} is required.`,
    'string.min': `{#label} should have a minimum length of {#limit}`,
    'string.max': `{#label} should have a max length of {#limit}`,
    'any.required': `{#label} is required`,
    'string.email': `Please enter a valid email address.`,
}
  
export const removeDoubleQuotes = string => {
    return string.replace(/"/g, '')
}