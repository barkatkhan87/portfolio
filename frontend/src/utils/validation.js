export const isValidEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

export const validateLoginForm = (values) => {
  const errors = {}

  if (!values.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

export const validateContactForm = (values) => {
  const errors = {}

  if (!values.name?.trim()) {
    errors.name = 'Name is required'
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!values.subject?.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!values.message?.trim()) {
    errors.message = 'Message is required'
  } else if (values.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return errors
}